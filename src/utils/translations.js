export const translations = {
  en: {
    appName: 'VoiceHealth',
    uploadTitle: 'Upload Your Prescription',
    analyzing: 'Analyzing Prescription...',
    medicines: 'Medicines',
    reminders: 'Reminders',
    warnings: 'Warnings',
    listenButton: 'Listen',
    newAnalysis: 'New Analysis'
  },
  hi: {
    appName: 'वॉयसहेल्थ',
    uploadTitle: 'अपनी दवाई की पर्ची अपलोड करें',
    analyzing: 'पर्ची का विश्लेषण हो रहा है...',
    medicines: 'दवाइयाँ',
    reminders: 'रिमाइंडर',
    warnings: 'चेतावनी',
    listenButton: 'सुनें',
    newAnalysis: 'नया विश्लेषण'
  },
  pa: {
    appName: 'ਵੌਇਸਹੈਲਥ',
    uploadTitle: 'ਆਪਣਾ ਨੁਸਖਾ ਅੱਪਲੋਡ ਕਰੋ',
    analyzing: 'ਨੁਸਖੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...',
    medicines: 'ਦਵਾਈਆਂ',
    reminders: 'ਰਿਮਾਈਂਡਰ',
    warnings: 'ਚੇਤਾਵਨੀਆਂ',
    listenButton: 'ਸੁਣੋ',
    newAnalysis: 'ਨਵਾਂ ਵਿਸ਼ਲੇਸ਼ਣ'
  }
};

export function getTranslation(key, language = 'en') {
  return translations[language]?.[key] || translations.en[key] || key;
}