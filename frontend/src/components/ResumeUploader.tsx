// src/components/ResumeUploader.tsx
'use client'
import { useState } from 'react'

export default function ResumeUploader({ setResults }: any) {
  const [jobDesc, setJobDesc] = useState('')
  const [files, setFiles] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!files || !jobDesc) return alert('Please provide both fields.')

    const formData = new FormData()
    formData.append('job_description', jobDesc)
    Array.from(files).forEach(file => formData.append('files', file))

    setLoading(true)
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/rank', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    setResults(data.results)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <textarea
        placeholder="Paste Job Description here..."
        className="w-full p-2 border rounded"
        rows={4}
        value={jobDesc}
        onChange={e => setJobDesc(e.target.value)}
      />
      <input
        type="file"
        multiple
        onChange={e => setFiles(e.target.files)}
        className="block"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Ranking...' : 'Upload & Rank'}
      </button>
    </form>
  )
}
