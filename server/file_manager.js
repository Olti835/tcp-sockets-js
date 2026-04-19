const fs = require("fs");

function listFiles(dir) {
  return fs.readdirSync(dir);
}

function readFile(path) {
  return fs.readFileSync(path, "utf-8");
}

function writeFile(path, data) {
  fs.writeFileSync(path, data);
}

function deleteFile(path) {
  fs.unlinkSync(path);
}

module.exports = {
  listFiles,
  readFile,
  writeFile,
  deleteFile
};