const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    username: {
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        select:false,
    },
    image: {
        name:String,
        contentType:String,
        path:String,
    }
});

const UserSchema = mongoose.model("user",userSchema);

module.exports =  UserSchema;