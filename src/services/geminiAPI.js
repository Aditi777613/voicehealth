export async function analyzePrescription(imageBase64, language) {
  try {
    // Call backend API
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageBase64,
        language: getLanguageName(language),
        prompt: `Analyze this medical prescription image and extract all information. Respond in ${getLanguageName(language)} language.

IMPORTANT: Return ONLY a valid JSON object with this exact structure (no extra text, no markdown):

{
  "summary": "Brief overview of the prescription in 2-3 sentences",
  "medicines": [
    {
      "name": "Medicine name",
      "purpose": "What this medicine treats",
      "dosage": "How much to take (e.g., 1 tablet, 5ml)",
      "timing": "When to take (e.g., After meals, Morning-Evening)",
      "duration": "How long to take (e.g., 7 days, 2 weeks)",
      "sideEffects": "Common side effects if any",
      "precautions": "Important warnings or precautions"
    }
  ],
  "warnings": [
    {
      "title": "Warning title",
      "message": "Detailed warning message"
    }
  ],
  "followUpAdvice": "When to visit doctor again or any follow-up instructions"
}

Rules:
1. Extract ALL medicines mentioned
2. Simplify medical terms for rural users
3. Include dosage, timing, and duration for each medicine
4. Highlight any dangerous interactions
5. If prescription is unclear, mention it in warnings
6. Keep language simple and easy to understand
7. Return pure JSON only - no markdown, no extra text`
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend API Error:', errorData);
      throw new Error(`Backend API request failed: ${response.status}. ${errorData.error || ''}`);
    }

    const analysis = await response.json();
    console.log('Backend API Response:', analysis);
    
    // Validate the response has required fields
    if (!analysis.summary || !analysis.medicines || !Array.isArray(analysis.medicines)) {
      throw new Error('Invalid response format from AI model');
    }
    
    return analysis;
  } catch (error) {
    console.error('Prescription Analysis Error:', error);
    throw error;
  }
}

function getLanguageName(code) {
  const languages = {
    'en': 'English',
    'hi': 'Hindi',
    'pa': 'Punjabi',
    'bn': 'Bengali',
    'te': 'Telugu',
    'mr': 'Marathi',
    'ta': 'Tamil',
    'gu': 'Gujarati'
  };
  return languages[code] || 'English';
}
