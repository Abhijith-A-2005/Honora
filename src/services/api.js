// ─── API SERVICE (placeholder for backend integration) ────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("evichain_token");
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const getCases     = ()           => request("/cases");
export const getCaseById  = (id)         => request(`/cases/${id}`);
export const getEvidence  = (caseId)     => request(`/cases/${caseId}/evidence`);
export const uploadEvidence = (caseId, data) => request(`/cases/${caseId}/evidence`, { method: "POST", body: JSON.stringify(data) });
export const login        = (credentials) => request("/auth/login",  { method: "POST", body: JSON.stringify(credentials) });
export const logout       = ()            => request("/auth/logout", { method: "POST" });
