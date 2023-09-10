const userRouter = require('express').Router();
const userController = require('../Controller/controller.user');
const uploadFile = require('../Config/multer');

userRouter.get("/friend-suggestion", userController.getFriendSuggestion);
userRouter.put("/update-profile-picture",uploadFile.single('file'),userController.updateProfilePicture);
userRouter.put("/update-username",userController.updateUsername);
userRouter.put("/update-bio",userController.updateBio);
module.exports = userRouter;