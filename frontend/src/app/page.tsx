export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-400 to-purple-600 text-white">
      <h1 className="text-4xl font-bold">Resume Ranker 🧠📄</h1>
      <p className="mt-4 text-xl">Upload your resume, get instant AI-powered feedback!</p>
    </main>
  );
}
import ResumeUploader from "@/components/ResumeUploader";
<div className="bg-white shadow-md p-6 rounded-lg max-w-xl mx-auto mt-10">
  <ResumeUploader />
</div>
