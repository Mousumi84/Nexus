const UserSchema = require("../Schemas/AuthSchema");
const bcrypt=require("bcryptjs");
const ObjectId = require('mongodb').ObjectId;

const AuthModel = class{
    name;
    username;
    email;
    password;
    image;

    constructor({name,username,email,password,image}) {

        this.name=name;
        this.username=username;
        this.email=email;
        this.password=password;
        this.image=image;

    }

    

    storeDatainDB() {
        return new Promise(async (resolve,reject) => {

            const hashpassword = await bcrypt.hash(this.password,Number(process.env.SALT));

            const userObj=new UserSchema({
                name : this.name,
                username : this.username,
                email : this.email,
                password : hashpassword,
                image : this.image,
            });

            // save userObj in DB
            try {
                const userDb = await userObj.save();
                resolve(userDb);
            } catch (error) {
                reject(error);
            }

        });
    }

    emailAndUsernameExist() {
        return new Promise(async (resolve,reject) => {
             
            // Check if Email,Username exist in DB
            try {
                const userDbExist = await UserSchema.findOne({
                    $or: [{ email : this.email },{ username : this.username }],
                });
                

                if(userDbExist && userDbExist.email === this.email)
                    reject("Email already registered");
                if(userDbExist && userDbExist.username === this.username)
                    reject("Username already registered");

                resolve();
            } catch (error) {
                reject(error);   
            }
        });
    }

    static findUserWithKey({key}) {
        return new Promise(async (resolve,reject) => {

            console.log("key",key);
            
            try {
                const loginData = await UserSchema.findOne({
                    $or: [ ObjectId.isValid(key) ? { _id : key } : { email : key },{ username : key}],
                }).select("+password");

                if(!loginData)
                    reject("user not registered")

                resolve(loginData);
            } catch (error) {
                reject(error);
            }
        });

    }

    static searchUser({searchTerm }) {
        return new Promise(async (resolve,reject) => {

            try {
                const userDb = await UserSchema.find({
                    name: { $regex: searchTerm, $options: 'i' } // 'i' for case-insensitive
                });
                
                resolve(userDb);
            } catch (error) {
                reject(error);
            }
        });
    }

}

module.exports = AuthModel;