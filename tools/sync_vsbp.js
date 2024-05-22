//C:\Dev\vud-tokens\build\scss\_variables-dark.scss
//C:\Dev\vud-tokens\build\scss\_variables-light.scss
//C:\Dev\core\src\apps\core.cloudservice\Core.WebApp\ClientApp\content\vud\overrides\spcs-brand-2023

const fs = require('fs');

// Define the source files and the destination directory
const sourceFiles = [
  'C:\\Dev\\vud-tokens\\build\\scss\\_variables-dark.scss',
  'C:\\Dev\\vud-tokens\\build\\scss\\_variables-light.scss'
];
const destinationDir = 'C:\\Dev\\core\\src\\apps\\core.cloudservice\\Core.WebApp\\ClientApp\\content\\vud\\overrides\\spcs-brand-2023';

// Function to copy a file
function copyFile(source, destination) {
  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.log(`Failed to copy file: ${source}`);
      throw err;
    }
    console.log(`Copied file: ${source} to ${destination}`);
  });
}

// Copy each source file to the destination directory
sourceFiles.forEach((sourceFile) => {
  const destinationFile = `${destinationDir}\\${sourceFile.split('\\').pop()}`;
  copyFile(sourceFile, destinationFile);
});