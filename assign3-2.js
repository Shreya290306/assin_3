const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const BACKUP_DIR = 'backup';

function createBackup(sourceDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error('Invalid directory path. Please check the source directory.');
    return;
  }

  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

  fs.readdirSync(sourceDir).forEach(file => {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(BACKUP_DIR, file);

    try {
      if (fs.lstatSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file}`);
      }
    } catch (err) {
      console.error(`Error copying file ${file}:`, err);
    }
  });

  console.log('Backup completed.');
}

function compressBackup() {
  const output = fs.createWriteStream(`${BACKUP_DIR}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`Backup compressed into ${BACKUP_DIR}.zip (${archive.pointer()} bytes)`);
  });

  archive.on('error', err => console.error('Compression error:', err));

  archive.pipe(output);
  archive.directory(BACKUP_DIR, false);
  archive.finalize();
}

const sourceDirectory = 'K:/Programs/FSWD/Assignment-3';

try {
  createBackup(sourceDirectory);
  compressBackup();
} catch (error) {
  console.error('Unexpected error during backup operation:', error);
}