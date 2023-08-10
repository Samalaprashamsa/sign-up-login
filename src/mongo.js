const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginFormPractice", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
.then(() => {
    console.log('mongoose connected');
})
.catch((e) => {
    console.log('failed to connect to mongoose:', e);
});

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const LogInCollection = mongoose.model('LogInCollection1', logInSchema);

module.exports = LogInCollection;
