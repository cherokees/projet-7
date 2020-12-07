import express from 'express';
import multer from 'multer';
import path from 'path';


//définition du stockage
const storage = multer.diskStorage({
    // destination: (req, file, cb) => cb(null, 'uploads/'),
    destination: 'public/uploads/',
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowed.includes(ext)) {
        // Si l'extension n'est pas acceptée, on crée une erreur et on la retourne
        return callback(new Error('Only images are allowed'));
        // callback(null, false);
    }
    // Si l'extension est acceptée, on continue
    callback(null, true);
}


const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 10 },
});




export const router = express.Router();

router.post('/image', upload.single('image'), async (req, res, next) => {
    try {

        res.status(200).json({ data: req.file.filename, message: "image enregistrée" });
    } catch (err) {
        console.log("MESS", err.message);
        res.status(500).json({ data: null, message: "Erreur interne du serveur" });
    }
})
