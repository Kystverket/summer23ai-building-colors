const fs = require('fs');

function parseCSVRow(row) {
  const arr = row.split(",");
  arr[4] = arr[4].split("\r")[0];
  arr[3] = parseFloat(arr[3]);
  arr[4] = parseFloat(arr[4]);
  return arr;
}

function readCSVFile(filename, startRow, endRow) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    const rows = data.split('\n');
    const selectedRows = rows.slice(startRow, endRow);
    const parsedRows = selectedRows.map(parseCSVRow);
    return parsedRows;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const filePath = 'prototyping/google_45degree/addresses_filtered.csv';
const startRow = 90; 
const endRow = 100;   

const parsedRows = readCSVFile(filePath, startRow, endRow);
console.log(parsedRows);
