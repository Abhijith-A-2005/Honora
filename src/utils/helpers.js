// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getStatusBadgeClass(status) {
  const map = {
    "Open":               "badge-open",
    "Trial":              "badge-trial",
    "Hearing":            "badge-hearing",
    "Closed":             "badge-closed",
    "Under Investigation":"badge-investigation",
  };
  return map[status] || "badge-closed";
}

export function getTypeBadgeClass(clientType) {
  return clientType === "Prosecution" ? "badge-prosecution" : "badge-defense";
}

export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
