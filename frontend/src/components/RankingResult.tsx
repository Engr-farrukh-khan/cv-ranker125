import { RankedResume } from "@/types";

export default function RankingResult({ results }: { results: RankedResume[] }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Ranking Results</h2>
      <ul className="space-y-2">
        {results.map((res, i) => (
          <li key={res.filename} className="bg-gray-100 p-3 rounded text-black">
            #{i + 1} - {res.filename} → <strong>{(res.score * 100).toFixed(2)}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
