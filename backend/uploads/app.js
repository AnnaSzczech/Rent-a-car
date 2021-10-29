const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./user');
const mongoose = require('mongoose');
const uri = '';

mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
    console.log('Connected')
}).catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
module.exports = app;
