// src/components/ResultsTable.tsx
'use client'

export default function ResultsTable({ results }: any) {
  if (!results || results.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Ranking Results</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">File</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r: any, idx: number) => (
            <tr key={idx}>
              <td className="p-2 border">{r.filename}</td>
              <td className="p-2 border">{(r.score * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
