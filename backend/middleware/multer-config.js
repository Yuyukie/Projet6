// Middleware multer-config.js
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage }).single("image");

module.exports = (req, res, next) => {
    upload(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            // Une erreur multer s'est produite lors de l'upload du fichier
            res.status(400).json({ error: "Une erreur est survenue lors du téléchargement du fichier." });
        } else if (error) {
            // Une erreur inattendue s'est produite
            console.error("Erreur lors de l'upload du fichier :", error);
            res.status(500).json({ error: "Une erreur est survenue lors du téléchargement du fichier." });
        } else {
            // Tout s'est bien passé, passez au prochain middleware
            next();
        }
    });
};