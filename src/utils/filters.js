// ─── FILTERS ──────────────────────────────────────────────────────────────────

export function filterLawyerCases(cases, profile) {
  if (!profile) return [];
  return cases.filter(c => c.assignedLawyerId === profile.id);
}

export function filterJudgeCases(cases, profile) {
  if (!profile) return [];
  return cases.filter(c => c.court === profile.court && c.presidingJudgeId === profile.id);
}

export function isJudgeAuthorized(caseData, profile) {
  if (!caseData || !profile) return false;
  return caseData.court === profile.court && caseData.presidingJudgeId === profile.id;
}

export function isLawyerAuthorized(caseData, profile) {
  if (!caseData || !profile) return false;
  return caseData.assignedLawyerId === profile.id;
}
