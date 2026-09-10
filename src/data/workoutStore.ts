import { workouts, type Workout } from "./workouts";

const STORAGE_KEY = "forma-workouts-v1";

export function loadWorkouts(): Workout[] {
  if (typeof window === "undefined") {
    return workouts;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
      return workouts;
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return workouts;
    }

    return parsed as Workout[];
  } catch {
    return workouts;
  }
}

export function saveWorkouts(value: Workout[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function resetWorkouts() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}