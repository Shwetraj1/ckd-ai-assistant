const API_URL = "http://127.0.0.1:8000/api/v1";

export async function analyzeLab(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 20000); // 20s timeout

    const response = await fetch(`${API_URL}/labs/analyze`, {
      method: "POST",
      body: formData,
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error("Server error while analyzing");
    }

    return await response.json();
  } catch (error) {
    return { error: error.message || "Analysis failed" };
  }
}
