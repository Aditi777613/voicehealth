export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY missing in environment variables" });
  }

  try {
    const { imageBase64, prompt } = req.body;

    if (!imageBase64 || !prompt) {
      return res.status(400).json({ error: "Missing imageBase64 or prompt in request body" });
    }

    // ✅ Google Gemini 1.5 Flash - CORRECT MODEL NAME
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageBase64
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096,
          }
        })
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", errorText);
      return res.status(geminiResponse.status).json({
        error: "Gemini API request failed",
        details: errorText,
      });
    }

    const data = await geminiResponse.json();
    
    // Extract text from Gemini response
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      return res.status(500).json({ error: "Invalid Gemini API response format" });
    }

    const content = data.candidates[0].content.parts[0].text;
    
    // Parse JSON from response
    let jsonText = content.trim();
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Try to find JSON in the response
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }
    
    const analysis = JSON.parse(jsonText);
    
    return res.status(200).json(analysis);
  } catch (err) {
    console.error("Backend analyze error:", err);
    return res.status(500).json({ 
      error: "Internal server error",
      details: err.message 
    });
  }
}
