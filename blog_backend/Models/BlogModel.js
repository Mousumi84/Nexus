const {ObjectId} =require("mongodb");
const BlogSchema = require("../Schemas/BlogSchema");
const UserSchema = require("../Schemas/AuthSchema");
let LIMIT = 6;

const blogCreate = ({textBody,userId,time,image}) => {
    return new Promise(async (resolve,reject) => {

        const blogObj = new BlogSchema({
            textBody : textBody,
            image,
            creationDateTime : time,
            userId : userId,
        });

        try {
            const BlogDb = await blogObj.save();
            resolve(BlogDb);
        } catch (error) {
            reject(error);
        }
    });
}

const getAllBlogs = ({SKIP}) => {
    return new Promise(async (resolve,reject) => {


        // sort, limit, skip
        try {
            const BlogDb = await BlogSchema.aggregate([
                {
                    $match : { isDeleted : { $ne : true }}
                },
                {
                    $sort : { creationDateTime : -1 }
                },
                {
                    $skip : SKIP
                },
                {
                    $limit : LIMIT
                }
            ]);

            const userDetailsPromises  = BlogDb.map(async (item) => {
                let userId=item.userId;
                try {
                    const UserDetails = await UserSchema.findById({ _id: userId  });
                    
                    return ({item,UserDetails});
                } catch (error) {
                   return ({item});
                }
            });

            const blogDataWithUsers = await Promise.all(userDetailsPromises ); 
           
            resolve(blogDataWithUsers);
           // resolve(BlogDb);
        } catch (error) {
            reject(error);
        }
    });
}

const getMyBlogs = ({SKIP,userId}) => {
    return new Promise(async (resolve,reject) => {
        const objectuserId=new ObjectId(userId);

      //  console.log("user id=>",objectuserId,"skip",SKIP);

        // match, sort, limit, skip
        try {
            const BlogDb = await BlogSchema.aggregate([
                {
                    $match : { 
                        userId: objectuserId, 
                        isDeleted : { $ne : true }
                    },
                }, 
                {
                    $sort : { creationDateTime : -1 }
                },
                {
                    $skip : SKIP
                },
                {
                    $limit : LIMIT
                }
            ]);

            resolve(BlogDb);
        } catch (error) {
            reject(error);
        }
    });
}

const findBlogWithBlogId  = ({blogId}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const Blog = await BlogSchema.findOne({ _id : blogId});
           // console.log("Blog",Blog);

            if(!Blog) reject('Blog not found');

            resolve(Blog);
        } catch (error) {
            reject(error);
        }
    });
}

const editBlogwithId = ({blogId,textBody}) => {
    return new Promise (async (resolve,reject) => {
        const newBlogData={};

        if(textBody)
            newBlogData.textBody = textBody;

        try {
            const editBlog = await BlogSchema.findOneAndUpdate({ _id : blogId},
                {
                    textBody : newBlogData.textBody,
                }
            );

            resolve(editBlog);
        } catch (error) {
            reject(error);
        }
    });
}

const deleteBlogWithBlogId = ({blogId}) => {
    return new Promise (async (resolve,reject) => {

        try {
            const deletedBlog = await BlogSchema.findOneAndUpdate({ _id : blogId },{isDeleted : true, deletedTime : Date.now() });
            resolve(deletedBlog);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { blogCreate,getAllBlogs,getMyBlogs,findBlogWithBlogId,editBlogwithId,deleteBlogWithBlogId };