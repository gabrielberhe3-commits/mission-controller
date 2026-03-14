export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 overflow-hidden rounded-full bg-[var(--progress-track)]">
      <div className="h-full rounded-full bg-[var(--progress-fill)]" style={{ width: `${value}%` }} />
    </div>
  );
}
