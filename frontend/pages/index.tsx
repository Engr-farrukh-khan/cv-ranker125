// pages/index.tsx
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [jd, setJd] = useState('');
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    formData.append("job_description", jd);
    const res = await axios.post("https://web-production-89b18.up.railway.app", formData);
    setResults(res.data.results);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Resume Ranker</h1>
      <textarea
        placeholder="Paste Job Description"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        style={{ width: '100%', height: 100 }}
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload and Rank</button>
      <ul>
        {results.map((r, i) => (
          <li key={i}>
            {r.filename} - Score: {r.score.toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
}
