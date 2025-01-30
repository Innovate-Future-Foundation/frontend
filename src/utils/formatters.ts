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

export const formatDateToDDMMYYYY = (isoDate: string): string => {
  const date = new Date(isoDate); // Convert ISO string to Date object
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year
  return `${year}-${month}-${day}`;
};
