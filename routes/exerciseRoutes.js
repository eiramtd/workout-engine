const express = require('express');
const exerciseController = require('../controller/exerciseController');
const exerciseRouter = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); 


exerciseRouter.post('/create', exerciseController.createNewExercise);
exerciseRouter.post('/update', exerciseController.updateExercise);
exerciseRouter.post('/delete', exerciseController.deleteExercise);
exerciseRouter.get('/getAll', exerciseController.getAllExercises);
exerciseRouter.post("/import",upload.single('file'), exerciseController.importExercisesFromCSV);

module.exports = exerciseRouter; 