import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronLeft,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import { ExerciseImage } from "@/components/ExerciseImage";
import {
  exercises,
  getExerciseById,
  MUSCLE_GROUPS,
} from "@/data/exercises";
import {
  getWorkoutById,
  getWorkoutExercises,
  type Workout,
} from "@/data/workouts";
import { loadWorkouts, saveWorkouts } from "@/data/workoutStore";

export const Route = createFileRoute("/treinos/$workoutId")({
  loader: ({ params }) => {
    const workout = getWorkoutById(params.workoutId);

    return {
      workout: workout ?? null,
      exercises: workout ? getWorkoutExercises(workout) : [],
    };
  },

  head: ({ loaderData }) => {
    const title = loaderData?.workout
      ? `${loaderData.workout.title} — FORMA`
      : "Treino — FORMA";

    return {
      meta: [
        { title },
        {
          name: "description",
          content: "Treino personalizado no FORMA.",
        },
      ],
    };
  },

  component: WorkoutPage,
});

function WorkoutPage() {
  const loaderData = Route.useLoaderData();
  const { workoutId } = Route.useParams();

  const [workout, setWorkout] = useState<Workout | null>(
    loaderData.workout,
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(
    loaderData.workout?.title ?? "",
  );
  const [draftExerciseIds, setDraftExerciseIds] = useState<string[]>(
    loaderData.workout?.exerciseIds ?? [],
  );

  const [showAddExercise, setShowAddExercise] = useState(false);

  useEffect(() => {
    const storedWorkouts = loadWorkouts();
    const storedWorkout = storedWorkouts.find(
      (item) => item.id === workoutId,
    );

    if (storedWorkout) {
      setWorkout(storedWorkout);
      setDraftTitle(storedWorkout.title);
      setDraftExerciseIds(storedWorkout.exerciseIds);
    }
  }, [workoutId]);

  const currentExercises = useMemo(() => {
    return workout ? getWorkoutExercises(workout) : [];
  }, [workout]);

  const editExercises = useMemo(() => {
    return draftExerciseIds
      .map((id) => getExerciseById(id))
      .filter((exercise): exercise is NonNullable<typeof exercise> =>
        Boolean(exercise),
      );
  }, [draftExerciseIds]);

  const currentExercise = currentExercises[currentIndex];

  const isLast =
    currentExercises.length > 0 &&
    currentIndex === currentExercises.length - 1;

  function startEditing() {
    if (!workout) {
      return;
    }

    setDraftTitle(workout.title);
    setDraftExerciseIds(workout.exerciseIds);
    setEditing(true);
  }

  function cancelEditing() {
    if (!workout) {
      return;
    }

    setDraftTitle(workout.title);
    setDraftExerciseIds(workout.exerciseIds);
    setShowAddExercise(false);
    setEditing(false);
  }

  function saveEditing() {
    if (!workout) {
      return;
    }

    const title = draftTitle.trim();

    if (!title) {
      return;
    }

    const updatedWorkout: Workout = {
      ...workout,
      title,
      exerciseIds: draftExerciseIds,
    };

    const allWorkouts = loadWorkouts();

    const updatedAllWorkouts = allWorkouts.map((item) =>
      item.id === updatedWorkout.id ? updatedWorkout : item,
    );

    saveWorkouts(updatedAllWorkouts);
    setWorkout(updatedWorkout);
    setCurrentIndex(0);
    setShowAddExercise(false);
    setEditing(false);
  }

  function addExercise(id: string) {
    if (draftExerciseIds.includes(id)) {
      return;
    }

    setDraftExerciseIds((current) => [...current, id]);
  }

  function removeExercise(id: string) {
    setDraftExerciseIds((current) =>
      current.filter((exerciseId) => exerciseId !== id),
    );
  }

  function moveExercise(index: number, direction: "up" | "down") {
  setDraftExerciseIds((current) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= current.length) {
      return current;
    }

    const next = [...current];
    const [item] = next.splice(index, 1);

    if (item === undefined) {
      return current;
    }

    next.splice(targetIndex, 0, item);

    return next;
  });
}

  if (!workout) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Treino não encontrado
        </h1>

        <Link
          to="/treinos"
          className="mt-5 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar para treinos
        </Link>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="space-y-7">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/treinos"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Treinos
          </Link>

          <button
            type="button"
            onClick={cancelEditing}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-accent/50"
          >
            <X className="h-4 w-4" />
            Cancelar
          </button>
        </div>

        <header>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Editar treino
          </p>

          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Monte do seu jeito
          </h1>
        </header>

        <div className="card-soft space-y-6 p-5 sm:p-7">
          <div>
            <label
              htmlFor="workout-name"
              className="text-sm font-semibold text-foreground"
            >
              Nome do treino
            </label>

            <input
              id="workout-name"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Exercícios
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Reordene, remova ou adicione exercícios.
                </p>
              </div>

              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {editExercises.length} exercícios
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {editExercises.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">
                  Ainda não há exercícios neste treino.
                </div>
              ) : (
                editExercises.map((exercise, index) => (
                  <div
                    key={`${exercise.id}-${index}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-semibold text-secondary-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {exercise.name}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {exercise.sets} séries · {exercise.reps}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveExercise(index, "up")}
                        disabled={index === 0}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-accent disabled:opacity-30"
                        aria-label="Mover para cima"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => moveExercise(index, "down")}
                        disabled={index === editExercises.length - 1}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-accent disabled:opacity-30"
                        aria-label="Mover para baixo"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeExercise(exercise.id)}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Remover ${exercise.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {showAddExercise ? (
            <div className="rounded-2xl border border-[color:var(--color-wine)]/20 bg-[color:var(--color-rose)]/15 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Adicionar exercício
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Escolha um exercício da biblioteca.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddExercise(false)}
                  className="rounded-full p-2 text-muted-foreground hover:bg-white/60"
                  aria-label="Fechar biblioteca"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <select
                defaultValue=""
                onChange={(event) => {
                  if (!event.target.value) {
                    return;
                  }

                  addExercise(event.target.value);
                  event.target.value = "";
                }}
                className="mt-4 w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-sm outline-none focus:border-primary"
              >
                <option value="">Selecione um exercício</option>

                {MUSCLE_GROUPS.map((group) => {
                  const groupExercises = exercises.filter(
                    (exercise) => exercise.group === group,
                  );

                  if (groupExercises.length === 0) {
                    return null;
                  }

                  return (
                    <optgroup key={group} label={group}>
                      {groupExercises
                        .filter(
                          (exercise) =>
                            !draftExerciseIds.includes(exercise.id),
                        )
                        .map((exercise) => (
                          <option
                            key={exercise.id}
                            value={exercise.id}
                          >
                            {exercise.name}
                          </option>
                        ))}
                    </optgroup>
                  );
                })}
              </select>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowAddExercise(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[color:var(--color-wine)]/35 bg-[color:var(--color-rose)]/20 px-5 py-4 text-sm font-semibold text-[color:var(--color-plum)] hover:bg-[color:var(--color-rose)]/35"
            >
              <Plus className="h-4 w-4" />
              Adicionar exercício
            </button>
          )}

          <button
            type="button"
            onClick={saveEditing}
            disabled={!draftTitle.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
          >
            <Save className="h-4 w-4" />
            Salvar alterações
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/treinos"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Treinos
        </Link>

        <button
          type="button"
          onClick={startEditing}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition hover:bg-accent/50"
        >
          <Pencil className="h-4 w-4" />
          Editar treino
        </button>
      </div>

      <header>
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          {workout.subtitle}
        </p>

        <h1 className="mt-1 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {workout.title}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {currentExercises.length}{" "}
          {currentExercises.length === 1 ? "exercício" : "exercícios"}
        </p>
      </header>

      {currentExercises.length === 0 ? (
        <div className="card-soft p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Seu treino ainda está vazio.
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Adicione exercícios para começar a montar essa rotina.
          </p>

          <button
            type="button"
            onClick={startEditing}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="h-4 w-4" />
            Adicionar exercícios
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {currentExercises.map((exercise, index) => (
              <button
                key={`${exercise.id}-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${index === currentIndex
                  ? "border-primary bg-secondary/60"
                  : "border-border bg-white hover:bg-accent/50"
                  }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-semibold text-secondary-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {exercise.name}
                  </span>

                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {exercise.sets} séries · {exercise.reps}
                    {exercise.note ? ` · ${exercise.note}` : ""}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {currentExercises.map((item, index) => (
              <span
                key={`${item.id}-${index}`}
                className={`h-1 flex-1 rounded-full transition-colors ${index <= currentIndex ? "bg-primary" : "bg-muted"
                  }`}
              />
            ))}
          </div>

          {currentExercise ? (
            <article className="card-soft overflow-hidden p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl font-bold text-secondary-foreground">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>

                <span className="text-xs text-muted-foreground">
                  {currentIndex + 1} de {currentExercises.length}
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-bold leading-snug text-foreground">
                {currentExercise.name}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {currentExercise.group}
              </p>

              <ExerciseImage
                exercise={currentExercise}
                className="mt-5 aspect-[4/3] w-full"
              />

              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-accent/50 px-4 py-3">
                  <dt className="text-xs text-muted-foreground">
                    Séries
                  </dt>
                  <dd className="mt-0.5 text-foreground">
                    {currentExercise.sets}
                  </dd>
                </div>

                <div className="rounded-2xl bg-accent/50 px-4 py-3">
                  <dt className="text-xs text-muted-foreground">
                    Repetições
                  </dt>
                  <dd className="mt-0.5 text-foreground">
                    {currentExercise.reps}
                  </dd>
                </div>
              </dl>

              {currentExercise.note ? (
                <p className="mt-4 text-sm italic text-secondary-foreground">
                  {currentExercise.note}
                </p>
              ) : null}

              <Link
                to="/exercicios/$exerciseId"
                params={{ exerciseId: currentExercise.id }}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-sm text-foreground hover:bg-accent/60"
              >
                Ver exercício
              </Link>
            </article>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex((value) => Math.max(0, value - 1))
              }
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-4 text-sm text-foreground transition-colors hover:bg-accent/60 disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </button>

            {isLast ? (
              <Link
                to="/treinos"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Check className="h-4 w-4" />
                Concluir
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((value) =>
                    Math.min(currentExercises.length - 1, value + 1),
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Próximo
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}