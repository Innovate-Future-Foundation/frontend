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

export const formatDateToMMDDYY = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

export const formatTo24HourTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatTimeAgo = (timestamp: string | number | Date): string => {
  const updatedAt = new Date(timestamp).getTime();
  const now = Date.now();
  const diffInSeconds = Math.floor((now - updatedAt) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInYear = 365 * secondsInDay;

  if (diffInSeconds < secondsInHour) {
    return `${Math.floor(diffInSeconds / secondsInMinute)} minutes`;
  } else if (diffInSeconds < secondsInDay) {
    return `${Math.floor(diffInSeconds / secondsInHour)} hours`;
  } else if (diffInSeconds < secondsInYear) {
    return `${Math.floor(diffInSeconds / secondsInDay)} days`;
  } else {
    return `${Math.floor(diffInSeconds / secondsInYear)} years`;
  }
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
