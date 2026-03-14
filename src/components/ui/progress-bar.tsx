export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 overflow-hidden rounded-full bg-black/8">
      <div className="h-full rounded-full bg-[#222428]" style={{ width: `${value}%` }} />
    </div>
  );
}
