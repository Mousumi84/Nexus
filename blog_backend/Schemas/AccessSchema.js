const mongoose = require("mongoose");

const schema = mongoose.Schema;

const accessSchema = new schema({
    sessionId : {
        type:String,
        required:true,
    },
    time : {
        type:String,
        required:true,
    }
});

const AccessSchema = mongoose.model("access",accessSchema);

module.exports = AccessSchema