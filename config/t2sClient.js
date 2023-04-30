const textToSpeech = require("@google-cloud/text-to-speech");

const t2sclient = new textToSpeech.TextToSpeechClient({
  projectId: "pizza100-358205",
  keyFilename: "./pizza100-358205-633824a250a6.json",
});

module.exports = t2sclient;
