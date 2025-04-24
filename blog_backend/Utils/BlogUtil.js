const blogDataValidation = ({textBody}) => {
    return new Promise((resolve,reject) => {

        if(!textBody)
            reject("Blog Test Body is missing");

        if(typeof(textBody) !== "string")
            reject("Blog Text Body formate is incorrect");

        resolve();
    });
}

module.exports = { blogDataValidation };