const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require("morgan");

const playersRouter = require("./controllers/player-controllers/players.js"); //Routes for Players
const userController = require('./controllers/authControllers/users.js');
const authController = require('./controllers/authControllers/auth.js');

const fetchBasketballData = require("./sports-api.js");


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB ' + mongoose.connection.name);
})

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//controllers
app.use("/players", playersRouter);
app.use('/users', userController);
app.use('/auth', authController);

    //Fetched Data from NBA-API
app.get("/nba/:team", async (req, res)=>{
    res.json(await fetchBasketballData(req.params.team));
});

app.listen(process.env.PORT ? process.env.PORT : 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ? process.env.PORT : 3000}`);
});
