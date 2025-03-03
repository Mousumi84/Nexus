const express = require("express");
const { followUserController, followingUserListController, followerUserListController, unfollowController, notfollowingUserListController } = require("../Controllers/FollowController");
const isAuth = require("../Middleware/isAuth");
const FollowRouter = express.Router();

FollowRouter.post('/follow-user',isAuth,followUserController);
FollowRouter.get('/following-user-list',isAuth,followingUserListController);
FollowRouter.get('/notfollowing-user-list',isAuth,notfollowingUserListController);
FollowRouter.get('/follower-user-list',isAuth,followerUserListController);
FollowRouter.post('/unfollow',isAuth,unfollowController);



module.exports = FollowRouter;