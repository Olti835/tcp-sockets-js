const fs = require("fs");

function listFiles(dir) {
  return fs.readdir(dir);
}

function readFile(path) {
  return fs.readFile(path, "utf-8");
}

function writeFile(path, data) {
  fs.writeFile(path, data);
}

function deleteFile(path) {
  fs.unlink(path);
}

module.exports = {
  listFiles,
  readFile,
  writeFile,
  deleteFile
};