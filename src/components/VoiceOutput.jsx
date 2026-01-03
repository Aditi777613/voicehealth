import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { textToSpeech, stopSpeech } from '../services/voiceService';

function VoiceOutput({ text, language }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      textToSpeech(text, language, () => setSpeaking(false));
    }
  };

  return (
    <button
      onClick={handleSpeak}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        speaking
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-primary text-white hover:bg-green-600'
      }`}
    >
      {speaking ? (
        <>
          <VolumeX className="w-5 h-5" />
          <span className="hidden sm:inline">Stop</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" />
          <span className="hidden sm:inline">Listen</span>
        </>
      )}
    </button>
  );
}

export default VoiceOutput;