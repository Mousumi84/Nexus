const validateEmail = (email) => {
    const isEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        email
      );
    return isEmail;
};

const dataValidation=({name,username,email,password}) => {
    return new Promise((resolve,reject) => {
        
        if(!name || !username || !email || !password)
            reject("Important credentials missing");

        if(typeof(name) !== "string" )
            reject("Incorrect formate of name");
        if(typeof(username) !== "string" )
            reject("Incorrect formate of username");
        if(typeof(email) !== "string" )
            reject("Incorrect formate of email");
        if(typeof(password) !== "string" )
            reject("Incorrect formate of password");

        if(username.length <5 || username.length >12) 
            reject("username length should be 5-12 character");

        if(!validateEmail(email))
            reject("Incorrect formate of email");

        resolve();

    });
}

module.exports = dataValidation;