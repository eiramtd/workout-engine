const workoutSessionController = require('../controller/workoutSesssionController.js'); 
const express = require('express');
const workoutSessionRouter = express.Router(); 

workoutSessionRouter.post('/create', workoutSessionController.createNewWorkoutSession);
workoutSessionRouter.post('/update', workoutSessionController.updateWorkoutSession);
workoutSessionRouter.post('/delete', workoutSessionController.deleteWorkoutSession);
workoutSessionRouter.get('getByUserId', workoutSessionController.getWorkoutSessionByUserId);
workoutSessionRouter.get('/getRecentByUserId', workoutSessionController.getRecentWorkoutSessionsByUserId);
workoutSessionRouter.post('/clone', workoutSessionController.cloneWorkoutSession);
workoutSessionRouter.get('/getByDateRange', workoutSessionController.getWorkoutSessionsByDateRange); 
workoutSessionRouter.get('/getByTags', workoutSessionController.getWorkoutSessionsByTags); 



module.exports = workoutSessionRouter;