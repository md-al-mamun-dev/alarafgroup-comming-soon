import fs from 'node:fs';
import path from 'node:path';

const source = path.join(process.cwd(), 'out', 'en', 'index.html');
const destination = path.join(process.cwd(), 'out', 'index.html');

if (fs.existsSync(source)) {
  fs.copyFileSync(source, destination);
  console.log('Successfully set the default root page (out/index.html) to the English version!');
} else {
  console.warn('Warning: Could not find out/en/index.html to copy to root.');
}

