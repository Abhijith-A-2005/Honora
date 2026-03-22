// services/api.js - Complete version with ALL exports needed

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("evichain_token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // If FormData is being sent, don't set Content-Type (browser will set it automatically)
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle response
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `API error: ${res.status}`);
  }

  return data;
}

// ============ AUTHENTICATION ============

/**
 * Register a new user
 */
export const signup = (name, email, password, role, walletAddress) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      role,
      walletAddress,
    }),
  });

/**
 * Login user
 */
export const login = (email, password) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

/**
 * Get current user info
 */
export const getCurrentUser = () => request("/auth/me", { method: "GET" });

/**
 * Logout user
 */
export const logout = () =>
  request("/auth/logout", { method: "POST" });

// ============ CASES ============

/**
 * Get all cases
 */
export const getCases = () =>
  request("/cases", { method: "GET" });

/**
 * Get case by ID
 */
export const getCaseById = (id) =>
  request(`/cases/${id}`, { method: "GET" });

/**
 * Create new case
 */
export const createCase = (caseData) =>
  request("/cases", {
    method: "POST",
    body: JSON.stringify(caseData),
  });

/**
 * Update case
 */
export const updateCase = (id, updates) =>
  request(`/cases/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

/**
 * Delete case
 */
export const deleteCase = (id) =>
  request(`/cases/${id}`, { method: "DELETE" });

// ============ EVIDENCE MANAGEMENT ============

/**
 * Get evidence for case
 */
export const getCaseEvidence = (caseId) =>
  request(`/cases/${caseId}/evidence`, { method: "GET" });

/**
 * Upload evidence
 */
export const uploadEvidence = (formData) =>
  request("/evidence/upload", {
    method: "POST",
    body: formData,
  });

/**
 * Get evidence by ID
 */
export const getEvidence = (id) =>
  request(`/evidence/${id}`, { method: "GET" });

/**
 * Get evidence history (chain of custody)
 */
export const getEvidenceHistory = (id) =>
  request(`/evidence/${id}/history`, { method: "GET" });

/**
 * Get forensic reports for evidence
 */
export const getForensicReports = (evidenceId) =>
  request(`/evidence/${evidenceId}/forensic-reports`, { method: "GET" });

/**
 * Delete evidence
 */
export const deleteEvidence = (id) =>
  request(`/evidence/${id}`, { method: "DELETE" });

// ============ CHAIN OF CUSTODY ============

/**
 * Transfer custody of evidence
 */
export const transferCustody = (evidenceId, recipientId, notes) =>
  request("/custody/transfer", {
    method: "POST",
    body: JSON.stringify({
      evidenceId,
      recipientId,
      notes,
    }),
  });

/**
 * Get custody history for evidence
 */
export const getCustodyHistory = (evidenceId) =>
  request(`/custody/history/${evidenceId}`, { method: "GET" });

// ============ SUPPORTING DOCUMENTS ============

/**
 * Upload supporting document
 */
export const uploadLawyerDocument = (formData) =>
  request("/supporting-docs/upload", {
    method: "POST",
    body: formData,
  });

/**
 * Get supporting document by ID
 */
export const getLawyerDocuments = (id) =>
  request(`/supporting-docs/${id}`, { method: "GET" });

/**
 * Verify/sign a supporting document
 */
export const verifyDocument = (id, signature) =>
  request(`/supporting-docs/verify/${id}`, {
    method: "POST",
    body: JSON.stringify({ signature }),
  });

/**
 * Delete document
 */
export const deleteDocument = (id) =>
  request(`/supporting-docs/${id}`, { method: "DELETE" });

// ============ FORENSIC REPORTS ============

/**
 * Get all forensic reports
 */
export const getForensicReportsAll = () =>
  request("/forensic-reports", { method: "GET" });

/**
 * Upload forensic report
 */
export const uploadForensicReport = (formData) =>
  request("/forensic-reports/upload", {
    method: "POST",
    body: formData,
  });

/**
 * Get forensic report by ID
 */
export const getForensicReport = (id) =>
  request(`/forensic-reports/${id}`, { method: "GET" });

/**
 * Delete forensic report
 */
export const deleteForensicReport = (id) =>
  request(`/forensic-reports/${id}`, { method: "DELETE" });

// ============ UTILITY FUNCTIONS ============

/**
 * Get stored authentication token
 */
export const getAuthToken = () => {
  return localStorage.getItem("evichain_token");
};

/**
 * Clear authentication token
 */
export const clearAuthToken = () => {
  localStorage.removeItem("evichain_token");
  localStorage.removeItem("evichain_user");
};

/**
 * Set authentication token
 */
export const setAuthToken = (token, user) => {
  localStorage.setItem("evichain_token", token);
  localStorage.setItem("evichain_user", JSON.stringify(user));
};

/**
 * Get stored user data
 */
export const getStoredUser = () => {
  const user = localStorage.getItem("evichain_user");
  return user ? JSON.parse(user) : null;
};
