const { userProfile } = require('../database-models/index.js');
const mongoose = require('mongoose');


const userController = {
  /**
   * @description Creates a new user profile in the database.
   * @route POST /user/create 
  **/
  createNewUser: async (req, res) => {
    const userBody = req.body;
    const userId = new mongoose.Types.ObjectId();


    const existingUsername = await userProfile.findOne({ username: userBody.username });
    const existingUserEmail = await userProfile.findOne({ email: userBody.email });
    if (existingUserEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    try {
      const newUser = new userProfile({
        userId,
        ...userBody,
      });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }

  },

  /**
   * @description Updates a user in the database
   * @route POST /user/updte
  **/
  updateUser: async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
      const updatedUser = await userProfile.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });

    }
  },

  /**
   * @description Deletes a user from the database
   * @route POST /user/delete/:id
   */

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await userProfile.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', userId: deletedUser.id, userName: deletedUser.firstName });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  /**
   * @description Gets all users from the database
   * @route GET /user/all
  **/
  getAllUsers: async (req, res) => {
    try {
      const users = await userProfile.find({});
      res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
  /**
   * @description Gets a user by their ID
   * @route GET /user/:id
  **/
  getUserByUsername: async (req, res) => {
    const { username } = req.params;

    try {
      const user = await userProfile.findOne({username});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User retrieved successfully', user });
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
};

module.exports = userController; 
