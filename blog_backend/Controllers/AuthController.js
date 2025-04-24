const bcrypt = require("bcryptjs");
const AuthModel = require("../Models/AuthModel");
const dataValidation = require("../Utils/AuthUtil");
const { mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Utils/cloudinary");


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "user_profiles",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({ storage: storage });


const registerController = async (req,res) => {
    console.log("register");

    const {name,username,email,password}=req.body;
    let image=req.file.path;
    console.log(image);

    //Data validation
    try {
        await dataValidation({name,username,email,password});

    } catch (error) {
        return res.send({
            status:400,
            message:error,
            error:error,
        });
    }


    const User = new AuthModel({name,username,email,password,image});

    //Check email/username if already exist in db
    try {
        await User.emailAndUsernameExist();

    } catch (error) {
        return res.send({
            status:400,
            message:"User already Exist",
            error:error,
        });
    }
 
    //Store Data in Db
    try {
        const userDb = await User.storeDatainDB();

        return res.send({
            status:200,
            message:"Registered Successfully",
            data:userDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal Server Error",
            error:error,
        });
    }
}



const displaySarchedUsersController = async (req,res) => {
    const searchTerm=req.query.search;
    
    // get searched the users 
    try {
        const UsersDb = await AuthModel.searchUser({searchTerm});
    
        return res.send({
            status:200,
            message:"Read All Users",
            UsersDb
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Search failedr",
            error:error,
        });
    }

}



const loginController = async (req,res) => {
    console.log("login");
    const {userId,password}=req.body;

    //Data Validation
    if(!userId || !password) {
        return res.send({
            status:400,
            message:"Fill the important credential",
        });
    }



    //Find User by usernmae,email
    try {
        const loginData = await AuthModel.findUserWithKey({key:userId});   // userId -> email / username
        console.log("loginData =>",loginData);
        
        //Compare password
        const passwordCompare = await bcrypt.compare(password,loginData.password);


        if(!passwordCompare) {
            return res.send({
                status:400,
                message:"Incorrect password",
            });
        }

        const jwtToken=jwt.sign({data:loginData},process.env.SECRET_KEY);

        
        //Session Base Auth
        req.session.isAuth = true;
        req.session.user = {
            userId:loginData._id,
            useremail:loginData.email,
            username:loginData.username,
            userimage:loginData.image,
            name:loginData.name,
        };
        let session=req.session;

        return res.send({
            status:200,
            message:"Login Successfull",
            jwtToken,
            session
        });
        
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal Server Error",
            error:error,
        });
    }
}



const logoutController = async (req,res) => {
    //console.log("logout",req.session);

    
    req.session.destroy((er) => {
        if(er) {
            return res.send({
                status:500,
                message:"logout unsuccessfull",
            });
        }

        return res.send({
            status:200,
            messgae:"logout successfull",
        }
        )
    })
        
}



// create a schema for session
const schema = mongoose.Schema; 
const sessionSchema = new schema({_id:String},{strict:false});
const sessionModel = mongoose.model("session",sessionSchema);

const logoutFromAllDvController= async (req,res) => {
    let username=req.user.data.username;


    //delete session from all devices
    try {
        const deletesession = await sessionModel.deleteMany({"session.user.username" : username});    

        return res.send({
            status:200,
            message:"Logout from all devices",
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal Server Error",
        });
    }
}



module.exports = { upload,registerController,loginController,displaySarchedUsersController,logoutController,logoutFromAllDvController };

//