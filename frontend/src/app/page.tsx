export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-2xl">
      <h1>🚀 Welcome to CV Ranker by Farrukh Noor Khan</h1>
      <form action="/api/upload" method="POST" encType="multipart/form-data">
  <input type="file" name="resume" accept=".pdf" />
  <button type="submit">Upload</button>
</form>

    </div>
    
  );
}
