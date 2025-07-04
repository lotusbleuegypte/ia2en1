import { useState } from 'react';

export default function TextGen() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [task, setTask] = useState('creative');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch('/api/textgen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, task }),
    });
    const data = await res.json();
    setResult(data.result || data.output || 'Erreur');
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧠 Générateur IA Intelligent (Offline)</h1>
      <textarea rows="6" onChange={e => setPrompt(e.target.value)} />
      <br />
      <select onChange={e => setTask(e.target.value)} value={task}>
        <option value="creative">Création</option>
        <option value="correct">Correction</option>
        <option value="translate">Traduction</option>
        <option value="summary">Résumé</option>
      </select>
      <br /><br />
      <button onClick={generate} disabled={loading}>
        {loading ? '⏳ Traitement...' : 'Générer'}
      </button>
      <pre style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>{result}</pre>
    </div>
  );
}
