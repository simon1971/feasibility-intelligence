function formatAnswer(answer) {
  if (Array.isArray(answer)) {
    return answer.length ? answer.join(', ') : 'No selection';
  }
  if (answer === '' || answer === undefined || answer === null) {
    return 'No response';
  }
  return String(answer);
}

export default function Results({ questions, answers, onRestart }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="grid gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Survey complete</p>
        <h2 className="text-2xl font-semibold text-slate-950">Thank you for completing the feasibility screening survey.</h2>
        <p className="text-base leading-7 text-slate-600">
          This founder-validation quiz is designed to test whether rapid feasibility screening reports solve a real commercial problem for Sunshine Coast developers.
        </p>
      </div>

      <div className="grid gap-3">
        {questions.map((question) => (
          <div key={question.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-medium text-slate-500">{question.question}</div>
            <div className="mt-2 text-base font-semibold text-slate-950">{formatAnswer(answers[question.id])}</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="min-h-12 rounded-xl bg-slate-950 px-4 py-3 text-lg font-medium text-white transition hover:bg-slate-800"
      >
        Start again
      </button>
    </div>
  );
}
