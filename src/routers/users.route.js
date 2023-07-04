const { Router } = require("express");
const {checkToken} = require("../middlewares/auth");
const memoryUpload = require("../middlewares/memoryUpload")

const usersController = require("../controllers/users.controller");
const usersRouter = Router();

//localhost /users
// usersRouter.get("/", usersController.getUsers);
usersRouter.get("/", checkToken, usersController.getUserDetails);
usersRouter.patch("/:userId", memoryUpload.single("profile_image"), usersController.editUser);
usersRouter.delete("/delete/:userId", usersController.deleteUser);

module.exports = usersRouter;