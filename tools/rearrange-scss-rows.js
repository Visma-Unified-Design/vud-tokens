const fs = require('fs');
const readline = require('readline');
const os = require('os');

const filePath = 'C:\\Dev\\vud-tokens\\build\\scss\\_variables-light.scss';

// Variables to be moved
const variablesToMove = [
  '$light-opacity-2: ',
  '$light-opacity-3: ',
  '$light-opacity-4: ',
  '$light-opacity-5: ',
  '$light-opacity-6: ',
  '$light-opacity-7: ',
  '$light-opacity-8: ',
  '$light-opacity-9: ',
  '$light-opacity-10: ',
  '$light-opacity-11: '
];

// Read the file line by line
const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
  output: process.stdout,
  terminal: false
});

let lines = [];
let movedLines = [];
let insertIndex = -1;

rl.on('line', (line) => {
  // If the line starts with one of the variables to be moved, store it
  if (variablesToMove.some(variable => line.startsWith(variable))) {
    movedLines.push(line);
  } else {
    lines.push(line);
    // If the line starts with the variable '$light-opacity-0: ', store the index to insert the moved lines
    if (line.startsWith('$light-opacity-0: ')) {
      insertIndex = lines.length;
    }
  }
});

rl.on('close', () => {
  // Insert the moved lines at the correct index
  lines.splice(insertIndex, 0, ...movedLines);

  // Write the rearranged lines back to the file
  fs.writeFile(filePath, lines.join(os.EOL), (err) => {
    if (err) {
      console.error(`Failed to write to file: ${filePath}`);
      throw err;
    }
    console.log(`Successfully rearranged variables in file: ${filePath}`);
  });
});