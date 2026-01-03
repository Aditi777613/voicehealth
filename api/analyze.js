export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const HF_API_KEY = process.env.HF_API_KEY;
  if (!HF_API_KEY) {
    return res.status(500).json({ error: "HF_API_KEY missing in environment variables" });
  }

  try {
    // ✅ NEW ENDPOINT - HuggingFace Router API
    const hfResponse = await fetch(
      "https://router.huggingface.co/models/meta-llama/Llama-3.2-11B-Vision-Instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error("HuggingFace Router error:", errorText);
      return res.status(hfResponse.status).json({
        error: "HuggingFace API request failed",
        details: errorText,
      });
    }

    const data = await hfResponse.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Backend analyze error:", err);
    return res.status(500).json({ 
      error: "Internal server error",
      details: err.message 
    });
  }
}
