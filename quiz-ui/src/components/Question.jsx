function SingleChoice({ question, value, onChange }) {
  return (
    <div className="grid gap-3">
      {question.options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-12 w-full rounded-xl border px-4 py-3 text-left text-lg font-medium transition ${
              selected
                ? 'border-slate-950 bg-slate-950 text-white'
                : 'border-slate-200 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function MultiChoice({ question, value = [], onChange }) {
  const toggle = (option) => {
    const exists = value.includes(option);
    if (exists) {
      onChange(value.filter((item) => item !== option));
      return;
    }
    if (question.maxSelections && value.length >= question.maxSelections) {
      return;
    }
    onChange([...value, option]);
  };

  return (
    <div className="grid gap-3">
      {question.options.map((option) => {
        const selected = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`min-h-12 w-full rounded-xl border px-4 py-3 text-left text-lg font-medium transition ${
              selected
                ? 'border-slate-950 bg-slate-950 text-white'
                : 'border-slate-200 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            {option}
          </button>
        );
      })}
      {question.maxSelections ? (
        <p className="text-sm text-slate-500">Select up to {question.maxSelections}.</p>
      ) : null}
    </div>
  );
}

function RangeChoice({ question, value = question.min, onChange }) {
  const step = question.step ?? 1;
  const decrement = () => onChange(Math.max(question.min, Number(value) - step));
  const increment = () => onChange(Math.min(question.max, Number(value) + step));

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
        <div className="text-4xl font-semibold text-slate-950">{value}</div>
        <div className="mt-1 text-sm text-slate-500">{question.unitLabel}</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decrement}
          className="min-h-12 min-w-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-2xl font-semibold text-slate-900 transition hover:bg-slate-50"
          aria-label="Decrease value"
        >
          −
        </button>

        <input
          type="range"
          min={question.min}
          max={question.max}
          step={question.step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="quiz-range w-full"
        />

        <button
          type="button"
          onClick={increment}
          className="min-h-12 min-w-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-2xl font-semibold text-slate-900 transition hover:bg-slate-50"
          aria-label="Increase value"
        >
          +
        </button>
      </div>

      <div className="flex justify-between text-sm text-slate-500">
        <span>{question.minLabel ?? question.min}</span>
        <span>{question.maxLabel ?? question.max}</span>
      </div>
    </div>
  );
}

export default function Question({ question, value, onChange }) {
  return (
    <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="grid gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Validation survey</p>
        <h2 className="text-2xl font-semibold leading-tight text-slate-950">{question.question}</h2>
      </div>

      {question.type === 'single' ? <SingleChoice question={question} value={value} onChange={onChange} /> : null}
      {question.type === 'multi' ? <MultiChoice question={question} value={value} onChange={onChange} /> : null}
      {question.type === 'range' ? <RangeChoice question={question} value={value} onChange={onChange} /> : null}
    </div>
  );
}
