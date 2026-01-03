export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const HF_API_KEY = process.env.HF_API_KEY;

  if (!HF_API_KEY) {
    return res.status(500).json({ error: "HF_API_KEY missing" });
  }

  try {
    const response = await fetch(
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

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
