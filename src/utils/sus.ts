export interface SusResponse {
  [itemId: number]: number; // itemId 1..10 -> score 1..5
}

export interface SusResult {
  score: number;
  grade: string;
  adjective: string;
  percentileRange: string;
  interpretation: string;
}

/**
 * Calculates the System Usability Scale (SUS) score according to John Brooke (1986).
 * Odd items (1, 3, 5, 7, 9): contribution is score - 1
 * Even items (2, 4, 6, 8, 10): contribution is 5 - score
 * Total score is the sum of contributions multiplied by 2.5 (0 - 100 scale).
 */
export function calculateSusScore(responses: SusResponse): number {
  let oddSum = 0;
  let evenSum = 0;

  for (let i = 1; i <= 10; i++) {
    const val = responses[i];
    if (typeof val !== 'number' || val < 1 || val > 5) {
      throw new Error(`Invalid response for item ${i}: must be an integer between 1 and 5.`);
    }

    if (i % 2 !== 0) {
      // Odd item
      oddSum += (val - 1);
    } else {
      // Even item
      evenSum += (5 - val);
    }
  }

  const rawScore = (oddSum + evenSum) * 2.5;
  return Math.round(rawScore * 10) / 10;
}

/**
 * Provides empirical interpretation based on Sauro & Lewis (2012) and Bangor et al. (2008).
 * Industry standard benchmark = 68.
 */
export function interpretSusScore(score: number): SusResult {
  if (score >= 85) {
    return {
      score,
      grade: 'A+',
      adjective: 'Best Imaginable / Excellent',
      percentileRange: 'Top 10% (90th-100th percentile)',
      interpretation: 'Exceptional usability. Users encounter near-zero cognitive friction and express high advocacy.'
    };
  } else if (score >= 80.3) {
    return {
      score,
      grade: 'A',
      adjective: 'Excellent',
      percentileRange: '80th-89th percentile',
      interpretation: 'Outstanding design. Exceeds the standard industry benchmark of 68 significantly.'
    };
  } else if (score >= 68) {
    return {
      score,
      grade: 'B / C+',
      adjective: 'Good / Above Average',
      percentileRange: '50th-79th percentile',
      interpretation: 'Meets and surpasses the baseline acceptable threshold (68). Standard minor polishing recommended.'
    };
  } else if (score >= 51) {
    return {
      score,
      grade: 'D',
      adjective: 'OK / Marginal',
      percentileRange: '15th-49th percentile',
      interpretation: 'Marginal usability. Users face intermittent confusion or navigation hurdles.'
    };
  } else {
    return {
      score,
      grade: 'F',
      adjective: 'Unacceptable / Poor',
      percentileRange: '0th-14th percentile',
      interpretation: 'Severe usability friction. Critical structural intervention and workflow simplification needed.'
    };
  }
}

/**
 * Exports submissions array as CSV string.
 */
export function exportSusToCsv(submissions: Array<{ timestamp: string; score: number; responses: SusResponse; notes?: string }>): string {
  const headers = ['Timestamp', 'SUS_Score', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Notes'];
  const rows = submissions.map(sub => [
    `"${sub.timestamp}"`,
    sub.score,
    sub.responses[1] ?? '',
    sub.responses[2] ?? '',
    sub.responses[3] ?? '',
    sub.responses[4] ?? '',
    sub.responses[5] ?? '',
    sub.responses[6] ?? '',
    sub.responses[7] ?? '',
    sub.responses[8] ?? '',
    sub.responses[9] ?? '',
    sub.responses[10] ?? '',
    `"${(sub.notes || '').replace(/"/g, '""')}"`
  ].join(','));

  return [headers.join(','), ...rows].join('\n');
}
