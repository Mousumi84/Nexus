const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const followSchema = new Schema({
    followerUserId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "UserSchema",
    },
    followingUserId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "UserSchema",
    },
    creationDateTime : {
        required: true,
        type: String,
    }
});

const FollowSchema = mongoose.model("follow",followSchema);

module.exports =  FollowSchema;