const {userProfile} = require('../database-models/index.js'); 
const mongoose = require('mongoose'); 


const userController = {
  /**
   * @description Creates a new user profile in the database.
   * @route POST /user/create 
  **/ 
  createNewUser: async (req, res) => {
    const {firstName,lastName,email,password_hash} = req.body; 
    const userId = new mongoose.Types.ObjectId(); 
    try {
      const newUser = new userProfile({
        userId,
        firstName,
        lastName,
        email,
        password_hash
      });
      
      await newUser.save();
      res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({message: 'Internal server error', error: error.message});
    } 

  },
 

};

module.exports = userController; 
