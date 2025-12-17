export const sanitizeString = (string) => {
  // replace hyphens with spaces, lowercase everything, then capitalize first letter
  const lower = string.replace(/-/g, " ").toLowerCase();
  return lower.charAt(0) + lower.slice(1);
}
