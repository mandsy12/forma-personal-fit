const STORAGE_KEY = "forma-checkins-v1";

type CheckinData = Record<string, string>;

function loadCheckins(): CheckinData {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {};
    }

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed as CheckinData;
  } catch {
    return {};
  }
}

function saveCheckins(checkins: CheckinData) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checkins));
}

export function isWorkoutCompleted(date: string) {
  const checkins = loadCheckins();
  return Boolean(checkins[date]);
}

export function getWorkoutCheckin(date: string) {
  const checkins = loadCheckins();
  return checkins[date] ?? null;
}

export function completeWorkout(date: string, workoutId: string) {
  const checkins = loadCheckins();

  checkins[date] = workoutId;

  saveCheckins(checkins);
}

export function removeWorkoutCheckin(date: string) {
  const checkins = loadCheckins();

  delete checkins[date];

  saveCheckins(checkins);
}

export function getCheckinsInRange(startDate: Date, endDate: Date) {
  const checkins = loadCheckins();

  const result: CheckinData = {};

  const current = new Date(startDate);

  while (current <= endDate) {
    const dateKey = formatDateKey(current);

    if (checkins[dateKey]) {
      result[dateKey] = checkins[dateKey];
    }

    current.setDate(current.getDate() + 1);
  }

  return result;
}

export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getAllCheckins(): CheckinData {
  return loadCheckins();
}