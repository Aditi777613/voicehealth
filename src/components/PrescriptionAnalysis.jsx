import { useState } from 'react';
import MedicineCard from './MedicineCard';
import VoiceOutput from './VoiceOutput';
import ReminderSetup from './ReminderSetup';
import { ArrowLeft, Volume2, AlertTriangle, Info } from 'lucide-react';

function PrescriptionAnalysis({ data, selectedLanguage, onReset }) {
  const [activeTab, setActiveTab] = useState('medicines');

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">New Analysis</span>
        </button>
        
        <VoiceOutput 
          text={data.summary}
          language={selectedLanguage}
        />
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Prescription Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {data.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('medicines')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'medicines'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Medicines ({data.medicines.length})
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'reminders'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Reminders
        </button>
        <button
          onClick={() => setActiveTab('warnings')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'warnings'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Warnings
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'medicines' && (
          <div className="space-y-4">
            {data.medicines.map((medicine, index) => (
              <MedicineCard 
                key={index}
                medicine={medicine}
                language={selectedLanguage}
              />
            ))}
          </div>
        )}

        {activeTab === 'reminders' && (
          <ReminderSetup medicines={data.medicines} />
        )}

        {activeTab === 'warnings' && (
          <div className="space-y-4">
            {data.warnings && data.warnings.length > 0 ? (
              data.warnings.map((warning, index) => (
                <div key={index} className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">
                        {warning.title || 'Important Warning'}
                      </h4>
                      <p className="text-red-800">
                        {warning.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-green-50 rounded-lg p-8 text-center">
                <p className="text-green-800 font-medium">
                  No critical warnings detected. Follow your doctor's instructions carefully.
                </p>
              </div>
            )}

            {/* General Advice */}
            {data.followUpAdvice && (
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      Follow-up Advice
                    </h4>
                    <p className="text-blue-800">
                      {data.followUpAdvice}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrescriptionAnalysis;