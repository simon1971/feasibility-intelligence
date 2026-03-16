import { useEffect, useMemo, useState } from 'react';
import { questions } from '../data/questions';
import ProgressBar from './ProgressBar';
import Question from './Question';
import Results from './Results';

const STORAGE_KEY = 'feasibility-intelligence-quiz-responses';

function getInitialAnswers() {
  return questions.reduce((acc, question) => {
    if (question.type === 'multi') acc[question.id] = [];
    else if (question.type === 'range') acc[question.id] = question.min ?? 0;
    else acc[question.id] = '';
    return acc;
  }, {});
}

function isAnswered(question, answer) {
  if (question.type === 'multi') return Array.isArray(answer) && answer.length > 0;
  if (question.type === 'range') return typeof answer === 'number';
  return answer !== '' && answer !== undefined && answer !== null;
}

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(getInitialAnswers);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[step];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;
  const canContinue = currentQuestion ? isAnswered(currentQuestion, currentAnswer) : false;

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setAnswers((prev) => ({ ...prev, ...parsed }));
    } catch {
      // ignore malformed local storage
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const summary = useMemo(() => answers, [answers]);

  const handleChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!currentQuestion || !canContinue) return;
    if (step === questions.length - 1) {
      console.log('Feasibility validation responses:', summary);
      setCompleted(true);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    const reset = getInitialAnswers();
    setAnswers(reset);
    setStarted(false);
    setStep(0);
    setCompleted(false);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
  };

  if (!started) {
    return (
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Founder validation tool</p>
        <h1 className="text-3xl font-semibold leading-tight text-slate-950">
          Would Sunshine Coast developers pay for rapid feasibility screening reports?
        </h1>
        <p className="text-base leading-7 text-slate-600">
          This short quiz is designed to test demand, pain points, expected turnaround, and willingness to pay.
        </p>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          <p>Format:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>17 questions</li>
            <li>One question per screen</li>
            <li>Mobile-friendly interaction</li>
            <li>Answers stored temporarily in local storage and printed to console at the end</li>
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="min-h-12 rounded-xl bg-slate-950 px-4 py-3 text-lg font-medium text-white transition hover:bg-slate-800"
        >
          Start survey
        </button>
      </div>
    );
  }

  if (completed) {
    return <Results questions={questions} answers={answers} onRestart={handleRestart} />;
  }

  return (
    <div className="grid gap-4">
      <ProgressBar current={step + 1} total={questions.length} />
      <div className="animate-fade-in">
        <Question question={currentQuestion} value={currentAnswer} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canContinue}
          className="min-h-12 rounded-xl bg-slate-950 px-4 py-3 text-lg font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {step === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
