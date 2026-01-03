import { useState } from 'react';
import UploadPrescription from './components/UploadPrescription';
import PrescriptionAnalysis from './components/PrescriptionAnalysis';
import LanguageSelector from './components/LanguageSelector';
import { FileText } from 'lucide-react';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setLoading(false);
  };

  const handleReset = () => {
    setAnalysisData(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Heartbeat/ECG Icon */}
            <svg 
              className="w-12 h-12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              VoiceHealth
            </h1>
          </div>
          <p className="text-white text-lg opacity-90">
            AI Medical Assistant for Rural India
          </p>
          <p className="text-white text-sm opacity-75 mt-2">
            Upload prescription • Get analysis • Voice guidance
          </p>
        </div>

        {/* Language Selector */}
        <div className="mb-6">
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        {/* Main Content */}
        <div className="card">
          {!analysisData ? (
            <UploadPrescription 
              onAnalysisComplete={handleAnalysisComplete}
              selectedLanguage={selectedLanguage}
              loading={loading}
              setLoading={setLoading}
            />
          ) : (
            <PrescriptionAnalysis 
              data={analysisData}
              selectedLanguage={selectedLanguage}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white text-sm opacity-75">
          <p className="flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" />
            Made for AI for Good Hackathon 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;