const fs = require('fs');
const path = require('path');

const categories = {
  Images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
  Documents: ['.pdf', '.docx', '.doc', '.xlsx', '.txt', '.pptx'],
  Videos: ['.mp4', '.mkv', '.mov', '.avi'],
  Music: ['.mp3', '.wav', '.aac'],
  Archives: ['.zip', '.rar', '.tar', '.gz'],
  Others: []
};

function organizeDirectory(directoryPath) {
  if (!directoryPath || !fs.existsSync(directoryPath)) {
    console.error('Invalid or non-existent directory. Please check the path.');
    return;
  }

  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    if (fs.lstatSync(filePath).isFile()) {
      const fileExt = path.extname(file).toLowerCase();
      let moved = false;

      for (const [folder, extensions] of Object.entries(categories)) {
        if (extensions.includes(fileExt)) {
          moveFile(directoryPath, file, folder);
          moved = true;
          break;
        }
      }

      if (!moved) moveFile(directoryPath, file, 'Others');
    }
  });

  console.log('Directory organized successfully!');
}

function moveFile(baseDir, file, folderName) {
  const folderPath = path.join(baseDir, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const oldPath = path.join(baseDir, file);
  const newPath = path.join(folderPath, file);

  fs.renameSync(oldPath, newPath);
  console.log(`Moved: ${file} -> ${folderName}/`);
}

const directoryToOrganize = 'K:/Programs/FSWD/Assignment-3';
organizeDirectory(directoryToOrganize);