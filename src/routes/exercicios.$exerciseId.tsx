import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { ExerciseImage } from "@/components/ExerciseImage";
import { getExerciseById } from "@/data/exercises";

export const Route = createFileRoute("/exercicios/$exerciseId")({
  loader: ({ params }) => {
    const exercise = getExerciseById(params.exerciseId);
    if (!exercise) throw notFound();
    return { exercise };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.exercise.name} — FORMA` : "Exercício — FORMA";
    const description = loaderData
      ? `${loaderData.exercise.name} · ${loaderData.exercise.group}. Séries, repetições e execução.`
      : "Exercício indisponível.";
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
  component: ExerciseDetail,
});

function ExerciseDetail() {
  const { exercise } = Route.useLoaderData();
  const router = useRouter();

  const rows = [
    { label: "Grupo muscular", value: exercise.group },
    { label: "Séries", value: exercise.sets },
    { label: "Repetições", value: exercise.reps },
    { label: "Descanso", value: exercise.rest || "A definir" },
    { label: "Observação", value: exercise.note || "—" },
  ];

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => router.history.back()}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
        Voltar
      </button>

      <ExerciseImage exercise={exercise} className="aspect-[4/3] w-full border border-border" />

      <header className="min-w-0">
        <h1 className="font-display text-3xl leading-tight font-medium text-foreground">
          {exercise.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{exercise.group}</p>
      </header>

      <dl className="card-soft divide-y divide-border px-5">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-4">
            <dt className="text-sm text-muted-foreground">{row.label}</dt>
            <dd className="text-right text-sm text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={() => router.history.back()}
        className="w-full rounded-2xl bg-primary px-6 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Voltar
      </button>
    </div>
  );
}
