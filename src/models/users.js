const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        // required: [true, 'Email is required']
    },

    authorName:{
        type:String
    },

    password: {
        type: String,
        // required:[true, "password is required"]
    }
});

userSchema.virtual('posts',{
    ref:'Post',
    localField: '_id',
    foreignField: 'author'
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', userSchema);

module.exports = User;