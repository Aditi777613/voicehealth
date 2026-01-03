import { Languages } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
];

function LanguageSelector({ selectedLanguage, onLanguageChange }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <Languages className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold text-gray-800">Select Language</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedLanguage === lang.code
                ? 'border-primary bg-green-50 text-primary font-semibold'
                : 'border-gray-200 hover:border-primary hover:bg-gray-50'
            }`}
          >
            <div className="text-sm font-medium">{lang.native}</div>
            <div className="text-xs text-gray-500">{lang.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelector;