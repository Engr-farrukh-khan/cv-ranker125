"use client";

import { useState } from "react";
import { rankResumes } from "@/utils/api";
import { RankedResume } from "@/types";
import RankingResult from "./RankingResult";

export default function ResumeUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [jobDesc, setJobDesc] = useState("");
  const [results, setResults] = useState<RankedResume[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!files.length || !jobDesc.trim()) return alert("Please fill all fields");
    setLoading(true);
    try {
      const ranked = await rankResumes(files, jobDesc);
      setResults(ranked);
    } catch (err) {
      alert("Failed to fetch ranking.");
    }
    setLoading(false);
  };

  return (
    <div>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={4}
        placeholder="Paste job description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />
      <input
        type="file"
        multiple
        accept="application/pdf"
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
        className="mb-4"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Ranking..." : "Rank Resumes"}
      </button>

      <div className="mt-6">
        {results.length > 0 && <RankingResult results={results} />}
      </div>
    </div>
  );
}
