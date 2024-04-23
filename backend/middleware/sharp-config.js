const sharp = require("sharp");
const path = require("path");

module.exports = (req, res, next) => {
  //On vérifie si la requête contient un fichier et si ce dernier a un contenu binaire.
  if (req.file) {
    console.log("Original filename:", req.file.originalname);
    const name = req.file.originalname.split(" ").join("_");
    console.log("Modified filename:", name);
    const extension = path.extname(name);
    console.log("Extension:", extension);
    const fileName = name.replace(extension, "");
    const outputFileName = `${fileName}_${Date.now()}.webp`;
    console.log("Output filename:", outputFileName);
    const outputPath = path.join(__dirname, "..", "images", outputFileName);
    console.log("output path", outputPath);

    sharp(req.file.buffer)
      .resize(206, 260, {fit:"cover"})
      .toFile(outputPath, (error) => {
        if (error) {
          console.error("Sharp error:", error);
          return res.status(500).json({ error: "Erreur lors de l'optimisation de l'image." });
        }
        req.sharpFileName = outputFileName;

        next();
      });
  } else {
    console.log("Image non modifiée");
    next();
  }
};