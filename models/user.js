const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    email: {type: String, required: true },
    //listings: [{type: mongoose.Schema.Types.ObjectId, ref: "Listing"}],
    //offers: [{type: mongoose.Schema.Types.ObjectId, ref: "Offer"}]
})

userSchema.virtual("listings", {
    ref: 'Listing',
    localField: '_id',
    foreignField: 'seller',
})

userSchema.virtual("offers", {
    ref: 'Offer',
    localField: '_id',
    foreignField: 'user',
})

userSchema.set("toJSON", {
    virtuals: true,
    transform: (document, returnedObject) => {
        delete returnedObject.password
        delete returnedObject.email
    }
 })

const User = mongoose.model("User", userSchema)

module.exports = User