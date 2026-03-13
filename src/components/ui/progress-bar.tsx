export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,#d69b53,#f4d7a1)]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
