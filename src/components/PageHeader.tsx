import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display mt-1 text-3xl leading-tight font-medium text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
