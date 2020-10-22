//modules
// import http from 'http';
// import express from 'express';
// import { withRoutes } from './router';
// import bodyParser from 'body-parser';
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const userRouter = require('./routes/usersRouter')


// import './utils/validator';


//Mise en place du serveur
const app = express();
app.use(bodyParser.json()); // pour les corps de requête JSON
app.use(bodyParser.urlencoded({ extended: false })); // pour les corps de requête x-www-form-url

const server = http.createServer(app);

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});


//Route principale 
const port = 3000;
server.listen(process.env.PORT || port);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

app.use('/api/login', userRouter);

// module.exports = app;
// export default app;
