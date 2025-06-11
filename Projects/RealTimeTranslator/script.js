document.addEventListener("DOMContentLoaded", function () {
  const languages = {
    "af": "Afrikaans", "ar": "Arabic", "bn": "Bengali", "zh": "Chinese",
    "zh-TW": "Chinese (Traditional)", "cs": "Czech", "da": "Danish", "nl": "Dutch",
    "en": "English", "fi": "Finnish", "fr": "French", "de": "German", "el": "Greek",
    "gu": "Gujarati", "hi": "Hindi", "hu": "Hungarian", "id": "Indonesian",
    "it": "Italian", "ja": "Japanese", "kn": "Kannada", "ko": "Korean",
    "ml": "Malayalam", "mr": "Marathi", "ne": "Nepali", "no": "Norwegian",
    "pa": "Punjabi", "pl": "Polish", "pt": "Portuguese", "ro": "Romanian",
    "ru": "Russian", "sk": "Slovak", "es": "Spanish", "sv": "Swedish",
    "ta": "Tamil", "te": "Telugu", "th": "Thai", "tr": "Turkish", "uk": "Ukrainian",
    "ur": "Urdu", "vi": "Vietnamese"
  };

  const sourceSelect = document.getElementById("sourceLang");
  const targetSelect = document.getElementById("targetLang");
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");

  // Populate language dropdowns
  for (const code in languages) {
    const optionFrom = document.createElement("option");
    optionFrom.value = code;
    optionFrom.textContent = languages[code];
    sourceSelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = code;
    optionTo.textContent = languages[code];
    targetSelect.appendChild(optionTo);
  }

  sourceSelect.value = "en";
  targetSelect.value = "hi";

  // Translate
  document.getElementById("translateBtn").addEventListener("click", () => {
    const text = inputText.value.trim();
    const sourceLang = sourceSelect.value;
    const targetLang = targetSelect.value;

    if (!text) {
      inputText.placeholder = "Please type something to translate";
      inputText.focus();
      return;
    }

    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

    outputText.innerText = "Translating...";

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data && data.responseData && data.responseData.translatedText) {
          let translated = data.responseData.translatedText;
          if (data.matches && Array.isArray(data.matches)) {
            data.matches.forEach(match => {
              if (match.id === 0 && match.translation) {
                translated = match.translation;
              }
            });
          }
          outputText.innerText = translated;
        } else {
          outputText.innerText = "Translation not available.";
        }
      })
      .catch(err => {
        console.error(err);
        outputText.innerText = "Translation failed. Please check your internet connection and try again.";
      });
  });

  // Speech-to-text
  document.getElementById("speakBtn").addEventListener("click", () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition not supported.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = sourceSelect.value || "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      inputText.value = event.results[0][0].transcript;
    };

    recognition.onerror = function (event) {
      alert("Speech error: " + event.error);
    };

    recognition.start();
  });

  // Text-to-speech
  document.getElementById("listenBtn").addEventListener("click", () => {
    const output = outputText.innerText.trim();
    if (!output) {
      outputText.innerText = "Please translate something first.";
      return;
    }

    const unsupportedLangs = ["zh", "zh-TW", "ar", "gu", "kn", "ml", "mr", "pa", "ta", "te", "ur"];
    if (unsupportedLangs.includes(targetSelect.value)) {
      outputText.innerText = "Sorry, speech output not supported for this language.";
      return;
    }

    const utterance = new SpeechSynthesisUtterance(output);
    utterance.lang = targetSelect.value;
    speechSynthesis.speak(utterance);
  });
});





const bubblesContainer = document.querySelector('.bubbles');
  for (let i = 0; i < 30; i++) {
    const bubble = document.createElement('span');
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = bubble.style.height = `${10 + Math.random() * 30}px`;
    bubble.style.animationDuration = `${15 + Math.random() * 15}s`;
    bubble.style.animationDelay = `${Math.random() * 10}s`;
    bubblesContainer.appendChild(bubble);
  }

  // Generate Floating Alphabets
  const alphabetContainer = document.querySelector('.alphabets');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (let i = 0; i < 20; i++) {
    const letter = document.createElement('span');
    letter.textContent = letters[Math.floor(Math.random() * letters.length)];
    letter.style.left = `${Math.random() * 100}%`;
    letter.style.animationDuration = `${20 + Math.random() * 20}s`;
    letter.style.animationDelay = `${Math.random() * 10}s`;
    alphabetContainer.appendChild(letter);
  }