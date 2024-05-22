const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require("morgan");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB ' + mongoose.connection.name);
})

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//controllers



app.listen(process.env.PORT ? process.env.PORT : 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ? process.env.PORT : 3000}`);
});
