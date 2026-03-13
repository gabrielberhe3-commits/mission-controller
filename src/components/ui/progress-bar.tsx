export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full rounded-full bg-white"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
