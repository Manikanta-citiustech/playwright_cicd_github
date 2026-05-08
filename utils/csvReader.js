import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

/**
 * Reads CSV file from /data folder and returns array of objects
 * @param {string} fileName - CSV file name (example: checkoutData.csv)
 */
export function readCSV(fileName) {
  // ✅ Resolve absolute path to data folder
  const filePath = path.resolve(
    process.cwd(),
    'data',
    fileName
  );

  // ✅ Read file content
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // ✅ Parse CSV into JS objects
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
}