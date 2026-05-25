const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    textBody: {
        type:String,
        require:true,
        trim:true,
        minLength:3,
        maxLength:1000,
    },
    image: {},
    creationDateTime: {
        type:String,
    },
    userId: {
        type:Schema.Types.ObjectId,
    },
    isDeleted: {
        type:Boolean,
        default:false,
    },
    deletedTime: {
        type: Date,
        default: null,
    }
});

// TTL INDEX
blogSchema.index(
    { deletedTime: 1 },
    { expireAfterSeconds: 0 }
);

const BlogSchema = mongoose.model("blog",blogSchema);

module.exports = BlogSchema;