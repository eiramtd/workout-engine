const express = require('express');
const userController = require('../controller/userController.js');
const userRouter = express.Router(); 



userRouter.post('/create', userController.createNewUser); 
userRouter.post('/update/:id', userController.updateUser); 
userRouter.post("/delete/:id", userController.deleteUser); 
userRouter.get('/getAll', userController.getAllUsers); 
userRouter.get('/:username', userController.getUserByUsername);

module.exports = userRouter; 
