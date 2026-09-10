import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { PageHeader } from "@/components/PageHeader";
import { useUserName } from "@/lib/user-name";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — FORMA" },
      { name: "description", content: "Ajuste como o FORMA chama você." },
      { property: "og:title", content: "Perfil — FORMA" },
      { property: "og:description", content: "Ajuste como o FORMA chama você." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { name, saveName } = useUserName();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  const [saved, setSaved] = useState(false);

  useEffect(() => setValue(name), [name]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    saveName(value);
    setEditing(false);
    setSaved(true);
  }

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Perfil" title={`Olá, ${name}`} description="Seu treino, do seu jeito." />

      <div className="card-soft space-y-4 p-6">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="profile-name" className="block text-sm text-muted-foreground">
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

        {saved ? <p className="text-sm text-secondary-foreground">Nome atualizado.</p> : null}

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
