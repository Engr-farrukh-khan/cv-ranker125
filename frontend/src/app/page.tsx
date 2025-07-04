import ResumeUploader from "@/components/ResumeUploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-400 to-purple-600 text-white p-4">
      <h1 className="text-4xl font-bold">Resume Ranker 🧠📄</h1>
      <p className="mt-4 text-xl text-center">
        Upload your resume and job description. Let AI rank them for you!
      </p>
      <div className="bg-white text-black shadow-md p-6 rounded-lg max-w-xl w-full mt-8">
        <ResumeUploader />
      </div>
    </main>
  );
}
