import React, { useState, useEffect, useRef } from 'react';
import { X, Award, Download, RotateCcw, CheckCircle2 } from 'lucide-react';
import susQuestions from '../data/sus-questions.json';
import { calculateSusScore, interpretSusScore, exportSusToCsv, type SusResponse, type SusResult } from '../utils/sus';

interface SusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SusModal: React.FC<SusModalProps> = ({ isOpen, onClose }) => {
  const [responses, setResponses] = useState<SusResponse>({});
  const [result, setResult] = useState<SusResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [notes, setNotes] = useState('');
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOptionChange = (itemId: number, value: number) => {
    setResponses(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  const isComplete = susQuestions.every(q => responses[q.id] !== undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    const score = calculateSusScore(responses);
    const interpretation = interpretSusScore(score);
    setResult(interpretation);
    setSubmitted(true);

    // Save locally
    const submission = {
      timestamp: new Date().toISOString(),
      score,
      responses,
      notes: notes.trim()
    };
    const stored = JSON.parse(localStorage.getItem('sus-evaluations') || '[]');
    stored.push(submission);
    localStorage.setItem('sus-evaluations', JSON.stringify(stored));
  };

  const handleDownloadCsv = () => {
    const stored = JSON.parse(localStorage.getItem('sus-evaluations') || '[]');
    const csvContent = exportSusToCsv(stored);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sus_evaluation_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const stored = localStorage.getItem('sus-evaluations') || '[]';
    const blob = new Blob([stored], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sus_evaluation_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setResponses({});
    setResult(null);
    setSubmitted(false);
    setNotes('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sus-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] bg-surface border-2 border-line rounded-lg shadow-2xl p-6 text-text flex flex-col my-auto relative animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest text-accent uppercase">
                FORMAL HCI USABILITY EVALUATION
              </span>
              <span className="text-xs font-mono bg-bg px-2 py-0.5 rounded border border-line text-muted">
                ISO 9241-11
              </span>
            </div>
            <h2 id="sus-modal-title" className="font-serif text-2xl font-bold mt-1">
              System Usability Scale (SUS)
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Standardized 10-item psychometric benchmark (John Brooke, 1986).
            </p>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-1 rounded-md text-muted hover:text-text hover:bg-bg transition-colors"
            aria-label="Close SUS questionnaire"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto pr-2 space-y-6 flex-1">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-bg/60 p-3 rounded-md border border-line text-xs font-mono text-muted flex items-center justify-between">
                <span>1 = Strongly Disagree</span>
                <span className="text-accent">&bull;</span>
                <span>3 = Neutral</span>
                <span className="text-accent">&bull;</span>
                <span>5 = Strongly Agree</span>
              </div>

              {susQuestions.map((q, idx) => (
                <div key={q.id} className="p-3 rounded-md bg-bg/40 border border-line/60 hover:border-line transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-mono text-xs text-accent font-bold">
                      {(idx + 1).toString().padStart(2, '0')}.
                    </span>
                    <p className="text-sm font-medium flex-1 text-text">
                      {q.statement}
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const isSelected = responses[q.id] === val;
                      return (
                        <label
                          key={val}
                          className={`flex flex-col items-center justify-center p-2 rounded cursor-pointer border text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-accent text-bg font-bold border-accent shadow-xs'
                              : 'bg-surface border-line text-muted hover:border-accent hover:text-text'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`sus-question-${q.id}`}
                            value={val}
                            checked={isSelected}
                            onChange={() => handleOptionChange(q.id, val)}
                            className="sr-only"
                            required
                          />
                          <span className="text-sm font-bold">{val}</span>
                          <span className="text-[10px] opacity-75 mt-0.5">
                            {val === 1 ? 'Disagree' : val === 5 ? 'Agree' : val === 3 ? 'Neutral' : ''}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <label htmlFor="sus-notes" className="block text-xs font-mono text-muted uppercase tracking-wider mb-1">
                  Optional Observer / Participant Qualitative Feedback
                </label>
                <textarea
                  id="sus-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Note any cognitive friction points, navigation confusion, or accessibility observations..."
                  className="w-full bg-bg border border-line rounded p-2.5 text-xs text-text placeholder:text-muted/60 focus:border-accent focus:outline-none"
                />
              </div>

              <div className="sticky bottom-0 bg-surface/95 backdrop-blur-xs pt-3 border-t border-line flex items-center justify-between">
                <div className="text-xs font-mono text-muted">
                  Completed:{' '}
                  <span className="text-accent font-bold">
                    {Object.keys(responses).length} / {susQuestions.length}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={!isComplete}
                  className="px-5 py-2.5 rounded bg-accent text-bg font-mono font-bold text-xs uppercase tracking-wider hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-drafting"
                >
                  Calculate SUS Score &rarr;
                </button>
              </div>
            </form>
          ) : (
            /* Thank you & Results state */
            result && (
              <div className="space-y-6 py-4 animate-in fade-in duration-200">
                <div className="text-center p-6 bg-bg/80 border border-accent/40 rounded-lg">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 text-accent mb-3">
                    <Award size={32} />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-text mb-1">
                    SUS Score: {result.score} <span className="text-muted text-lg font-mono">/ 100</span>
                  </h3>
                  <div className="inline-block mt-2 px-3 py-1 rounded bg-accent text-bg font-mono font-bold text-xs">
                    GRADE: {result.grade} &bull; {result.adjective.toUpperCase()}
                  </div>
                  <p className="text-xs font-mono text-muted mt-3">
                    Percentile Benchmark: <span className="text-text font-bold">{result.percentileRange}</span> (Industry Avg: 68.0)
                  </p>
                </div>

                <div className="p-4 bg-surface border border-line rounded-md text-sm leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent font-bold">
                    <CheckCircle2 size={16} />
                    <span>EMPIRICAL USABILITY INTERPRETATION</span>
                  </div>
                  <p className="text-text/90">{result.interpretation}</p>
                </div>

                <div className="p-4 bg-bg border border-line rounded-md space-y-3">
                  <span className="text-xs font-mono text-muted block uppercase tracking-wider">
                    Data Persistence & Research Export
                  </span>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleDownloadCsv}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-line hover:border-accent text-xs font-mono text-text transition-colors"
                    >
                      <Download size={14} className="text-accent" />
                      Export Research CSV
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadJson}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-line hover:border-accent text-xs font-mono text-text transition-colors"
                    >
                      <Download size={14} className="text-accent" />
                      Export Raw JSON
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-line hover:border-accent text-xs font-mono text-muted hover:text-text transition-colors ml-auto"
                    >
                      <RotateCcw size={14} />
                      Retake Test
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
