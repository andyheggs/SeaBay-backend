const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: string, required: true, unique: true },
    password: {type: string, required: true },
    email: {type: string, required: true },
    listings: [{type: mongoose.Schema.Types.ObjectId, ref: "Listing"}],
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
        delete returnedObject.email;
    }
 });

const User = mongoose.model("User", userSchema);

module.exports = User;