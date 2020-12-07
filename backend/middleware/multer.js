import multer from 'multer';

// creation d'un objet pour ajouter une extention en fonction du type mime du ficher
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// function pour création du nom de l'image pour le stockage sur le serveur
const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, 'files');
    },
    filename: (req, file, callback) => {

        const name = file.originalname.split(' ').join('_'); // suppression des espaces par des underScores
        const extension = MIME_TYPES[file.mimetype];  // recuperation de l'extention en fonction du type mime
        callback(null, name + Date.now() + '.' + extension);  // création du nom avec le nom de l'image + ajout de la date, la seconde + . + extension
    }
});

// exportion en un fichier unique avec multer
module.exports = multer({ storage: storage, limits: { fileSize: 20 * 1024 * 1024, fieldSize: 200000000, } }).single('files');
