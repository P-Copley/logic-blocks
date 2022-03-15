const { expect } = require('chai');
const { readFile } = require('fs/promises');
const sleepyGuards = require('..');

describe('sleepyGuards', () => {
  it('finds the minute a single guard is asleep the most (sorted input)', () => {
    const lines = [
      '[1518-11-01 00:00] Guard #1 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-03 00:05] Guard #1 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
    ];
    expect(sleepyGuards(lines)).to.equal(24);
  });
  it('finds the minute from multiple guards (sorted input)', () => {
    const lines = [
      '[1518-11-01 00:00] Guard #1 begins shift',
      '[1518-11-01 00:01] falls asleep',
      '[1518-11-01 00:02] wakes up',
      '[1518-11-03 00:06] Guard #2 begins shift',
      '[1518-11-03 00:07] falls asleep',
      '[1518-11-03 00:08] wakes up',
      '[1518-11-04 00:06] Guard #2 begins shift',
      '[1518-11-04 00:07] falls asleep',
      '[1518-11-04 00:08] wakes up',
    ];
    expect(sleepyGuards(lines)).to.equal(14);
  });
  it('solves the example case', () => {
    const lines = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-05 00:55] wakes up',
    ];
    expect(sleepyGuards(lines)).to.equal(240);
  });
  xit('solves the puzzle input', async () => {
    const input = await readFile(`${__dirname}/../input.txt`, 'utf-8');
    const lines = input.split('\n');
    const result = sleepyGuards(lines);
    throw result;
  });
});
