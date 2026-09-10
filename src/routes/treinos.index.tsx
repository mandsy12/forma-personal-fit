import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { workouts } from "@/data/workouts";

export const Route = createFileRoute("/treinos/")({
  head: () => ({
    meta: [
      { title: "Treinos — FORMA" },
      { name: "description", content: "Seus quatro treinos, organizados e prontos para começar." },
      { property: "og:title", content: "Treinos — FORMA" },
      {
        property: "og:description",
        content: "Seus quatro treinos, organizados e prontos para começar.",
      },
    ],
  }),
  component: WorkoutsPage,
});

function WorkoutsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Rotina"
        title="Treinos"
        description="Escolha um treino para ver a sequência de exercícios."
      />

      <ul className="space-y-4">
        {workouts.map((workout) => (
          <li key={workout.id}>
            <Link
              to="/treinos/$workoutId"
              params={{ workoutId: workout.id }}
              className="card-soft flex items-center justify-between gap-4 px-6 py-5"
            >
              <span className="min-w-0">
                <span className="font-display block truncate text-xl font-medium text-foreground">
                  {workout.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {workout.exerciseIds.length} exercícios · {workout.subtitle}
                </span>
              </span>
              <ChevronRight
                className="h-5 w-5 shrink-0 text-muted-foreground"
                strokeWidth={1.6}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
