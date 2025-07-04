export default async function handler(req, res) {
  const prompt = req.body.prompt;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ output: "⛔ IA muette. Aucune réponse reçue.", raw: data });
    }

    res.status(200).json({ output: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ output: "⛔ Erreur serveur", details: error.message });
  }
}
