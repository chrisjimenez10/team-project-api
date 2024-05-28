const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    team: [],
    ovr: String,
    win: Number,
    loss: Number,
    logo: String,
})
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
    }
})


module.exports = mongoose.model('User', userSchema);