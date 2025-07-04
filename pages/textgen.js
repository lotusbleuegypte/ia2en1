import { useState } from 'react';

export default function TextGen() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const generate = async () => {
    const res = await fetch('/api/textgen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResult(data.output);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧠 Générateur de Texte IA</h1>
      <textarea rows="5" onChange={e => setInput(e.target.value)} />
      <br />
      <button onClick={generate}>Générer</button>
      <pre>{result}</pre>
    </div>
  );
}
