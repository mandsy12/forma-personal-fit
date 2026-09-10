/**
 * BIBLIOTECA DE EXERCÍCIOS
 * ------------------------------------------------------------------
 * Para adicionar o GIF de um exercício:
 *
 * 1. Coloque o arquivo em:  src/assets/exercises/<grupo>/<arquivo>.gif
 *    (ombro, triceps, costas, biceps, gluteos, posterior,
 *     quadriceps, panturrilha)
 *
 * 2. Importe no topo deste arquivo, por exemplo:
 *      import desenvolvimentoHalter from "@/assets/exercises/ombro/desenvolvimento-halter.gif";
 *
 * 3. Preencha o campo `image` do exercício correspondente:
 *      image: desenvolvimentoHalter,
 *
 * Nenhuma imagem externa / API é usada neste projeto.
 */

export type MuscleGroup =
  | "Ombro"
  | "Tríceps"
  | "Costas"
  | "Bíceps"
  | "Glúteos"
  | "Posterior"
  | "Quadríceps"
  | "Panturrilha"
  | "Cardio";

export const MUSCLE_GROUPS: MuscleGroup[] = [
  "Ombro",
  "Tríceps",
  "Costas",
  "Bíceps",
  "Glúteos",
  "Posterior",
  "Quadríceps",
  "Panturrilha",
  "Cardio",
];

export interface Exercise {
  id: string;
  name: string;
  group: MuscleGroup;
  /** GIF local importado de src/assets/exercises/<grupo>/ */
  image?: string;
  /** Séries — ex.: "3" */
  sets: string;
  /** Repetições — ex.: "12 ou 10" */
  reps: string;
  /** Descanso — ex.: "90s" (deixe "" para exibir "A definir") */
  rest: string;
  /** Observação opcional */
  note?: string;
}

export const exercises: Exercise[] = [
  // ── OMBRO ────────────────────────────────────────────────
  {
    id: "desenvolvimento-halter",
    name: "Desenvolvimento com Halter",
    group: "Ombro",
    sets: "3",
    reps: "12 ou 10",
    rest: "",
  },
  {
    id: "elevacao-lateral",
    name: "Elevação lateral",
    group: "Ombro",
    sets: "3",
    reps: "12 ou 10",
    rest: "",
  },
  {
    id: "elevacao-frontal-polia",
    name: "Elevação frontal na polia",
    group: "Ombro",
    sets: "3",
    reps: "10",
    rest: "",
  },

  // ── TRÍCEPS ──────────────────────────────────────────────
  {
    id: "triceps-polia",
    name: "Tríceps na polia",
    group: "Tríceps",
    sets: "4",
    reps: "10",
    rest: "",
    note: "Drop set.",
  },
  {
    id: "triceps-polia-barra-reta",
    name: "Tríceps na polia com barra reta",
    group: "Tríceps",
    sets: "3",
    reps: "10",
    rest: "",
  },
  {
    id: "triceps-martelo-halter",
    name: "Tríceps martelo com halter",
    group: "Tríceps",
    sets: "3",
    reps: "15",
    rest: "",
  },

  // ── COSTAS ───────────────────────────────────────────────
  {
    id: "puxada-alta-aberta",
    name: "Puxada Alta Aberta",
    group: "Costas",
    sets: "4",
    reps: "15 / 12 / 10 / 8",
    rest: "",
  },
  {
    id: "remada-baixa",
    name: "Remada baixa na polia ou com halter",
    group: "Costas",
    sets: "3",
    reps: "10",
    rest: "",
  },
  {
    id: "pull-down",
    name: "Pull down",
    group: "Costas",
    sets: "3",
    reps: "10",
    rest: "",
  },
  {
    id: "face-pull",
    name: "Face pull",
    group: "Costas",
    sets: "3",
    reps: "10",
    rest: "",
  },

  // ── BÍCEPS ───────────────────────────────────────────────
  {
    id: "biceps-martelo-halter",
    name: "Bíceps martelo com halter",
    group: "Bíceps",
    sets: "3",
    reps: "12",
    rest: "",
  },
  {
    id: "biceps-barra-w",
    name: "Bíceps com barra W",
    group: "Bíceps",
    sets: "3",
    reps: "10",
    rest: "",
  },

  // ── GLÚTEOS ──────────────────────────────────────────────
  {
    id: "cadeira-abdutora",
    name: "Cadeira abdutora",
    group: "Glúteos",
    sets: "3",
    reps: "15",
    rest: "",
  },
  {
    id: "elevacao-pelvica",
    name: "Elevação pélvica",
    group: "Glúteos",
    sets: "4",
    reps: "12 / 10 / 8 / 6",
    rest: "",
    note: "Progressão de carga.",
  },
  {
    id: "bulgaro-halter",
    name: "Búlgaro com halter",
    group: "Glúteos",
    sets: "3",
    reps: "12",
    rest: "",
  },
  {
    id: "coice-polia",
    name: "Coice na polia",
    group: "Glúteos",
    sets: "3",
    reps: "10",
    rest: "",
  },

  // ── POSTERIOR ────────────────────────────────────────────
  {
    id: "stiff-barra",
    name: "Stiff com barra",
    group: "Posterior",
    sets: "3",
    reps: "10",
    rest: "",
  },
  {
    id: "cadeira-flexora",
    name: "Cadeira flexora",
    group: "Posterior",
    sets: "3",
    reps: "15",
    rest: "",
  },

  // ── QUADRÍCEPS ───────────────────────────────────────────
  {
    id: "agachamento-livre-smith",
    name: "Agachamento livre ou no Smith",
    group: "Quadríceps",
    sets: "4",
    reps: "12 / 10 / 8 / 6",
    rest: "",
    note: "Progressão de carga.",
  },
  {
    id: "leg-press",
    name: "Leg press",
    group: "Quadríceps",
    sets: "4",
    reps: "12 / 10 / 8 / 6",
    rest: "",
    note: "Progressão de carga.",
  },
  {
    id: "cadeira-extensora",
    name: "Cadeira extensora",
    group: "Quadríceps",
    sets: "3",
    reps: "10",
    rest: "",
    note: "Fazendo drop set.",
  },
  {
    id: "afundo-passada",
    name: "Afundo passada ou no Smith",
    group: "Quadríceps",
    sets: "3",
    reps: "10",
    rest: "",
  },

  // ── PANTURRILHA ──────────────────────────────────────────
  {
    id: "panturrilha-sentada",
    name: "Panturrilha na máquina sentada",
    group: "Panturrilha",
    sets: "3",
    reps: "15 a 20",
    rest: "",
  },
  {
    id: "panturrilha-em-pe",
    name: "Panturrilha na máquina em pé",
    group: "Panturrilha",
    sets: "3",
    reps: "15 a 20",
    rest: "",
  },

  // ── CARDIO ───────────────────────────────────────────────
  {
    id: "cardio-escolha",
    name: "Cardio à sua escolha",
    group: "Cardio",
    sets: "—",
    reps: "15 a 30 minutos",
    rest: "",
  },
  {
    id: "cardio-vontade",
    name: "Cardio à vontade",
    group: "Cardio",
    sets: "—",
    reps: "15 a 30 minutos",
    rest: "",
  },
];

export const getExerciseById = (id: string): Exercise | undefined =>
  exercises.find((exercise) => exercise.id === id);

export const exercisesByGroup = (group: MuscleGroup): Exercise[] =>
  exercises.filter((exercise) => exercise.group === group);
