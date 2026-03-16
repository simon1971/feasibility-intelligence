export default function ProgressBar({ current, total }) {
  const progress = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600">
        <span>Question {current} of {total}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-950 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
