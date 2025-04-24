const { findUserWithKey } = require("../Models/AuthModel");
const { blogCreate, getAllBlogs, getMyBlogs, findBlogWithBlogId, editBlogwithId, deleteBlogWithBlogId } = require("../Models/BlogModel");
const { blogDataValidation } = require("../Utils/BlogUtil");
const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Utils/cloudinary");

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/blogImage');                 
    },
    filename: function (req, file, cb) {
        cb(null, `BlogImg-${Date.now()}-${file.originalname}`);
    }
})
*/

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "blog_images",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const post = multer({ storage: storage });

//====================================================================================================================================================================
// Created Blog
const createBlogController = async (req,res) => {
    console.log("Blog Created");

    const {textBody} = req.body;
    const userId = req.user.data._id;
    const time = Date.now();
    let image=req.file.path;


    //data validation
    try {
       await blogDataValidation({textBody});

       //to check if the user account still exist or not 
       await findUserWithKey({key : userId});
        
    } catch (error) {
        return res.send({
            status:400,
            message:"Blog Data Incorrect",
            error:error,
        })
    }

    //Store blog in db
    try {
        const BlogDb = await blogCreate({textBody,userId,time,image});

        return res.send({
            status:200,
            message:"Blog created",
            data:BlogDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal Server Error",
            error:error,
        });
    }

}



//---------------------------------------------------------------------------------------------------------------------------------------------
// Read All Blogs
    // http://localhost:8000/blog/get-blogs?skip=4
const readAllBlogController = async (req,res) => {
    const SKIP = Number(req.query.skip) || 0;

    // get all the blogs using Pagination
    try {
        const BlogDb = await getAllBlogs({SKIP});
    
        return res.send({
            status:200,
            message:"Read All Blogs",
            data:{BlogDb}
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal Server Error",
            error:error,
        });
    }

}



//---------------------------------------------------------------------------------------------------------------------------------------------
// Read My Blogs
const readMyBlogController = async (req,res) => {
    const SKIP = Number(req.query.skip) || 0;
    const userId = req.user.data._id;

    // get all the blogs using Pagination
    try {
        const BlogDb = await getMyBlogs({SKIP,userId});
        
        return res.send({
            status:200,
            message:"Read My Blogs",
            data:BlogDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal Server Error to get user Blogs",
            error:error,
        });
    }

}




//---------------------------------------------------------------------------------------------------------------------------------------------
// Read Particular User Blogs
const readBlogController = async (req,res) => {
    const SKIP = Number(req.query.skip) || 0;
    const followingId = req.query.userId;
    
    // get users blogs using Pagination
    try {
        const BlogDb = await getMyBlogs({SKIP,userId:followingId});
        
        return res.send({
            status:200,
            message:"Read Blogs",
            data:BlogDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal Server Error to get user Blogs",
            error:error,
        });
    }

}




//---------------------------------------------------------------------------------------------------------------------------------------------
// Edit Blogs
const editBlogController = async (req,res) => {
    const {textBody} = req.body;
    const blogId = req.body.blogId;
    const userId = req.user.data._id;
   // const userId = req.session.user.userId;

    //data validation 
    try {
        await blogDataValidation({textBody});
    } catch (error) {
        return res.send({
            status:400,
            message:"Invalid Data",
            error:error, 
        });
    }

    //compare the blog with blogId
    try {
        const blog = await findBlogWithBlogId({blogId});

        //compare the blog userId
        if(!blog.userId.equals(userId))  {  //If userId doesn't match 
            return res.send({
                status:403,
                message:"Blog not allowed to edit",
            });
        }

        const difftime =  (Date.now() - blog.creationDateTime ) / (1000 * 60);   // min
        
        if(difftime < 30) {
            return res.send({
                status:400,
                message:"Not Allowed to edit blog after creation of 30 minutes ",
             });
        }
            

        const editedBlog = await editBlogwithId({blogId,textBody});
        return res.send({
           status:200,
           message:"Blog Edit Successfully",
           data:editedBlog,
        });

        
    } catch (error) {
        return res.send({
            status:500,
            message:"DataBase Error",
            error:error,
        });
    }
}



//---------------------------------------------------------------------------------------------------------------------------------------------
// Delete Blogs
const deleteBlogController = async (req,res) => {
    const blogId = req.body.blogId;
    const userId = req.user.data._id;

    try {
        const blog = await findBlogWithBlogId({blogId});
       // console.log(blog);

        //compare the blog userId
        if(!blog.userId.equals(userId))  {  //If userId doesn't match 
           return res.send({
               status:403,
               message:"Blog not allowed to edit",
           });
        }


        const deletedBlog = await deleteBlogWithBlogId({blogId});

        
        return res.send({
            status:200,
            message:"Blog Deleted",
            data:deletedBlog,
        })

    } catch (error) {
        console.log("error",error);
        return res.send({
            status:500,
            message:"DataBase Error",
            error:error,
        });
    }

    return res.send("Delete Blog")
}



module.exports = { post,createBlogController,readAllBlogController,readMyBlogController,readBlogController,editBlogController,deleteBlogController };