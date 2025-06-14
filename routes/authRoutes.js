const express = require('express');
const authController = require('../auth/authController');
const authRoutes = express.Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);

module.exports = authRoutes; 
