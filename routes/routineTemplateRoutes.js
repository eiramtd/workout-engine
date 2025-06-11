const express = require('express');
const routineTemplateController = require('../controller/routineTemplateController.js');
const routineTemplateRouter = express.Router();

// Create, update, delete, get
routineTemplateRouter.post('/create', routineTemplateController.createNewRoutineTemplate);// TESTED 
// routineTemplateRouter.post('/update', routineTemplateController.updateRoutineTemplate);
routineTemplateRouter.post('/delete', routineTemplateController.deleteRoutineTemplate); // TESTED
routineTemplateRouter.get('/all', routineTemplateController.getAllRoutineTemplates); // TESTED
routineTemplateRouter.get('/getById', routineTemplateController.getRoutineTemplateById); // TESTED

// Day operations
routineTemplateRouter.post('/addDay', routineTemplateController.addDayToRoutineTemplate); // TESTED
routineTemplateRouter.post('/deleteDay', routineTemplateController.deleteDayFromRoutineTemplate); // TESTED
routineTemplateRouter.patch('/patchDay', routineTemplateController.patchDayInRoutineTemplate); // TESTED 

// Exercise operations
routineTemplateRouter.post('/addExercise', routineTemplateController.addExerciseToRoutineTemplate); // TESTED
routineTemplateRouter.post('/deleteExercise', routineTemplateController.deleteExerciseFromRoutineTemplate); // TESTED
routineTemplateRouter.patch('/patchExercise', routineTemplateController.patchExerciseInRoutineTemplate);// TESTED

// Set operations
routineTemplateRouter.post('/addSet', routineTemplateController.addSetToExerciseInRoutineTemplate); // TESTED
routineTemplateRouter.post('/deleteSet', routineTemplateController.deleteSetFromExerciseInRoutineTemplate); // TESTED
routineTemplateRouter.patch('/patchSet', routineTemplateController.patchSetInExerciseInRoutineTemplate); // TESTED 
routineTemplateRouter.post('/deleteAllSets', routineTemplateController.deleteAllSetsFromExerciseInRoutineTemplate); // TESTED

// Superset operations
routineTemplateRouter.post('/addSuperset', routineTemplateController.addSupersetToExerciseInRoutineTemplate); // TESTED
routineTemplateRouter.post('/deleteSuperset', routineTemplateController.deleteSupersetFromExerciseInRoutineTemplate); // TESTED 
routineTemplateRouter.patch('/patchSuperset', routineTemplateController.patchSupersetInExerciseInRoutineTemplate); // TESTED
routineTemplateRouter.post('/deleteAllSupersets', routineTemplateController.deleteAllSupersetsFromExerciseInRoutineTemplate); // TESTED

// Clone & reorder
routineTemplateRouter.post('/cloneWeek', routineTemplateController.cloneWeekInRoutineTemplate); // TESTED
routineTemplateRouter.post('/cloneDay', routineTemplateController.cloneDayInRoutineTemplate); // TESTED
// routineTemplateRouter.post('/reorderDays', routineTemplateController.reorderWorkoutDaysInRoutineTemplate);

// Get by user and paginated
routineTemplateRouter.get('/getByUserId', routineTemplateController.getRoutineTemplatesByUserId); // TESTED
// routineTemplateRouter.get('/paginated', routineTemplateController.getPaginatedRoutineTemplates);

module.exports = routineTemplateRouter;