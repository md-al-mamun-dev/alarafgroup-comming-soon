import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enPath = path.join(__dirname, '../messages/en.json');
const bnPath = path.join(__dirname, '../messages/bn.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

let hasError = false;

function compareKeys(obj1, obj2, pathStr = '') {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  for (const key of keys1) {
    const currentPath = pathStr ? `${pathStr}.${key}` : key;
    if (!(key in obj2)) {
      console.error(`Missing key in bn.json: ${currentPath}`);
      hasError = true;
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      if (typeof obj2[key] !== 'object' || obj2[key] === null) {
        console.error(`Type mismatch at ${currentPath}: Expected object in bn.json`);
        hasError = true;
      } else {
        compareKeys(obj1[key], obj2[key], currentPath);
      }
    }
  }

  for (const key of keys2) {
    const currentPath = pathStr ? `${pathStr}.${key}` : key;
    if (!(key in obj1)) {
      console.error(`Extra key in bn.json: ${currentPath}`);
      hasError = true;
    }
  }
}

compareKeys(en, bn);

if (hasError) {
  process.exit(1);
} else {
  console.log('Translation keys are perfectly synchronized.');
  process.exit(0);
}
