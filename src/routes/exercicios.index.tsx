import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { MUSCLE_GROUPS, exercisesByGroup } from "@/data/exercises";

export const Route = createFileRoute("/exercicios/")({
  head: () => ({
    meta: [
      { title: "Exercícios — FORMA" },
      { name: "description", content: "Biblioteca de exercícios organizada por grupo muscular." },
      { property: "og:title", content: "Exercícios — FORMA" },
      {
        property: "og:description",
        content: "Biblioteca de exercícios organizada por grupo muscular.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <div className="space-y-9">
      <PageHeader
        eyebrow="Biblioteca"
        title="Exercícios"
        description="Consulte a execução, as séries e as repetições de cada movimento."
      />

      {MUSCLE_GROUPS.map((group) => {
        const items = exercisesByGroup(group);
        if (items.length === 0) return null;
        return (
          <section key={group} className="space-y-3">
            <h2 className="text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
              {group}
            </h2>
            <ul className="space-y-3">
              {items.map((exercise) => (
                <li key={exercise.id}>
                  <Link
                    to="/exercicios/$exerciseId"
                    params={{ exerciseId: exercise.id }}
                    className="card-soft flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-base text-foreground">
                        {exercise.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {exercise.sets} × {exercise.reps}
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
          </section>
        );
      })}
    </div>
  );
}
