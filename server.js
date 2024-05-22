const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB ' + mongoose.connection.name);
})

app.use(cors());
app.use(express.json());

//controllers



app.listen('3000', () => {
    console.log('Listening on port: 3000');
});