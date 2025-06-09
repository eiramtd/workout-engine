const express = require('express');
const routineTemplateController = require('../controller/routineTemplateController.js');
const routineTemplateRouter = express.Router();

// Create, update, delete, get
routineTemplateRouter.post('/create', routineTemplateController.createNewRoutineTemplate);// TESTED 
routineTemplateRouter.post('/update', routineTemplateController.updateRoutineTemplate);
routineTemplateRouter.post('/delete', routineTemplateController.deleteRoutineTemplate);
routineTemplateRouter.get('/all', routineTemplateController.getAllRoutineTemplates);
routineTemplateRouter.get('/getById', routineTemplateController.getRoutineTemplateById);

// Day operations
routineTemplateRouter.post('/addDay', routineTemplateController.addDayToRoutineTemplate); // TESTED
routineTemplateRouter.post('/deleteDay', routineTemplateController.deleteDayFromRoutineTemplate);
routineTemplateRouter.patch('/patchDay', routineTemplateController.patchDayInRoutineTemplate);

// Exercise operations
routineTemplateRouter.post('/addExercise', routineTemplateController.addExerciseToRoutineTemplate); // TESTED
routineTemplateRouter.post('/deleteExercise', routineTemplateController.deleteExerciseFromRoutineTemplate);
routineTemplateRouter.patch('/patchExercise', routineTemplateController.patchExerciseInRoutineTemplate);

// Set operations
routineTemplateRouter.post('/addSet', routineTemplateController.addSetToExerciseInRoutineTemplate); // TESTED
routineTemplateRouter.post('/deleteSet', routineTemplateController.deleteSetFromExerciseInRoutineTemplate);
routineTemplateRouter.patch('/patchSet', routineTemplateController.patchSetInExerciseInRoutineTemplate); // BREAKPOINT
routineTemplateRouter.post('/deleteAllSets', routineTemplateController.deleteAllSetsFromExerciseInRoutineTemplate);

// Superset operations
routineTemplateRouter.post('/addSuperset', routineTemplateController.addSupersetToExerciseInRoutineTemplate);
routineTemplateRouter.post('/deleteSuperset', routineTemplateController.deleteSupersetFromExerciseInRoutineTemplate);
routineTemplateRouter.patch('/patchSuperset', routineTemplateController.patchSupersetInExerciseInRoutineTemplate);
routineTemplateRouter.post('/deleteAllSupersets', routineTemplateController.deleteAllSupersetsFromExerciseInRoutineTemplate);

// Clone & reorder
routineTemplateRouter.post('/cloneWeek', routineTemplateController.cloneWeekInRoutineTemplate);
routineTemplateRouter.post('/cloneDay', routineTemplateController.cloneDayInRoutineTemplate);
routineTemplateRouter.post('/reorderDays', routineTemplateController.reorderWorkoutDaysInRoutineTemplate);

// Get by user and paginated
routineTemplateRouter.get('/getByUserId', routineTemplateController.getRoutineTemplatesByUserId);
routineTemplateRouter.get('/paginated', routineTemplateController.getPaginatedRoutineTemplates);

module.exports = routineTemplateRouter;