const t2sClient = require("../config/t2sClient");
const t2sBucket = require("../config/t2sBucket");

const db = require("../models/index");
const Audio = db.audio;
const History = db.history;
const Details = db.details;

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
    .then((val) => {
      addAudio(user_id, name, time, val[0]);
    });

  res.sendStatus(200);
};

module.exports.getAudio = async (req, res) => {
  const user_id = req.query.user_id;
  const audiofiles = await Audio.findOne({ user_id });
  if (!audiofiles)
    return res.send({
      message: "No files found",
    });
  else {
    res.send({
      audioFiles: audiofiles.audioDetails,
    });
  }
};

async function addAudio(_user_id, _name, _time, _url) {
  const audioFile = Audio.create({
    user_id: _user_id,
    name: _name,
    download_url: _url,
    time: _time,
  })
    .then(() => {
      audio_id = audioFile.id;
      console.log("Audio file created: ", audioFile);
    })
    .catch((error) => {
      console.log(error.message);
    });
  try {
    await addNewExpense(_name, "Expense", 50, _user_id);
  } catch (e) {
    console.log(e.message);
  }
}

async function addNewExpense(name, typeOf, amount, user_id) {
  const amt = Number(amount);
  const historyInstance = await History.findOne({
    user_id,
  });
  var newHistory = History.create({
    user_id: user_id,
  }).then(() => {
    Details.create({
      message: `Created new Audiobook: ${name}`,
      type: typeOf,
      time: Date.now().toLocaleString("en-us", {
        timeZone: "IST",
      }),
      cost: amt,
      history_id: newHistory.user_id,
    });
  });
}
