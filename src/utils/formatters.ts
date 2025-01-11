export const abbreviateName = (name: string): string => {
  if (!name || !name.trim()) return "";

  const namePieces = name.split(/\s+/);
  const abbreviation = namePieces
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p.charAt(0).toUpperCase())
    .join("");
  return abbreviation;
};

export const ellipticalString = (sentence: string, digit: number): string => {
  if (!sentence || digit <= 0) return "";
  if (sentence.length <= digit) return sentence;
  return `${sentence.substring(0, digit).trim()}...`;
};
