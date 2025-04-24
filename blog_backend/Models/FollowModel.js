const UserSchema = require("../Schemas/AuthSchema");
const FollowSchema = require("../Schemas/FollowSchema");
const {ObjectId}=require("mongodb");

const followUserEntry = ({followerUserId,followingUserId}) => {
    return new Promise (async (resolve,reject) => {

        //Check for Duplicate Entries 
        try {
            const DuplicateEntries = await FollowSchema.findOne({
                followerUserId,
                followingUserId
            });
            
            if(!DuplicateEntries) {
                const followObj = new FollowSchema({
                    followerUserId : followerUserId,
                    followingUserId : followingUserId,
                    creationDateTime : Date.now(),
                });
    
                
                const followDb = await followObj.save();
    
                resolve(followDb);
            }
                   
            reject("Follower already following the user");       
        } catch (error) {
            reject(error);
        }
    });
}

const getFollowingUserList = ({userId}) => {
    return new Promise (async (resolve,reject) => {
        const objUserId=new ObjectId(userId);
//        console.log(objUserId);

        try {
            const followingUserIdList = await FollowSchema.aggregate([
                {
                    $match : { followerUserId : objUserId },
                },
                {
                    $sort : { creationDateTime : -1 },
                },
            ]);

            //console.log("followingUserIdList",followingUserIdList);
            
            const followinguserIds = followingUserIdList.map(item => item.followingUserId);

            const followingDetails = await UserSchema.find({ _id: { $in: followinguserIds } });
            
            resolve(followingDetails);
        } catch (error) {
            reject(error);
        }
    });
}

const getNotFollowingUserList = ({userId}) => {
    return new Promise (async (resolve,reject) => {
        const objUserId=new ObjectId(userId);

        try {
            const followingUserIdList = await FollowSchema.find({ followerUserId : objUserId });

            const followingUserIds = followingUserIdList.map(item => item.followingUserId);

            let notfollowingusersDetails;
            if(followingUserIds.length > 0) {
                notfollowingusersDetails = await UserSchema.find({ _id: { $nin: followingUserIds }});
            }
            else {
                notfollowingusersDetails = await UserSchema.find({});
            }
           // console.log("notfollowingusersDetails =>",notfollowingusersDetails);
            resolve(notfollowingusersDetails);
        } catch (error) {
            reject(error);
        }
    });
}

const getFollowerUserList = ({userId}) => {
    return new Promise (async (resolve,reject) => {
        const objUserId=new ObjectId(userId);
       // console.log(objUserId);

        try {
            const followerUserIdList = await FollowSchema.aggregate([
                {
                    $match : { followingUserId : objUserId },
                },
                {
                    $sort : { creationDateTime : -1 },
                },
            ]);
        //    console.log("followerUserIdList",followerUserIdList);

            const followeruserIds = followerUserIdList.map(item => item.followerUserId);

            const followerDetails = await UserSchema.find({ _id: { $in: followeruserIds } });
            
            resolve(followerDetails);
        } catch (error) {
            reject(error);
        }
    });
}

const unfollow = ({followerId,followingId}) => {
    return new Promise (async (resolve,reject) => {

        try {
            const unfollow = await FollowSchema.findOneAndDelete({followerUserId : followerId , followingUserId : followingId});

            resolve(unfollow);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports = { followUserEntry,getFollowingUserList,getNotFollowingUserList,getFollowerUserList,unfollow };