import { RankedResume } from "@/types";

export async function rankResumes(
  files: File[],
  jobDescription: string
): Promise<RankedResume[]> {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));
  formData.append("job_description", jobDescription);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rank`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to rank resumes");
  const data = await response.json();
  return data.results;
}
