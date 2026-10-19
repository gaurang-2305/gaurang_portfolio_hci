import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Check, XCircle, RotateCcw, Download, Clock, ExternalLink } from 'lucide-react';
import usabilityTasksRaw from '../data/usability-tasks.json';
import type { UsabilityTask } from '../types';

const tasks = usabilityTasksRaw as UsabilityTask[];

interface TaskResult {
  taskId: string;
  taskName: string;
  timeSeconds: number;
  status: 'Completed' | 'Given Up';
  wrongClicks: number;
  moderatorNotes: string;
}

export const UsabilityTestModePage: React.FC = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [moderatorNotes, setModeratorNotes] = useState('');
  const [results, setResults] = useState<TaskResult[]>([]);
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  const timerRef = useRef<number | null>(null);
  const currentTask = tasks[currentTaskIndex];

  // Stopwatch timer effect
  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsedMs;
      timerRef.current = window.setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, elapsedMs]);

  // Click tracker for wrong-path clicks outside the test controller card
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!isRunning) return;
      const target = e.target as HTMLElement;
      if (!target.closest('#usability-controller-card')) {
        setWrongClicks(prev => prev + 1);
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isRunning]);

  const handleStartTask = () => {
    setElapsedMs(0);
    setWrongClicks(0);
    setModeratorNotes('');
    setIsRunning(true);
  };

  const handleFinishTask = (status: 'Completed' | 'Given Up') => {
    setIsRunning(false);

    const taskResult: TaskResult = {
      taskId: currentTask.id,
      taskName: currentTask.name,
      timeSeconds: Math.round((elapsedMs / 1000) * 10) / 10,
      status,
      wrongClicks,
      moderatorNotes: moderatorNotes.trim()
    };

    const nextResults = [...results, taskResult];
    setResults(nextResults);

    if (currentTaskIndex + 1 < tasks.length) {
      setCurrentTaskIndex(prev => prev + 1);
      setElapsedMs(0);
      setWrongClicks(0);
      setModeratorNotes('');
    } else {
      setIsSessionFinished(true);

      // Save to localStorage
      const stored = JSON.parse(localStorage.getItem('usability-test-sessions') || '[]');
      stored.push({
        sessionTimestamp: new Date().toISOString(),
        tasks: nextResults
      });
      localStorage.setItem('usability-test-sessions', JSON.stringify(stored));
    }
  };

  const handleExportCsv = () => {
    const headers = ['Task_ID', 'Task_Name', 'Status', 'Time_On_Task_Seconds', 'Wrong_Clicks', 'Moderator_Notes'];
    const rows = results.map(r => [
      r.taskId,
      `"${r.taskName}"`,
      r.status,
      r.timeSeconds,
      r.wrongClicks,
      `"${r.moderatorNotes.replace(/"/g, '""')}"`
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `usability_test_session_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetSession = () => {
    setCurrentTaskIndex(0);
    setIsRunning(false);
    setElapsedMs(0);
    setWrongClicks(0);
    setModeratorNotes('');
    setResults([]);
    setIsSessionFinished(false);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const tenths = Math.floor((ms % 1000) / 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${tenths}`;
  };

  return (
    <main id="main-content" className="py-12 border-b border-line min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                SYNCHRONOUS USABILITY LAB PROTOCOL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-bg border border-line text-muted">
                LIVE STOPWATCH &amp; LOGGING
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-text mt-1">
              Live Usability Test Mode
            </h1>
          </div>
          <Link
            to="/usability"
            className="text-xs font-mono text-muted hover:text-accent transition-colors"
          >
            &larr; Exit to Usability Hub
          </Link>
        </div>

        {!isSessionFinished ? (
          /* Active Task Controller Card */
          <div id="usability-controller-card" className="draft-card p-6 sm:p-8 space-y-6 crosshair-corner">
            
            {/* Task Progress & Header */}
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <span className="text-xs font-mono text-accent font-bold">
                  Task {currentTaskIndex + 1} of {tasks.length} &bull; {currentTask.id}
                </span>
                <h2 className="font-serif text-2xl font-bold text-text mt-0.5">
                  {currentTask.name}
                </h2>
              </div>

              {/* Running Stopwatch Display */}
              <div className="flex items-center gap-2 px-4 py-2 rounded bg-bg border border-line">
                <Clock size={16} className={isRunning ? 'text-accent animate-spin' : 'text-muted'} />
                <span className="font-mono text-lg font-bold text-text">
                  {formatTime(elapsedMs)}
                </span>
              </div>
            </div>

            {/* Task Prompt */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted uppercase tracking-wider block">
                User Task Instruction:
              </span>
              <p className="text-sm sm:text-base text-text bg-bg/60 p-4 rounded-md border border-line leading-relaxed">
                "{currentTask.prompt}"
              </p>
            </div>

            {/* Target Hints & Benchmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded bg-surface border border-line">
                <span className="text-muted block mb-1">Target Component / Section:</span>
                <a
                  href={currentTask.targetSection}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline flex items-center gap-1 font-bold"
                >
                  <span>{currentTask.targetSection}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="p-3 rounded bg-surface border border-line">
                <span className="text-muted block mb-1">Expert Benchmark:</span>
                <span className="text-text font-bold">{currentTask.benchmarkSeconds}s</span>
              </div>
            </div>

            {/* Wrong-Path Click Counter */}
            <div className="flex items-center justify-between p-3 rounded bg-bg border border-line text-xs font-mono">
              <span className="text-muted">Unfocused / External Clicks Recorded:</span>
              <span className="text-accent font-bold px-2 py-0.5 rounded bg-surface border border-line">
                {wrongClicks}
              </span>
            </div>

            {/* Moderator Notes */}
            <div>
              <label htmlFor="test-notes" className="block text-xs font-mono text-muted uppercase tracking-wider mb-1">
                Moderator Qualitative Observations / Friction Notes:
              </label>
              <textarea
                id="test-notes"
                rows={2}
                value={moderatorNotes}
                onChange={(e) => setModeratorNotes(e.target.value)}
                placeholder="Note hesitation, confusion, or navigation path choices..."
                className="w-full bg-bg border border-line rounded p-2.5 text-xs text-text placeholder:text-muted/50 focus:border-accent focus:outline-none"
              />
            </div>

            {/* Execution Controls */}
            <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-4">
              {!isRunning ? (
                <button
                  type="button"
                  onClick={handleStartTask}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accent text-bg font-mono font-bold text-xs uppercase tracking-wider shadow-drafting hover:opacity-95 transition-opacity min-h-[44px]"
                >
                  <Play size={16} />
                  <span>Start Task Stopwatch</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleFinishTask('Completed')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded bg-green-500 text-bg font-mono font-bold text-xs uppercase tracking-wider shadow-drafting hover:opacity-95 transition-opacity min-h-[44px]"
                  >
                    <Check size={16} />
                    <span>Task Succeeded (Done)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFinishTask('Given Up')}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded bg-surface border border-line hover:border-red-500 text-red-400 font-mono text-xs transition-colors min-h-[44px]"
                  >
                    <XCircle size={15} />
                    <span>Abandon / Give Up</span>
                  </button>
                </div>
              )}

              <span className="text-[11px] font-mono text-muted">
                {isRunning ? 'Stopwatch active &bull; Click anywhere to log' : 'Ready to begin'}
              </span>
            </div>

          </div>
        ) : (
          /* Session Finished & CSV Export State */
          <div className="draft-card p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2 border-b border-line pb-6">
              <span className="font-mono text-xs text-accent font-bold uppercase tracking-widest">
                SESSION CONCLUDED
              </span>
              <h2 className="font-serif text-3xl font-bold text-text">
                Protocol Complete: All 5 Tasks Evaluated
              </h2>
              <p className="text-xs font-mono text-muted max-w-md mx-auto">
                Time-on-task, completion status, and trajectory errors logged for empirical HCI analysis.
              </p>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse border border-line rounded bg-surface">
                <thead>
                  <tr className="bg-bg text-accent uppercase border-b border-line">
                    <th className="p-3">ID</th>
                    <th className="p-3">Task Name</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Errors</th>
                    <th className="p-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {results.map(r => (
                    <tr key={r.taskId} className="hover:bg-bg/40">
                      <td className="p-3 text-accent font-bold">{r.taskId}</td>
                      <td className="p-3 font-semibold text-text">{r.taskName}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-text">{r.timeSeconds}s</td>
                      <td className="p-3 text-muted">{r.wrongClicks}</td>
                      <td className="p-3 text-muted truncate max-w-xs">{r.moderatorNotes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line">
              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent text-bg font-mono font-bold text-xs uppercase tracking-wider shadow-drafting min-h-[44px]"
              >
                <Download size={15} />
                <span>Export Protocol CSV</span>
              </button>

              <button
                type="button"
                onClick={handleResetSession}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-surface border border-line hover:border-accent text-xs font-mono text-muted hover:text-text transition-colors min-h-[44px]"
              >
                <RotateCcw size={14} />
                <span>Run New Protocol Session</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};
