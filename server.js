const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db).then(
    () => console.log('Mongo DB connected'),
    (err) => console.log(err)
);

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)


// Routes
app.use('/api/users', users);
app.use('/api/profile', users);
app.use('/api/posts', users);

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`server running on port ${port}`));
