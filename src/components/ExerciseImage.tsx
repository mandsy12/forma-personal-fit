import type { Exercise } from "@/data/exercises";

/**
 * Container branco e limpo para os GIFs dos exercícios.
 * Nenhum filtro ou recorte é aplicado às imagens.
 */
export function ExerciseImage({
  exercise,
  className = "",
}: {
  exercise: Exercise;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl bg-white ${className}`}
    >
      {exercise.image ? (
        <img
          src={exercise.image}
          alt={exercise.name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="px-6 py-10 text-center text-xs tracking-[0.18em] text-muted-foreground uppercase">
          GIF em breve
        </span>
      )}
    </div>
  );
}
