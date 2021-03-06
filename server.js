const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


//middleware para body parser (poder buscar con req.body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware para passport (autenticacion de tokens)
app.use(passport.initialize());

// passport config [No entiendo muy bien nomenclatura] TODO
require('./config/passport')(passport);

// Conexion a db
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('exito'))
  .catch(err => console.log(err));

// Usar las rutas
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('sde ${port}'));
