import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, LibraryBig } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { useUserName } from "@/lib/user-name";
import { loadWorkouts } from "@/data/workoutStore";
import {
  formatDateKey,
  getCheckinsInRange,
} from "@/data/checkinStore";

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

function getMonday(date: Date) {
  const result = new Date(date);
  const day = result.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);
  result.setHours(0, 0, 0, 0);

  return result;
}

function Home() {
  const { name } = useUserName();

  const [workoutList, setWorkoutList] = useState(() => loadWorkouts());
  const [checkins, setCheckins] = useState<Record<string, string>>({});

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const weekDays = useMemo(() => {
    const monday = getMonday(today);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      return date;
    });
  }, [today]);

  useEffect(() => {
    setWorkoutList(loadWorkouts());

    const start = weekDays[0];
    const end = weekDays[6];

    if (start && end) {
      setCheckins(getCheckinsInRange(start, end));
    }
  }, [weekDays]);

  const completedCount = Object.keys(checkins).length;

  const progress = Math.round((completedCount / 7) * 100);

  const dayLabels = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="FORMA"
        title={`Olá, ${name}`}
        description="O que vamos treinar hoje?"
      />

      {/* SEMANA */}
      <section className="card-soft p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
              Sua semana
            </p>

            <h2 className="mt-1 text-xl font-semibold text-foreground">
              {completedCount}{" "}
              {completedCount === 1
                ? "treino concluído"
                : "treinos concluídos"}
            </h2>
          </div>

          <span className="text-sm text-muted-foreground">
            {completedCount}/7
          </span>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-2">
          {weekDays.map((date, index) => {
            const dateKey = formatDateKey(date);
            const completed = Boolean(checkins[dateKey]);
            const isToday = formatDateKey(today) === dateKey;

            return (
              <div
                key={dateKey}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-[0.65rem] font-semibold tracking-wider text-muted-foreground">
                  {dayLabels[index]}
                </span>

                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full border transition-all",
                    completed
                      ? "border-primary bg-primary text-primary-foreground"
                      : isToday
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground",
                  ].join(" ")}
                >
                  {completed ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : isToday ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  ) : (
                    <span className="text-sm">○</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Progresso da semana</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* TREINOS */}
      <div className="grid gap-4 sm:grid-cols-2">
        {workoutList.map((workout) => (
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

      {/* EXERCÍCIOS */}
      <Link
        to="/exercicios"
        className="card-soft flex items-center justify-between gap-4 px-6 py-5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <LibraryBig
            className="h-5 w-5 shrink-0 text-primary"
            strokeWidth={1.6}
          />

          <span className="truncate text-base text-foreground">
            Ver exercícios
          </span>
        </span>

        <ChevronRight
          className="h-5 w-5 shrink-0 text-muted-foreground"
          strokeWidth={1.6}
        />
      </Link>
    </div>
  );
}