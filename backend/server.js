//modules
import path from 'path';
import express from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';
import { router as usersRouter } from './routes/usersRouter';
import { router as messagesRouter } from './routes/messagesRouter';
import { router as commentRouter } from './routes/commentRouter';
import { router as uploadRouter } from './routes/uploadRouter';

//Mise en place du serveur
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use(bodyParser.json()); // pour les corps de requête JSON
app.use(express.json()); // pour les corps de requête JSON
// app.use(multer().single("image"));
// app.use(formData.parse());


// app.use(bodyParser.urlencoded({ extended: false })); // pour les corps de requête x-www-form-url
app.use(express.urlencoded({ extended: false })); // pour les corps de requête x-www-form-url
app.use(cors());                                  // to support Cross-origin requests

// Use the public folder for links
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/message', messagesRouter);
app.use('/comment', commentRouter);
app.use('/upload', uploadRouter);


// app.use((req, res) => {
//     res.json({ message: 'Votre requête a bien été reçue !' });
// });


//Route principale 
const PORT = 3000;
app.listen(process.env.PORT || PORT, () => console.log(`Serveur actif sur le port ${PORT}`));


// app.use('/user/login', usersRouter);
// app.use('/api/login', userRouter);

// module.exports = app;
// export default app;
