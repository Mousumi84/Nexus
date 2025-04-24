const cron = require("node-cron");
const BlogSchema = require("./Schemas/BlogSchema");

function parmanentlyDelete() {

    cron.schedule(" * * 0 * * * ",async() => {
        // 1. find the blogs having isdeleted true
        const blogdata = await BlogSchema.findOne({ isDeleted : true });
       


        if(blogdata.length > 0) {
            const dltArr=[];
            
            // 2. compare blog time and if time is greater than 30 days then push the blog in a array dltArr
            blogdata.map(blog => {
                const diff = ( Date.now() - blog.deletedTime ) / (1000 * 60 * 60 * 24);    //days

                if(diff > 30) {
                    dltArr.push(blog._id);
                }
            });

            // 3. delete the datas from the BlogSchema using the dltAr Ids
            if(dltArr > 0) {
                try {
                    const deleteBlog = await BlogSchema.findOneAndDelete({
                        _id : { $in : dltArr },
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    });
}

module.exports = parmanentlyDelete;