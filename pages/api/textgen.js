export default async function handler(req, res) {
  const prompt = req.body.prompt;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  model: "mistral/mistral-7b-instruct",
  messages: [{ role: "user", content: prompt }],
}),
  });

  const data = await response.json();
  res.status(200).json({ output: data.choices[0].message.content });
}
