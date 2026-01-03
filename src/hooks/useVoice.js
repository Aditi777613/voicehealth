import { useState, useEffect } from 'react';
import { textToSpeech, stopSpeech } from '../services/voiceService';

export function useVoice() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported('speechSynthesis' in window);
  }, []);

  const speak = (text, language = 'en') => {
    if (!supported) return;
    
    setSpeaking(true);
    textToSpeech(text, language, () => setSpeaking(false));
  };

  const stop = () => {
    if (!supported) return;
    
    stopSpeech();
    setSpeaking(false);
  };

  return { speak, stop, speaking, supported };
}