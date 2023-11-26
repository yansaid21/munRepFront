// image.js

const path = require("path");

function getFilePath(photoFile) {
  const uploadDir = "uploads/item"; // Directorio donde se almacenan las imágenes
  const photoPath = path.join(uploadDir, photoFile.name); // Combina el directorio y el nombre del archivo
  return photoPath;
}

module.exports = {
  getFilePath,
};
