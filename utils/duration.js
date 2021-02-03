const child_process = require('child_process');
const fs = require('fs');

const CWD = process.cwd();
const ROOT = 'music';

const getDurations = dir => {
  const durations = Object.create(null);
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const path = `${dir}/${file}`;
    const stat = fs.statSync(path);

    // Scan the directory for files.
    if (stat.isDirectory()) {
      Object.assign(
        durations,
        getDurations(path)
      );
    }

    // Get the duration of the file.
    else if (stat.isFile()) {
      const ffmpeg = child_process.spawnSync('ffmpeg', [ '-i', `${CWD}\\${path}` ], {
        cwd: 'C:\\Program Files',
        windowsHide: true,
      });
      const duration = ffmpeg.stderr.toString('utf8').match(/Duration: (\d{2}):(\d{2}):(\d{2})\.(\d{2})/);
      if (duration === null) {
        throw new Error(`Cannot decode duration for ${path}.`);
      }
      const [ , hours, minutes, seconds, centiseconds ] = duration;
      durations[path] =
        parseInt(centiseconds) * 10 +
        parseInt(seconds) * 1000 +
        parseInt(minutes) * 60000 +
        parseInt(hours) * 3600000;
    }
  }
  return durations;
};

const durations = getDurations(ROOT);
const durationsClean = Object.create(null);
for (const [ path, duration ] of Object.entries(durations)) {
  durationsClean[path.substring(ROOT.length + 1, path.length - 4)] = duration;
}
const durationsStr = JSON.stringify(durationsClean);

fs.writeFileSync('durations.js', `setDurations(${durationsStr});\n`);
