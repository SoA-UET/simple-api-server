export function toTitleCase(str: string) {
  if (!str) {
    return ""; // Handle empty or null strings
  }
  return str
    .toLowerCase() // Convert the entire string to lowercase first
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}
