# VoiceHealth - AI Medical Assistant for India

## Overview
VoiceHealth is a mobile-first PWA that helps Indians understand medical prescriptions using AI. Upload a prescription photo, get instant analysis in your local language, and receive voice-guided instructions.

## Features
- 📸 Upload prescription images or take photos
- 🤖 AI-powered prescription analysis using Google Gemini
- 🌍 Multi-language support (English, Hindi, Punjabi, Bengali, Telugu, Marathi, Tamil, Gujarati)
- 🔊 Voice output for illiterate users
- 💊 Detailed medicine information (dosage, timing, side effects)
- ⏰ Medication reminders
- ⚠️ Drug interaction warnings
- 📱 Works offline (PWA)
- 💾 Stores prescriptions locally

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Google Gemini 2.5 Flash (Generative Language API)
- Web Speech API
- Service Workers (PWA)
- Local Storage

## Installation

### Prerequisites
- Node.js 18+
- Gemini API key

### Steps
1. Clone the repository
```bash
git clone <your-repo-url>
cd voicehealth
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`
```
GEMINI_API_KEY=your_api_key_here
```

5. Run development server
```bash
npm run dev
```

6. Build for production
```bash
npm run build
```

## Usage

1. **Select Language**: Choose your preferred language from the language selector
2. **Upload Prescription**: 
   - Drag and drop a prescription image
   - Click "Choose File" to browse
   - Click "Take Photo" to use camera
3. **Review Analysis**: See detailed medicine information, dosages, and warnings
4. **Listen**: Click the speaker icon to hear the analysis in your language
5. **Set Reminders**: Switch to the Reminders tab to set medication alerts
6. **Check Warnings**: Review any drug interactions or precautions

## Project Structure
```
voicehealth/
├── public/              # Static assets and PWA files
├── src/
│   ├── components/      # React components
│   ├── services/        # API and storage services
│   ├── utils/          # Helper functions
│   ├── hooks/          # Custom React hooks
│   └── App.jsx         # Main app component
└── README.md
```

## API Usage
This app uses Google Gemini (Gemini 2.5 Flash) via Google’s Generative Language API (free tier).

## Browser Support
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers with camera support

## PWA Features
- Install on home screen
- Offline functionality
- Push notifications for reminders

## Deployment
Deploy to any static hosting service:
- Vercel: `vercel deploy`
- Netlify: Drag and drop `dist` folder
- GitHub Pages: Push `dist` to `gh-pages` branch

## Contributing
This is a hackathon project built for AI for Good Hackathon 2026. Contributions welcome!

## License
MIT

## Contact
Built with ❤️ for healthcare accessibility

---

**Note**: This app is for informational purposes only and should not replace professional medical advice.
