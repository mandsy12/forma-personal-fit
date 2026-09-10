import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";

import { ExerciseImage } from "@/components/ExerciseImage";
import { getWorkoutById, getWorkoutExercises } from "@/data/workouts";

export const Route = createFileRoute("/treinos/$workoutId")({
  loader: ({ params }) => {
    const workout = getWorkoutById(params.workoutId);
    if (!workout) throw notFound();
    return { workout, exercises: getWorkoutExercises(workout) };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.workout.title} — FORMA` : "Treino — FORMA";
    const description = loaderData
      ? `Sequência do treino ${loaderData.workout.title}.`
      : "Treino indisponível.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: WorkoutPage,
});

function WorkoutPage() {
  const { workout, exercises } = Route.useLoaderData();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const exercise = exercises[index];
  const isLast = index === exercises.length - 1;

  return (
    <div className="space-y-7">
      <Link
        to="/treinos"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
        Treinos
      </Link>

      <header className="min-w-0">
        <p className="text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
          Treino do dia
        </p>
        <h1 className="font-display mt-1 text-3xl leading-tight font-medium text-foreground sm:text-4xl">
          {workout.title}
        </h1>
      </header>

      <div className="flex items-center gap-1.5">
        {exercises.map((item, i) => (
          <span
            key={`${item.id}-${i}`}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= index ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {exercise ? (
        <article className="card-soft overflow-hidden p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="font-display text-2xl text-secondary-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-xs text-muted-foreground">
              {index + 1} de {exercises.length}
            </span>
          </div>

          <h2 className="font-display mt-2 text-2xl leading-snug font-medium text-foreground">
            {exercise.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{exercise.group}</p>

          <ExerciseImage exercise={exercise} className="mt-5 aspect-[4/3] w-full" />

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-accent/50 px-4 py-3">
              <dt className="text-xs text-muted-foreground">Séries</dt>
              <dd className="mt-0.5 text-foreground">{exercise.sets}</dd>
            </div>
            <div className="rounded-2xl bg-accent/50 px-4 py-3">
              <dt className="text-xs text-muted-foreground">Repetições</dt>
              <dd className="mt-0.5 text-foreground">{exercise.reps}</dd>
            </div>
          </dl>

          {exercise.note ? (
            <p className="mt-4 text-sm text-secondary-foreground italic">{exercise.note}</p>
          ) : null}

          <Link
            to="/exercicios/$exerciseId"
            params={{ exerciseId: exercise.id }}
            className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-border px-5 py-3.5 text-sm text-foreground transition-colors hover:bg-accent/60"
          >
            Ver exercício
          </Link>
        </article>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-4 text-sm text-foreground transition-colors hover:bg-accent/60 disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
          Anterior
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Finalizar treino
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((value) => Math.min(exercises.length - 1, value + 1))}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Próximo
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </button>
        )}
      </div>
    </div>
  );
}
