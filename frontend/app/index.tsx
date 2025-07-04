import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [jd, setJd] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [results, setResults] = useState<{ filename: string; score: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async () => {
    if (!files || !jd.trim()) return;
    setLoading(true);
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });
    formData.append('job_description', jd);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rank`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Resume Ranker</h1>

      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Paste Job Description"
        rows={6}
        cols={60}
        style={{ marginTop: '1rem', padding: '0.5rem' }}
      />

      <div style={{ marginTop: '1rem' }}>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
        {loading ? 'Ranking...' : 'Upload and Rank'}
      </button>

      <ul style={{ marginTop: '2rem' }}>
        {results.map((r, i) => (
          <li key={i}>{r.filename} — Score: {r.score.toFixed(2)}%</li>
        ))}
      </ul>
    </main>
  );
}
