function sleepyGuards(lines) {
  const guards = {};
  let fellAsleepIndex = 0;
  let currentGuard = 0;

  lines.sort((a, b) => {
    return new Date(a.slice(1, 17)) < new Date(b.slice(1, 17)) ? -1 : 1;
  });

  for (let i = 0; i < lines.length; i++) {
    const min = +lines[i].slice(15, 17);
    const command = lines[i].slice(19);

    if (command[0] === 'G') {
      currentGuard = +command.match(/\d+/);
      if (!(currentGuard in guards)) {
        guards[currentGuard] = Array.from({ length: 60 }, () => 0);
      }
    }
    if (command === 'falls asleep') {
      fellAsleepIndex = min;
    }
    if (command === 'wakes up') {
      for (let i = fellAsleepIndex; i < min; i++) {
        guards[currentGuard][i]++;
      }
    }
  }

  const mostAsleepGuard = Object.entries(guards).reduce(
    (mostAsleep, [guard, times]) => {
      const mostAsleepTotal = Math.max(...times);
      if (mostAsleepTotal > mostAsleep.total) {
        return {
          sleepIndex: times.indexOf(mostAsleepTotal),
          guardId: +guard,
          total: mostAsleepTotal,
        };
      }
      return mostAsleep;
    },
    { total: 0, guardId: 0 }
  );

  return mostAsleepGuard.guardId * mostAsleepGuard.sleepIndex;
}

module.exports = sleepyGuards;
