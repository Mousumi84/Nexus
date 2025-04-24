const express = require("express");
require("dotenv").config();
const session = require("express-session");
const mongoDbsession = require("connect-mongodb-session")(session);
const cors=require("cors");
const path = require("path");


//constants
const app = express();
let PORT = process.env.PORT || 8001;
const store = new mongoDbsession({
    uri: process.env.MONGO,
    collection: "sessions",
});


//file-import
const db=require("./db.js");
const AuthRouter = require("./Routers/AuthRouter");
const BlogRouter = require("./Routers/BlogRouter.js");
const FollowRouter = require("./Routers/FollowRouter.js");
const isAuth = require("./Middleware/isAuth.js");
const parmanentlyDelete = require("./Cron.js");


//middleware  
app.use(cors());    /*    {
    origin: 'https://localhost:3000',                 //'https://post-application-nexus-1oxr-otuh93o8q-mousumi-das-projects.vercel.app',
    credentials: true
}  */
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
    session({
        secret: process.env.SECRET_KEY,
        store: store,
        resave: false,
        saveUninitialized: false,
    })
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files


//router
app.use('/auth',AuthRouter);
app.use('/blog',isAuth,BlogRouter);
app.use('/follow',isAuth,FollowRouter);


app.listen(PORT,() => {
    console.log(`server running at:`);
    console.log(`http://localhost:${PORT}`);


    parmanentlyDelete();
});
