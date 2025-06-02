const express = require('express');
const userController = require('../controller/userController.js');
const userRouter = express.Router(); 



userRouter.post('/create', userController.createNewUser); 

module.exports = userRouter; 
