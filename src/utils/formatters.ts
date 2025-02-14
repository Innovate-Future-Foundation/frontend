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
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const convertToQueryParams = (obj: object): URLSearchParams => {
  const params = new URLSearchParams();

  function appendValues(key: string, value: any) {
    if (Array.isArray(value)) {
      value.forEach(item => params.append(key, item));
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        appendValues(`${key}.${subKey}`, subValue);
      });
    } else if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  }

  Object.entries(obj).forEach(([key, value]) => {
    appendValues(key, value);
  });

  return params;
};
