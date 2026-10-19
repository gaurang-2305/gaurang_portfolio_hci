import test from 'node:test';
import assert from 'node:assert/strict';

// Port the calculateSusScore logic into the test for verification
function calculateSusScore(responses) {
  let oddSum = 0;
  let evenSum = 0;

  for (let i = 1; i <= 10; i++) {
    const val = responses[i];
    if (typeof val !== 'number' || val < 1 || val > 5) {
      throw new Error(`Invalid response for item ${i}`);
    }
    if (i % 2 !== 0) {
      oddSum += (val - 1);
    } else {
      evenSum += (5 - val);
    }
  }

  return (oddSum + evenSum) * 2.5;
}

test('SUS Score: Perfect score (all positive 5, all negative 1) equals 100', () => {
  const perfect = {
    1: 5, 2: 1, 3: 5, 4: 1, 5: 5,
    6: 1, 7: 5, 8: 1, 9: 5, 10: 1
  };
  assert.equal(calculateSusScore(perfect), 100);
});

test('SUS Score: Worst possible score (all positive 1, all negative 5) equals 0', () => {
  const worst = {
    1: 1, 2: 5, 3: 1, 4: 5, 5: 1,
    6: 5, 7: 1, 8: 5, 9: 1, 10: 5
  };
  assert.equal(calculateSusScore(worst), 0);
});

test('SUS Score: Neutral score (all 3) equals 50', () => {
  const neutral = {
    1: 3, 2: 3, 3: 3, 4: 3, 5: 3,
    6: 3, 7: 3, 8: 3, 9: 3, 10: 3
  };
  assert.equal(calculateSusScore(neutral), 50);
});

test('SUS Score: Typical above-average session benchmarks above 68', () => {
  // Strong ratings with minor hesitation on complexity
  const response = {
    1: 4, // odd: 4-1 = 3
    2: 2, // even: 5-2 = 3
    3: 5, // odd: 5-1 = 4
    4: 1, // even: 5-1 = 4
    5: 4, // odd: 4-1 = 3
    6: 2, // even: 5-2 = 3
    7: 5, // odd: 5-1 = 4
    8: 1, // even: 5-1 = 4
    9: 4, // odd: 4-1 = 3
    10: 1 // even: 5-1 = 4
  };
  // sum = 3+3+4+4+3+3+4+4+3+4 = 35 * 2.5 = 87.5
  assert.equal(calculateSusScore(response), 87.5);
});
