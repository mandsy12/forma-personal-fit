import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Check, Flame, Trophy, CalendarDays } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { useUserName } from "@/lib/user-name";
import { loadWorkouts } from "@/data/workoutStore";
import {
  formatDateKey,
  getAllCheckins,
  getCheckinsInRange,
} from "@/data/checkinStore";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — FORMA" },
      {
        name: "description",
        content: "Acompanhe sua evolução e sua consistência no FORMA.",
      },
      { property: "og:title", content: "Perfil — FORMA" },
      {
        property: "og:description",
        content: "Acompanhe sua evolução e sua consistência no FORMA.",
      },
    ],
  }),
  component: ProfilePage,
});

function getMonday(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);
  result.setHours(0, 0, 0, 0);

  return result;
}

function getStartOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getEndOfMonth(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );
}

function ProfilePage() {
  const { name, saveName } = useUserName();

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  const [saved, setSaved] = useState(false);

  const [checkins, setCheckins] = useState<Record<string, string>>({});
  const [workoutTitles, setWorkoutTitles] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    setValue(name);
  }, [name]);

  useEffect(() => {
    setCheckins(getAllCheckins());

    const workouts = loadWorkouts();

    const titles: Record<string, string> = {};

    workouts.forEach((workout) => {
      titles[workout.id] = workout.title;
    });

    setWorkoutTitles(titles);
  }, []);

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

  const monthStart = useMemo(() => getStartOfMonth(today), [today]);
  const monthEnd = useMemo(() => getEndOfMonth(today), [today]);

  const completedThisWeek = useMemo(() => {
    const start = weekDays[0];
    const end = weekDays[6];

    if (!start || !end) {
      return 0;
    }

    return Object.keys(getCheckinsInRange(start, end)).length;
  }, [weekDays, checkins]);

  const completedThisMonth = useMemo(() => {
    return Object.keys(
      getCheckinsInRange(monthStart, monthEnd),
    ).length;
  }, [monthStart, monthEnd, checkins]);

  const totalWorkouts = Object.keys(checkins).length;

  const currentStreak = useMemo(() => {
    let streak = 0;
    const current = new Date(today);

    while (true) {
      const dateKey = formatDateKey(current);

      if (!checkins[dateKey]) {
        break;
      }

      streak += 1;
      current.setDate(current.getDate() - 1);
    }

    return streak;
  }, [checkins, today]);

  const monthlyHistory = useMemo(() => {
    const months = [];

    for (let index = 3; index >= 0; index -= 1) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - index,
        1,
      );

      const start = getStartOfMonth(date);
      const end = getEndOfMonth(date);

      const count = Object.keys(getCheckinsInRange(start, end)).length;

      const label = date
        .toLocaleDateString("pt-BR", {
          month: "long",
        })
        .replace(/^./, (letter) => letter.toUpperCase());

      months.push({
        label,
        count,
      });
    }

    return months;
  }, [today, checkins]);

  const mostPerformedWorkouts = useMemo(() => {
    const counts: Record<string, number> = {};

    Object.values(checkins).forEach((workoutId) => {
      counts[workoutId] = (counts[workoutId] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([workoutId, count]) => ({
        workoutId,
        count,
        title: workoutTitles[workoutId] ?? "Treino",
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [checkins, workoutTitles]);

  const monthGoal = 12;
  const monthProgress = Math.min(
    Math.round((completedThisMonth / monthGoal) * 100),
    100,
  );

  const dayLabels = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!value.trim()) {
      return;
    }

    saveName(value.trim());
    setEditing(false);
    setSaved(true);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Perfil"
        title={`Olá, ${name}`}
        description="Seu treino, do seu jeito."
      />

      {/* PROGRESSO */}
      <section className="card-soft space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
              Seu progresso
            </p>

            <h2 className="mt-1 text-xl font-semibold text-foreground">
              {completedThisMonth}{" "}
              {completedThisMonth === 1
                ? "treino este mês"
                : "treinos este mês"}
            </h2>
          </div>

          <Trophy className="h-5 w-5 text-primary" strokeWidth={1.7} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Meta mensal: {monthGoal} treinos</span>
            <span>{monthProgress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${monthProgress}%` }}
            />
          </div>
        </div>
      </section>

      {/* CONSISTÊNCIA */}
      <section className="card-soft space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
              Consistência
            </p>

            <h2 className="mt-1 text-xl font-semibold text-foreground">
              Sua semana
            </h2>
          </div>

          <CalendarDays
            className="h-5 w-5 text-primary"
            strokeWidth={1.7}
          />
        </div>

        <div className="grid grid-cols-7 gap-2">
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
                    "flex h-10 w-10 items-center justify-center rounded-full border",
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

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Flame className="h-4 w-4 text-primary" strokeWidth={1.8} />
          <span>
            {completedThisWeek}{" "}
            {completedThisWeek === 1
              ? "dia ativo nesta semana"
              : "dias ativos nesta semana"}
          </span>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="card-soft p-5">
          <p className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
            Treinos
          </p>

          <p className="mt-2 text-2xl font-semibold text-foreground">
            {totalWorkouts}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            concluídos no total
          </p>
        </div>

        <div className="card-soft p-5">
          <p className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
            Sequência
          </p>

          <p className="mt-2 text-2xl font-semibold text-foreground">
            {currentStreak}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {currentStreak === 1 ? "dia consecutivo" : "dias consecutivos"}
          </p>
        </div>

        <div className="card-soft p-5">
          <p className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
            Esta semana
          </p>

          <p className="mt-2 text-2xl font-semibold text-foreground">
            {completedThisWeek}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {completedThisWeek === 1
              ? "treino concluído"
              : "treinos concluídos"}
          </p>
        </div>
      </section>

      {/* HISTÓRICO MENSAL */}
      <section className="card-soft space-y-5 p-6">
        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
            Evolução
          </p>

          <h2 className="mt-1 text-xl font-semibold text-foreground">
            Últimos meses
          </h2>
        </div>

        <div className="space-y-4">
          {monthlyHistory.map((month) => {
            const width =
              Math.max(
                8,
                Math.min((month.count / monthGoal) * 100, 100),
              );

            return (
              <div key={month.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-foreground">{month.label}</span>
                  <span className="text-muted-foreground">
                    {month.count} {month.count === 1 ? "treino" : "treinos"}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TREINOS MAIS REALIZADOS */}
      {mostPerformedWorkouts.length > 0 ? (
        <section className="card-soft space-y-5 p-6">
          <div>
            <p className="text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
              Seus treinos
            </p>

            <h2 className="mt-1 text-xl font-semibold text-foreground">
              Mais realizados
            </h2>
          </div>

          <div className="space-y-3">
            {mostPerformedWorkouts.map((workout, index) => (
              <div
                key={workout.workoutId}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {index + 1}
                  </span>

                  <span className="truncate text-sm text-foreground">
                    {workout.title}
                  </span>
                </div>

                <span className="shrink-0 text-sm text-muted-foreground">
                  {workout.count}x
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* CONFIGURAÇÕES */}
      <div className="card-soft space-y-4 p-6">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label
              htmlFor="profile-name"
              className="block text-sm text-muted-foreground"
            >
              Seu nome
            </label>

            <input
              id="profile-name"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-base text-foreground focus:border-primary focus:ring-2 focus:ring-ring/40 focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setValue(name);
                  setEditing(false);
                }}
                className="rounded-2xl border border-border px-5 py-3.5 text-sm text-foreground transition-colors hover:bg-accent/60"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-2xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Salvar
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSaved(false);
              setEditing(true);
            }}
            className="w-full rounded-2xl bg-primary px-6 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Alterar meu nome
          </button>
        )}

        {saved ? (
          <p className="text-sm text-secondary-foreground">
            Nome atualizado.
          </p>
        ) : null}

        <Link
          to="/"
          className="block w-full rounded-2xl border border-border px-6 py-4 text-center text-base text-foreground transition-colors hover:bg-accent/60"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}