function sleepyGuards(lines) {
  const guards = {};
  let fellAsleepIndex = 0;
  let currentGuard = 0;
  lines.sort((a, b) => {
    return new Date(a.slice(1, 17)) < new Date(b.slice(1, 17)) ? -1 : 1;
  });
  for (let i = 0; i < lines.length; i++) {
    const date = lines[i].slice(1, 11);
    const hour = lines[i].slice(12, 14);
    const min = +lines[i].slice(15, 17);
    const command = lines[i].slice(19);
    // console.log(date, hour, min, command);

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
      const totalMins = times.reduce((total, num) => total + num, 0);
      if (totalMins > mostAsleep.total) {
        return { total: totalMins, guardId: +guard };
      }
      return mostAsleep;
    },
    { total: 0, guardId: 0 }
  );
  const mostAsleepMin = guards[mostAsleepGuard.guardId].indexOf(
    Math.max(...guards[mostAsleepGuard.guardId])
  );
  // console.log(mostAsleepMin);
  // console.log(guards);
  return mostAsleepGuard.guardId * mostAsleepMin;
}

module.exports = sleepyGuards;
