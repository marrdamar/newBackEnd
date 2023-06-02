const { Router } = require("express");
const {checkToken} = require("../middlewares/auth");

const usersController = require("../controllers/users.controller");
const usersRouter = Router();

//localhost /users
usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:userId", checkToken, usersController.getUserDetail);
usersRouter.patch("/:userId", usersController.updateUserData);
usersRouter.delete("/delete/:userId", usersController.deleteUser);

module.exports = usersRouter;