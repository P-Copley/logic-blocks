const { readFile } = require('fs/promises');

describe('Name of the group', () => {
  xit('solves the example case', async () => {
    const input = await readFile(`${__dirname}/../input.txt`, 'utf-8');
    const lines = input.split('\n');
  });
});
