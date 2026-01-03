import { useState } from 'react';
import { Pill, Clock, AlertCircle, Info, Volume2 } from 'lucide-react';
import { textToSpeech } from '../services/voiceService';

function MedicineCard({ medicine, language }) {
  const [expanded, setExpanded] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    const text = `${medicine.name}. ${medicine.purpose}. Dosage: ${medicine.dosage}. ${medicine.timing}. ${medicine.sideEffects ? 'Side effects: ' + medicine.sideEffects : ''}`;
    setSpeaking(true);
    textToSpeech(text, language, () => setSpeaking(false));
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-primary bg-opacity-10 p-3 rounded-lg">
            <Pill className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {medicine.name}
            </h3>
            <p className="text-gray-600">
              {medicine.purpose}
            </p>
          </div>
        </div>
        <button
          onClick={handleSpeak}
          disabled={speaking}
          className={`p-2 rounded-lg transition-all ${
            speaking 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'
          }`}
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Dosage & Timing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Dosage</span>
          </div>
          <p className="text-blue-800 font-medium">{medicine.dosage}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">Timing</span>
          </div>
          <p className="text-purple-800 font-medium">{medicine.timing}</p>
        </div>
      </div>

      {/* Duration */}
      {medicine.duration && (
        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-900">Duration:</span>
            <span className="text-green-800 font-medium">{medicine.duration}</span>
          </div>
        </div>
      )}

      {/* Expandable Section */}
      {(medicine.sideEffects || medicine.precautions) && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary font-medium text-sm hover:underline mb-2"
          >
            {expanded ? 'Show Less' : 'Show More Details'}
          </button>

          {expanded && (
            <div className="space-y-3 pt-3 border-t border-gray-200">
              {medicine.sideEffects && (
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 text-sm mb-1">
                        Possible Side Effects
                      </h4>
                      <p className="text-yellow-800 text-sm">
                        {medicine.sideEffects}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {medicine.precautions && (
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-900 text-sm mb-1">
                        Precautions
                      </h4>
                      <p className="text-orange-800 text-sm">
                        {medicine.precautions}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MedicineCard;