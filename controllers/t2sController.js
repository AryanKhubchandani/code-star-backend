const t2sClient = require("../config/t2sClient");
const t2sBucket = require("../config/t2sBucket");

const db = require("../models/index");
const User = db.user;
const Audio = db.audio;
const Details = db.details;

const [
  createNewUserFx,
  createNewAudioFileFx,
  evaluateYourselfFx,
  getBalanceFx,
] = require("../../scripts/contract");

module.exports.synthAudio = async (req, res) => {
  const user_id = req.body.user_id;
  const name = req.body.name;
  const time = req.body.time;
  const text = req.body.text;
  const file = t2sBucket.file(`${user_id}/${name}`);

  const request = {
    input: { text: text },
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const writeStream = file.createWriteStream({
    resumable: false,
    metadata: {
      contentType: "audio/mpeg",
    },
  });

  t2sClient.synthesizeSpeech(request, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }

    const audioContent = response.audioContent;
    writeStream.write(audioContent);
    writeStream.end();

    writeStream.on("finish", () => {
      console.log(
        `Audio file ${name}.mp3 has been written to bucket ${t2sBucket.name}`
      );
    });
  });

  const url = await file
    .getSignedUrl({
      action: "read",
      expires: "03-17-2099",
    })
    .then(async (val) => {
      createNewAudioFileFx(user_id);
      addAudio(user_id, name, time, val[0]);
    });

  res.sendStatus(200);
};

module.exports.getAudio = async (req, res) => {
  const user_id = req.query.user_id;
  const user = await User.findOne({ where: { id: user_id } });
  const audiofiles = await Audio.findAll({ fk_user_id: user.id });
  if (audiofiles.length == 0 || !audiofiles)
    return res.send({
      message: "No files found",
    });
  else {
    res.send({
      audioFiles: audiofiles,
    });
  }
};

async function addAudio(user_id, name, time, url) {
  const user = await User.findOne({ where: { id: user_id } });
  Audio.create({
    name: name,
    download_url: url,
    time: time,
    fk_user_id: user.id,
  })
    .then((audio) => {
      console.log("Audio file created: ", audio);
    })
    .catch((error) => {
      console.log(error.message);
    });
  try {
    await addNewExpense(name, "Expense", 50, user_id);
  } catch (e) {
    console.log(e.message);
  }
}

async function addNewExpense(name, typeOf, amount, user_id) {
  const amt = Number(amount);
  const user = await User.findOne({ where: { id: user_id } });
  if (user) {
    Details.create({
      message: `Created new Audiobook: ${name}`,
      type: typeOf,
      time: new Date().toLocaleString("en-us", {
        timeZone: "IST",
      }),
      cost: amt,
      user_id: user.id,
    }).then((details) => {
      console.log("Added new expense: ", details);
    });
  } else {
    console.log("User not found");
  }
}
