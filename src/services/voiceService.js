let currentUtterance = null;

export function textToSpeech(text, language, onEnd) {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported');
    return;
  }

  // Stop any ongoing speech
  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  const langCode = getVoiceLanguageCode(language);
  utterance.lang = langCode;
  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Try to find a voice for the selected language
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => voice.lang.startsWith(langCode.split('-')[0]));
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
    console.log('Using voice:', preferredVoice.name, preferredVoice.lang);
  } else {
    console.log('No specific voice found for', langCode, '- using default');
  }

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (error) => {
    console.error('Speech synthesis error:', error);
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  currentUtterance = utterance;
  
  // Small delay to ensure voices are loaded
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 100);
}

export function stopSpeech() {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

function getVoiceLanguageCode(code) {
  const languageCodes = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'pa': 'pa-IN',
    'bn': 'bn-IN',
    'te': 'te-IN',
    'mr': 'mr-IN',
    'ta': 'ta-IN',
    'gu': 'gu-IN'
  };
  return languageCodes[code] || 'en-US';
}

// Load voices on page load
if ('speechSynthesis' in window) {
  // Chrome needs this
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    console.log('Available voices:', voices.length);
  };
  
  // Trigger voice loading
  window.speechSynthesis.getVoices();
}