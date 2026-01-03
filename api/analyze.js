export const config = {
  runtime: "nodejs", // IMPORTANT: not edge
};

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 🔑 Read HF key from Vercel environment
  const HF_API_KEY = process.env.HF_API_KEY;

  if (!HF_API_KEY) {
    return res.status(500).json({ error: "HF_API_KEY missing" });
  }

  try {
    // ✅ Forward request body directly (image + prompt)
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-11B-Vision-Instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    // ❗ Handle HuggingFace non-200 responses properly
    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error("HuggingFace error:", errorText);
      return res.status(hfResponse.status).json({
        error: "HuggingFace API request failed",
        details: errorText,
      });
    }

    const data = await hfResponse.json();

    // ✅ Always return JSON
    return res.status(200).json(data);
  } catch (err) {
    console.error("Analyze API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
