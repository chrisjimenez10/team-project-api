//Import
const mongoose = require("mongoose");

//Schema
const playerSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

//Model
const Player = mongoose.model("Player", playerSchema);

//Export
module.exports = Player;