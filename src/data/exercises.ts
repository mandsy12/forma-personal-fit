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

import desenvolvimentoHalter from "@/assets/exercises/ombro/desenvolvimento-halter.gif";
import elevacaoLateral from "@/assets/exercises/ombro/elevacao-lateral.gif";
import elevacaoFrontalPolia from "@/assets/exercises/ombro/elevacao-frontal-polia.gif";

import tricepsPolia from "@/assets/exercises/triceps/triceps-polia.gif";
import tricepsPoliaBarraReta from "@/assets/exercises/triceps/triceps-polia-barra-reta.gif";
import tricepsMarteloHalter from "@/assets/exercises/triceps/triceps-martelo-halter.gif";

import puxadaAltaAberta from "@/assets/exercises/costas/puxada-alta-aberta.gif";
import remadaBaixa from "@/assets/exercises/costas/remada-baixa.gif";
import pullDown from "@/assets/exercises/costas/pull-down.gif";
import facePull from "@/assets/exercises/costas/face-pull.gif";

import bicepsMarteloHalter from "@/assets/exercises/biceps/biceps-martelo-halter.gif";
import bicepsBarraW from "@/assets/exercises/biceps/biceps-barra-w.gif";

import cadeiraAbdutora from "@/assets/exercises/gluteos/cadeira-abdutora.gif";
import elevacaoPelvica from "@/assets/exercises/gluteos/elevacao-pelvica.gif";
import bulgaroHalter from "@/assets/exercises/gluteos/bulgaro-halter.gif";
import coicePolia from "@/assets/exercises/gluteos/coice-polia.gif";

import stiffBarra from "@/assets/exercises/posterior/stiff-barra.gif";
import cadeiraFlexora from "@/assets/exercises/posterior/cadeira-flexora.gif";

import agachamentoLivreSmith from "@/assets/exercises/quadriceps/agachamento-livre-smith.gif";
import legPress from "@/assets/exercises/quadriceps/leg-press.gif";
import cadeiraExtensora from "@/assets/exercises/quadriceps/cadeira-extensora.gif";
import afundoPassada from "@/assets/exercises/quadriceps/afundo-passada.gif";

import panturrilhaSentada from "@/assets/exercises/panturrilha/panturrilha-sentada.gif";
import panturrilhaEmPe from "@/assets/exercises/panturrilha/panturrilha-em-pe.gif";

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
    image: desenvolvimentoHalter,
    sets: "3",
    reps: "12 ou 10",
    rest: "",
  },
  {
    id: "elevacao-lateral",
    name: "Elevação lateral",
    group: "Ombro",
    image: elevacaoLateral,
    sets: "3",
    reps: "12 ou 10",
    rest: "",
  },
  {
    id: "elevacao-frontal-polia",
    name: "Elevação frontal na polia",
    group: "Ombro",
    image: elevacaoFrontalPolia,
    sets: "3",
    reps: "10",
    rest: "",
  },

  // ── TRÍCEPS ──────────────────────────────────────────────
  {
    id: "triceps-polia",
    name: "Tríceps na polia",
    group: "Tríceps",
    image: tricepsPolia,
    sets: "4",
    reps: "10",
    rest: "",
    note: "Drop set.",
  },
  {
    id: "triceps-polia-barra-reta",
    name: "Tríceps na polia com barra reta",
    group: "Tríceps",
    image: tricepsPoliaBarraReta,
    sets: "3",
    reps: "10",
    rest: "",
  },
  {
    id: "triceps-martelo-halter",
    name: "Tríceps martelo com halter",
    group: "Tríceps",
    image: tricepsMarteloHalter,
    sets: "3",
    reps: "15",
    rest: "",
  },

  // ── COSTAS ───────────────────────────────────────────────
  {
    id: "puxada-alta-aberta",
    name: "Puxada Alta Aberta",
    group: "Costas",
    image: puxadaAltaAberta,
    sets: "4",
    reps: "15 / 12 / 10 / 8",
    rest: "",
  },
  {
    id: "remada-baixa",
    name: "Remada baixa na polia",
    group: "Costas",
    image: remadaBaixa,
    sets: "3",
    reps: "10",
    rest: "",
    note:
      "Se não tiver como fazer a remada baixa na polia, pode fazer a remada curvada com barra.",
  },
  {
    id: "pull-down",
    name: "Pull down",
    group: "Costas",
    image: pullDown,
    sets: "3",
    reps: "10",
    rest: "",
  },
  {
    id: "face-pull",
    name: "Face pull",
    group: "Costas",
    image: facePull,
    sets: "3",
    reps: "10",
    rest: "",
  },

  // ── BÍCEPS ───────────────────────────────────────────────
  {
    id: "biceps-martelo-halter",
    name: "Bíceps martelo com halter",
    group: "Bíceps",
    image: bicepsMarteloHalter,
    sets: "3",
    reps: "12",
    rest: "",
  },
  {
    id: "biceps-barra-w",
    name: "Bíceps com barra W",
    group: "Bíceps",
    image: bicepsBarraW,
    sets: "3",
    reps: "10",
    rest: "",
  },

  // ── GLÚTEOS ──────────────────────────────────────────────
  {
    id: "cadeira-abdutora",
    name: "Cadeira abdutora",
    group: "Glúteos",
    image: cadeiraAbdutora,
    sets: "3",
    reps: "15",
    rest: "",
  },
  {
    id: "elevacao-pelvica",
    name: "Elevação pélvica",
    group: "Glúteos",
    image: elevacaoPelvica,
    sets: "4",
    reps: "12 / 10 / 8 / 6",
    rest: "",
    note: "Progressão de carga.",
  },
  {
    id: "bulgaro-halter",
    name: "Búlgaro com halter",
    group: "Glúteos",
    image: bulgaroHalter,
    sets: "3",
    reps: "12",
    rest: "",
  },
  {
    id: "coice-polia",
    name: "Coice na polia",
    group: "Glúteos",
    image: coicePolia,
    sets: "3",
    reps: "10",
    rest: "",
  },

  // ── POSTERIOR ────────────────────────────────────────────
  {
    id: "stiff-barra",
    name: "Stiff com barra",
    group: "Posterior",
    image: stiffBarra,
    sets: "3",
    reps: "10",
    rest: "",
  },
  {
    id: "cadeira-flexora",
    name: "Cadeira flexora",
    group: "Posterior",
    image: cadeiraFlexora,
    sets: "3",
    reps: "15",
    rest: "",
    note:
      "Se não tiver como fazer na cadeira flexora, pode fazer na mesa flexora.",
  },

  // ── QUADRÍCEPS ───────────────────────────────────────────
  {
    id: "agachamento-livre-smith",
    name: "Agachamento",
    group: "Quadríceps",
    image: agachamentoLivreSmith,
    sets: "4",
    reps: "12 / 10 / 8 / 6",
    rest: "",
    note: "Pode ser no livre ou no Smith. Progressão de carga.",
  },
  {
    id: "leg-press",
    name: "Leg press",
    group: "Quadríceps",
    image: legPress,
    sets: "4",
    reps: "12 / 10 / 8 / 6",
    rest: "",
    note: "Progressão de carga.",
  },
  {
    id: "cadeira-extensora",
    name: "Cadeira extensora",
    group: "Quadríceps",
    image: cadeiraExtensora,
    sets: "3",
    reps: "10",
    rest: "",
    note: "Fazendo drop set.",
  },
  {
    id: "afundo-passada",
    name: "Afundo",
    group: "Quadríceps",
    image: afundoPassada,
    sets: "3",
    reps: "10",
    rest: "",
    note: "Pode ser na passada, com halter ou no Smith.",
  },

  // ── PANTURRILHA ──────────────────────────────────────────
  {
    id: "panturrilha-sentada",
    name: "Panturrilha na máquina sentada",
    group: "Panturrilha",
    image: panturrilhaSentada,
    sets: "3",
    reps: "15 a 20",
    rest: "",
  },
  {
    id: "panturrilha-em-pe",
    name: "Panturrilha na máquina em pé",
    group: "Panturrilha",
    image: panturrilhaEmPe,
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