const fs = require('fs');


function removeExtraSpaces(inputString) {
  return inputString.replace(/\s+/g, ' ').trim();
}


function processFile(filePath) {
  fs.readFile("a.txt", 'utf8', (err, data) => {
   

    const cleanedData = removeExtraSpaces(data);

    fs.writeFile(filePath, cleanedData, 'utf8', (err) => {
        console.log('File successfully processed and cleaned.');
    });
  });
}