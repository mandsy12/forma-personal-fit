import { exercises, getExerciseById, type Exercise } from "./exercises";

/**
 * TREINOS
 * ------------------------------------------------------------------
 * Cada treino referencia os IDs definidos em ./exercises.ts.
 * Para editar um treino, basta alterar a lista `exerciseIds`.
 */

export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  exerciseIds: string[];
}

export const workouts: Workout[] = [
  {
    id: "ombro-triceps",
    title: "Ombro + Tríceps",
    subtitle: "Parte superior",
    exerciseIds: [
      "desenvolvimento-halter",
      "elevacao-lateral",
      "triceps-polia",
      "elevacao-frontal-polia",
      "triceps-polia-barra-reta",
      "triceps-martelo-halter",
      "cardio-escolha",
    ],
  },
  {
    id: "costas-biceps",
    title: "Costas + Bíceps",
    subtitle: "Parte superior",
    exerciseIds: [
      "puxada-alta-aberta",
      "remada-baixa",
      "pull-down",
      "face-pull",
      "biceps-martelo-halter",
      "biceps-barra-w",
      "cardio-escolha",
    ],
  },
  {
    id: "gluteo-posterior",
    title: "Glúteo + Posterior",
    subtitle: "Parte inferior",
    exerciseIds: [
      "cadeira-abdutora",
      "elevacao-pelvica",
      "bulgaro-halter",
      "stiff-barra",
      "coice-polia",
      "cadeira-flexora",
      "cardio-vontade",
    ],
  },
  {
    id: "quadriceps-panturrilha",
    title: "Quadríceps + Panturrilha",
    subtitle: "Parte inferior",
    exerciseIds: [
      "cadeira-abdutora",
      "agachamento-livre-smith",
      "leg-press",
      "cadeira-extensora",
      "afundo-passada",
      "panturrilha-sentada",
      "panturrilha-em-pe",
      "cardio-vontade",
    ],
  },
];

export const getWorkoutById = (id: string): Workout | undefined =>
  workouts.find((workout) => workout.id === id);

export const getWorkoutExercises = (workout: Workout): Exercise[] =>
  workout.exerciseIds
    .map((id) => getExerciseById(id))
    .filter((exercise): exercise is Exercise => Boolean(exercise));

export const totalExercises = exercises.length;
