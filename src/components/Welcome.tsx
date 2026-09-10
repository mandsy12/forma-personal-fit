import { useState, type FormEvent } from "react";

export function Welcome({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) {
      setError("Por favor, digite seu nome.");
      return;
    }
    setError("");
    onSubmit(value);
  }

  return (
    <main className="flex min-h-[100dvh] flex-col justify-center bg-background px-6 py-14">
      <div className="mx-auto w-full max-w-md">
        <p className="font-display text-[2.75rem] leading-none tracking-[0.32em] text-foreground">
          FORMA
        </p>
        <p className="mt-4 text-sm text-secondary-foreground italic">Seu treino, do seu jeito.</p>

        <p className="mt-10 text-base leading-relaxed text-muted-foreground">
          Monte sua rotina, consulte seus exercícios e acompanhe seus treinos de forma simples.
        </p>

        <form onSubmit={handleSubmit} className="mt-12">
          <label
            htmlFor="name"
            className="font-display block text-2xl font-medium text-foreground"
          >
            Como podemos chamar você?
          </label>
          <input
            id="name"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Digite seu nome"
            autoComplete="given-name"
            className="mt-5 w-full rounded-2xl border border-border bg-card px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40 focus:outline-none"
          />
          {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-primary px-6 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continuar
          </button>
        </form>
      </div>
    </main>
  );
}
