export async function analyzePrescription(imageBase64, language) {

  try {
    // Use Hugging Face Inference API with Llama 3.2 Vision
    const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    imageBase64,
    language,
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
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HuggingFace API Error:', errorText);
      throw new Error(`HuggingFace API request failed: ${response.status}. Error: ${errorText}`);
    }

    const result = await response.json();
    console.log('HuggingFace API Response:', result);
    
    let content = '';
    
    // HuggingFace returns different formats
    if (Array.isArray(result)) {
      content = result[0].generated_text || result[0];
    } else if (result.generated_text) {
      content = result.generated_text;
    } else {
      throw new Error('Unexpected API response format');
    }
    
    // Parse JSON from response
    let jsonText = content.trim();
    
    // Remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Try to find JSON in the response
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }
    
    const analysis = JSON.parse(jsonText);
    
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