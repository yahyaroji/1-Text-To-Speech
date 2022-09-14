const textarea = document.querySelector("#text");
let voicelist = document.querySelector("#voice");
let speechbtn = document.querySelector(".submit");

let synth = speechSynthesis;
let isSpeaking = true;

function voice() {
  for (let voice of synth.getVoices()) {
    let option = document.createElement("option");
    option.text = voice.name;
    voicelist.addEventListener(option);
    console.log(option);
  }
}

synth.addEventListener("voiceschanged", voice);

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voicelist.value) {
      utterance.voice = voice;
    }
  }
  speechSynthesis.speak(utterance);
}

speechbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value != "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechbtn.innerHTML = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechbtn.innerHTML = "Resume Speech";
      }
      setInterval(() => {
        if (synth.isSpeaking && !isSpeaking) {
          isSpeaking = true;
          speechbtn.innerHTML = "Convert To speech";
        }
      });
    } else {
      speechbtn.innerHTML = "Convert To Speech";
    }
  }
});
