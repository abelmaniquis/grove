var express = require('express');
var userRouter = express.Router();
var controller = require('./user.controller');

userRouter.get('/',controller.getUsers)
          .post('/',controller.createUser)
          .delete('/',controller.deleteUser);

module.exports = userRouter;