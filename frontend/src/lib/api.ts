import axios from "axios";
import type { FormDoc } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
});

// FORMS
export async function listForms(): Promise<FormDoc[]> {
  const { data } = await api.get("/api/forms");
  return data.data as FormDoc[];
}

export async function getForm(id: string): Promise<FormDoc> {
  const { data } = await api.get(`/api/forms/${id}`);
  return data.data as FormDoc;
}

export async function createForm(payload: Partial<FormDoc>): Promise<FormDoc> {
  const { data } = await api.post("/api/forms", payload);
  return data.data as FormDoc;
}

export async function updateForm(id: string, payload: Partial<FormDoc>): Promise<FormDoc> {
  const { data } = await api.put(`/api/forms/${id}`, payload);
  return data.data as FormDoc;
}

export async function deleteForm(id: string): Promise<void> {
  await api.delete(`/api/forms/${id}`);
}

export async function duplicateForm(id: string): Promise<FormDoc> {
  const { data } = await api.post(`/api/forms/${id}/duplicate`);
  return data.data as FormDoc;
}

// SUBMISSIONS
export async function submitToForm(
  id: string,
  answers: any,
  files: Record<string, File | undefined>
) {
  const fd = new FormData();
  fd.append("answers", JSON.stringify(answers));
  Object.entries(files).forEach(([key, file]) => {
    if (file) fd.append(key, file);
  });
  const { data } = await api.post(`/api/forms/${id}/submissions`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export async function fetchAnalytics(
  id: string,
  days = 30
): Promise<{
  totalSubmissions: number;
  rangeDays: number;
  submissionsByDate: { _id: string; count: number }[];
}> {
  const { data } = await api.get(`/api/forms/${id}/analytics`, { params: { days } });
  return data.data;
}

export async function downloadCSV(id: string) {
  const res = await api.get(`/api/forms/${id}/submissions.csv`, { responseType: "blob" });
  const url = URL.createObjectURL(res.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = "submissions.csv";
  a.click();
  URL.revokeObjectURL(url);
}
