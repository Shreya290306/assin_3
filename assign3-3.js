const fs = require('fs');
const path = require('path');
const os = require('os');

const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'env-details.json');

function inspectEnvironment() {
  try {
    const envDetails = {
      homeDirectory: os.homedir(),
      hostname: os.hostname(),
      networkInterfaces: os.networkInterfaces(),
      environmentVariables: process.env
    };

    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }

    fs.writeFileSync(LOG_FILE, JSON.stringify(envDetails, null, 2));
    console.log(`Environment details saved to ${LOG_FILE}`);
  } catch (error) {
    console.error('Error inspecting environment or writing file:', error);
  }
}

inspectEnvironment();