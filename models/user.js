const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    email: {type: String, required: true },
    listings: [{type: mongoose.Schema.Types.ObjectId, ref: "Listing"}],
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.password
        delete returnedObject.email
    }
 })

const User = mongoose.model("User", userSchema)

module.exports = User