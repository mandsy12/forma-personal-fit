import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, LibraryBig } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { useUserName } from "@/lib/user-name";
import { workouts } from "@/data/workouts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início — FORMA" },
      {
        name: "description",
        content: "Escolha o treino do dia e siga sua rotina com clareza.",
      },
      { property: "og:title", content: "Início — FORMA" },
      {
        property: "og:description",
        content: "Escolha o treino do dia e siga sua rotina com clareza.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { name } = useUserName();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="FORMA"
        title={`Olá, ${name}`}
        description="O que vamos treinar hoje?"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {workouts.map((workout) => (
          <Link
            key={workout.id}
            to="/treinos/$workoutId"
            params={{ workoutId: workout.id }}
            className="card-soft group flex flex-col justify-between gap-6 p-6 transition-colors hover:border-secondary"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
                {workout.subtitle}
              </span>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-2xl leading-snug font-medium text-foreground">
                {workout.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {workout.exerciseIds.length} exercícios
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/exercicios"
        className="card-soft flex items-center justify-between gap-4 px-6 py-5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <LibraryBig className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.6} />
          <span className="truncate text-base text-foreground">Ver exercícios</span>
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.6} />
      </Link>
    </div>
  );
}
