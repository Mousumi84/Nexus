const AuthModel = require("../Models/AuthModel");
const { followUserEntry, getFollowingUserList, getFollowerUserList, unfollow, getNotFollowingUserList } = require("../Models/FollowModel");

const followUserController = async (req,res) => {
    const followerUserId=req.user.data._id;
    const followingUserId = req.body.followingId;
   // console.log("followerUserId =>",followerUserId,"followingUserId =>",followingUserId);
    
    if(!followerUserId || !followingUserId) {
        return res.send({
            status:400,
            message:"Important Credential Missing",
        });
    }

    //Check for the user, if exist/not
    try {
        await AuthModel.findUserWithKey({key : followerUserId});
        await AuthModel.findUserWithKey({key : followingUserId});
    } catch (error) {
        return res.send({
            status:500,
            message:"DateBase Error, Can't find user id ",
            error:error,
        });
    }

    //create entry within the DB
    try {
        const followDb = await followUserEntry({followerUserId,followingUserId});

        return res.send({
            status:200,
            message:"Follow Successful",
            data:followDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"DateBase Error B",
            error:error,
        });
    }

}

const followingUserListController = async (req,res) => {
    const userId=req.user.data._id;
    //const userId = req.session.user.userId;   

    //check for followingUserId
    try {
        const followingUserIdList = await getFollowingUserList({userId});
        /*
        if(followingUserIdList.length === 0) {
            return res.send({
              status: 203,
              message: "No following user found",
            });
        }
        */

        return res.send({
            status:200,
            message:"Following List available",
            data:followingUserIdList,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"DateBase Error",
            error:error,
        });
    }

}

const notfollowingUserListController = async (req,res) => {
    const userId=req.user.data._id;  

    //check for followingUserId
    try {
        const followingUserIdList = await getNotFollowingUserList({userId});

        return res.send({
            status:200,
            message:"Not-Following List available",
            data:followingUserIdList,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"DateBase Error",
            error:error,
        });
    }

}

const followerUserListController = async (req,res) => {
    const userId=req.user.data._id;
    //const userId = req.session.user.userId;   

    //check for followingUserId
    try {
        const followerUserIdList = await getFollowerUserList({userId});
        /*
        if(followerUserIdList.length === 0) {
            return res.send({
              status: 203,
              message: "No follower user found",
            });
        }
        */

        return res.send({
            status:200,
            message:"Follower List available",
            data:followerUserIdList,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"DateBase Error",
            error:error,
        });
    }

}

const unfollowController = async (req,res) => {
    const followerId=req.user.data._id;
    const followingId = req.body.followingId;
    //console.log("followerUserId =>",followerId,"followingUserId =>",followingId);
    

    //Delete data from db
    try {
        const unfollowUser = await unfollow({followerId,followingId});

        return res.send({
            status:200,
            message:"UnFollow Successful",
            data:unfollowUser,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"DateBase Error",
            error:error,
        });
    } 
}

module.exports = { followUserController,followingUserListController,notfollowingUserListController,followerUserListController,unfollowController };