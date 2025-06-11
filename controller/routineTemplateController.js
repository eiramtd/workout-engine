const {routineTemplate} = require('../database-models/index.js'); 

const routineTemplateController = {

    /**
     * @description Creates a new routine template in the database
     * @route POST /routine/create
     */

    createNewRoutineTemplate: async (req, res) => {
        const routineTemplateBody = req.body;
        try {
            const newRoutineTemplate = new routineTemplate({
                ...routineTemplateBody,
            });
            await newRoutineTemplate.save();
            console.log('Routine template created successfully:', newRoutineTemplate.name);
            res.status(201).json({ message: 'Routine template created successfully', routineTemplate: newRoutineTemplate });
        } catch (error) {
            console.error('Error creating routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Updates a routine template in the database
     * @route POST /routine/update
     * */
    updateRoutineTemplate: async (req, res) => {
        const { routineTemplateId, ...updateFields } = req.body;
        if (!routineTemplateId) {
            return res.status(400).json({ message: 'Routine template ID is required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findByIdAndUpdate(routineTemplateId, { $push: updateFields }, { new: true });
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template not found' });
            }
            res.status(200).json({ message: 'Routine template updated successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error updating routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description add a day to a routine template
     * @route POST /routine/addDay
     */

    addDayToRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day } = req.body;
        if (!routineTemplateId || !day) {
            return res.status(400).json({ message: 'Routine template ID and day are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findByIdAndUpdate(
                routineTemplateId,
                { $push: { workoutDays: day } },
                { new: true }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template not found' });
            }
            res.status(200).json({ message: 'Day added to routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error adding day to routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description add a exercise to a routine template
     */
    addExerciseToRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exercise } = req.body;
        if (!routineTemplateId || !day || !week || !exercise) {
            return res.status(400).json({ message: 'Routine template ID, day, week, and exercise are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $push: { 'workoutDays.$.exercises': exercise } },
                { new: true }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Exercise added to routine template successfully', routineTemplate: updatedRoutineTemplate });
        }
        catch (error) {
            console.error('Error adding exercise to routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Deletes a day from a routine template
     * @route POST /routine/deleteDay
     */

    deleteDayFromRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week } = req.body;
        if (!routineTemplateId || !day || !week) {
            return res.status(400).json({ message: 'Routine template ID and day are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findByIdAndUpdate(
                routineTemplateId,
                { $pull: { workoutDays: { day: day, week: week } } },
                { new: true }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template not found' });
            }
            res.status(200).json({ message: 'Day deleted from routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error deleting day from routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Deletes an exercise from a routine template
     * @route POST /routine/deleteExercise
     */

    deleteExerciseFromRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId } = req.body;
        if (!routineTemplateId || !day || !week || !exerciseId) {
            return res.status(400).json({ message: 'Routine template ID, day, week, and exercise ID are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $pull: { 'workoutDays.$.exercises': { _id: exerciseId } } },
                { new: true }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Exercise deleted from routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error deleting exercise from routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Deletes a routine template from the database
     * @route POST /routine/delete
     */
    deleteRoutineTemplate: async (req, res) => {
        const { routineTemplateId } = req.body;
        if (!routineTemplateId) {
            return res.status(400).json({ message: 'Routine template ID is required' });
        }
        try {
            const deletedRoutineTemplate = await routineTemplate.findByIdAndDelete(routineTemplateId);
            if (!deletedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template not found' });
            }
            res.status(200).json({ message: 'Routine template deleted successfully', routineTemplate: deletedRoutineTemplate });
        } catch (error) {
            console.error('Error deleting routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    /**
     * @description Retrieves all routine templates from the database
     * @route GET /routine/all
     */
    getAllRoutineTemplates: async (req, res) => {
        try {
            const allRoutineTemplates = await routineTemplate.find({});
            res.status(200).json({ message: 'All routine templates retrieved successfully', routineTemplates: allRoutineTemplates });
        } catch (error) {
            console.error('Error retrieving routine templates:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Retrieves a routine template by its ID
     * @route GET /routine/getById
     */

    getRoutineTemplateById: async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Routine template ID is required' });
        }
        try {
            const routineTemplateById = await routineTemplate.findById(id);
            if (!routineTemplateById) {
                return res.status(404).json({ message: 'Routine template not found' });
            }
            res.status(200).json({ message: 'Routine template retrieved successfully', routineTemplate: routineTemplateById });
        } catch (error) {
            console.error('Error retrieving routine template by ID:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description add a set to an exercise in a routine template
     * @route POST /routine/addSetToExercise
     */

    addSetToExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId, set } = req.body;
        if (!routineTemplateId || !day || !week || !exerciseId || !set) {
            return res.status(400).json({ message: 'Routine template ID, day, week, exercise ID, and set are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $push: { 'workoutDays.$.exercises.$[exercise].sets': set } },
                { new: true, arrayFilters: [{ 'exercise._id': exerciseId }] }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Set added to exercise in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error adding set to exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description add a superset to an exercise in a routine template
     * @route POST /routine/addSupersetToExercise
     */
    addSupersetToExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId, superset } = req.body;
        if (!routineTemplateId || !day || !week || !exerciseId || !superset) {
            return res.status(400).json({ message: 'Routine template ID, day, week, exercise ID, and superset are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $push: { 'workoutDays.$.exercises.$[exercise].supersets': superset } },
                { new: true, arrayFilters: [{ 'exercise._id': exerciseId }] }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Superset added to exercise in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error adding superset to exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Deletes a set from an exercise in a routine template
     * @route POST /routine/deleteSetFromExercise
     */

    deleteSetFromExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId, setId } = req.body;
        if (!routineTemplateId || !day || !week || !exerciseId || !setId) {
            return res.status(400).json({ message: 'Routine template ID, day, week, exercise ID, and set ID are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $pull: { 'workoutDays.$.exercises.$[exercise].sets': { _id: setId } } },
                { new: true, arrayFilters: [{ 'exercise._id': exerciseId }] }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Set deleted from exercise in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error deleting set from exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description updates a superset in an exercise in a routine template
     * @route POST /routine/updateSupersetInExercise
     */

    updateSupersetInExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId, supersetId, updatedSuperset } = req.body;
        if (!routineTemplateId || !day || !week || !exerciseId || !supersetId || !updatedSuperset) {
            return res.status(400).json({ message: 'Routine template ID, day, week, exercise ID, superset ID, and updated superset are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $set: { 'workoutDays.$.exercises.$[exercise].supersets.$[superset]': updatedSuperset } },
                { new: true, arrayFilters: [{ 'exercise._id': exerciseId }, { 'superset._id': supersetId }] }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Superset updated in exercise in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error updating superset in exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Deletes a superset from an exercise in a routine template
     * @route POST /routine/deleteSupersetFromExercise
     */

    deleteSupersetFromExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId, supersetId } = req.body;
        if (!routineTemplateId || !day || !week || !exerciseId || !supersetId) {
            return res.status(400).json({ message: 'Routine template ID, day, week, exercise ID, and superset ID are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $pull: { 'workoutDays.$.exercises.$[exercise].supersets': { _id: supersetId } } },
                { new: true, arrayFilters: [{ 'exercise._id': exerciseId }] }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Superset deleted from exercise in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error deleting superset from exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Retrieves all routine templates created by a specific user
     * @route GET /routine/getByUserId
     */
    getRoutineTemplatesByUserId: async (req, res) => {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        try {
            const routineTemplatesByUser = await routineTemplate.find({ createdBy: userId });
            if (routineTemplatesByUser.length === 0) {
                return res.status(404).json({ message: 'No routine templates found for this user' });
            }
            res.status(200).json({ message: 'Routine templates retrieved successfully', routineTemplates: routineTemplatesByUser });
        } catch (error) {
            console.error('Error retrieving routine templates by user ID:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },



    /**
     * @description delete all sets from an exercise in a routine template
     * @route POST /routine/deleteAllSetsFromExercise
     */

    deleteAllSetsFromExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId } = req.body;
        if (!routineTemplateId || !day || !week || !exerciseId) {
            return res.status(400).json({ message: 'Routine template ID, day, week, and exercise ID are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $set: { 'workoutDays.$.exercises.$[exercise].sets': [] } },
                { new: true, arrayFilters: [{ 'exercise._id': exerciseId }] }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'All sets deleted from exercise in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error deleting all sets from exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description delete all supersets from an exercise in a routine template
     * @route POST /routine/deleteAllSupersetsFromExercise
     */
    deleteAllSupersetsFromExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId } = req.body;
        if (!routineTemplateId || !day || !week || !exerciseId) {
            return res.status(400).json({ message: 'Routine template ID, day, week, and exercise ID are required' });
        }
        try {
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $set: { 'workoutDays.$.exercises.$[exercise].supersets': [] } },
                { new: true, arrayFilters: [{ 'exercise._id': exerciseId }] }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'All supersets deleted from exercise in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error deleting all supersets from exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description clone a week from one routine template to another
     * @route POST /routine/cloneWeek
     */


    cloneWeekInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, sourceWeek, targetWeek } = req.body;
        if (!routineTemplateId || !sourceWeek || !targetWeek) {
            return res.status(400).json({ message: 'Routine template ID, source week, and target week are required' });
        }
        try {
            const template = await routineTemplate.findById(routineTemplateId);
            if (!template) {
                return res.status(404).json({ message: 'Routine template not found' });
            }
            // Find all days for the source week
            const sourceDays = template.workoutDays.filter(wd => wd.week === sourceWeek);
            if (!sourceDays.length) {
                return res.status(404).json({ message: 'Source week not found in routine template' });
            }
            // Clone days and set their week to targetWeek
            const clonedDays = sourceDays.map(day => {
                const newDay = day.toObject ? day.toObject() : { ...day };
                delete newDay._id; // Remove _id so MongoDB assigns new ones
                newDay.week = targetWeek;
                return newDay;
            });
            // Add cloned days to the template
            const updatedTemplate = await routineTemplate.findByIdAndUpdate(
                routineTemplateId,
                { $push: { workoutDays: { $each: clonedDays } } },
                { new: true }
            );
            if (!updatedTemplate) {
                return res.status(404).json({ message: 'Routine template not found after update' });
            }
            res.status(200).json({ message: 'Week cloned successfully', routineTemplate: updatedTemplate });
        } catch (error) {
            console.error('Error cloning week in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    /**
     * @description clone a day 
     * @route POST /routine/cloneDay
     */
    cloneDayInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, sourceDay, sourceWeek, targetDay, targetWeek } = req.body;
        if (!routineTemplateId || sourceDay == null || sourceWeek == null) {
            return res.status(400).json({ message: 'Routine template ID, source day, and source week are required' });
        }
        try {
            const template = await routineTemplate.findById(routineTemplateId);
            if (!template) {
                return res.status(404).json({ message: 'Routine template not found' });
            }
            const dayData = template.workoutDays.find(w => w.day === sourceDay && w.week === sourceWeek);
            if (!dayData) {
                return res.status(404).json({ message: 'Day not found in routine template' });
            }
            // Clone and set new day/week if provided
            const newDay = dayData.toObject ? dayData.toObject() : { ...dayData };
            delete newDay._id;
            newDay.day = targetDay != null ? targetDay : dayData.day;
            newDay.week = targetWeek != null ? targetWeek : dayData.week;

            const updatedTemplate = await routineTemplate.findByIdAndUpdate(
                routineTemplateId,
                { $push: { workoutDays: newDay } },
                { new: true }
            );
            if (!updatedTemplate) {
                return res.status(404).json({ message: 'Routine template not found after update' });
            }
            res.status(200).json({ message: 'Day cloned successfully', routineTemplate: updatedTemplate });
        } catch (error) {
            console.error('Error cloning day in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },


    /**
     * @description Retrieves all routine templates with pagination
     * @route GET /routine/paginated
     */
    getPaginatedRoutineTemplates: async (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 }
        };
        try {
            const paginatedRoutineTemplates = await routineTemplate.paginate({}, options);
            res.status(200).json({ message: 'Paginated routine templates retrieved successfully', routineTemplates: paginatedRoutineTemplates });
        } catch (error) {
            console.error('Error retrieving paginated routine templates:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description reorder workout days in a routine template
     * @route POST /routine/reorderDays
     */

    // reorderWorkoutDaysInRoutineTemplate: async (req, res) => {
    //     const { routineTemplateId, newOrder } = req.body;
    //     if (!routineTemplateId || !Array.isArray(newOrder)) {
    //         return res.status(400).json({ message: 'Routine template ID and new order are required' });
    //     }
    //     try {
    //         const updatedRoutineTemplate = await routineTemplate.findByIdAndUpdate(
    //             routineTemplateId,
    //             { workoutDays: newOrder },
    //             { new: true }
    //         );
    //         if (!updatedRoutineTemplate) {
    //             return res.status(404).json({ message: 'Routine template not found' });
    //         }
    //         res.status(200).json({ message: 'Workout days reordered successfully', routineTemplate: updatedRoutineTemplate });
    //     } catch (error) {
    //         console.error('Error reordering workout days in routine template:', error);
    //         res.status(500).json({ message: 'Internal server error', error: error.message });
    //     }
    // },

    /**
     * @description PATCH a day in a routine template
     * @route PATCH /routine/updateDay
     */

    patchDayInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, updatedDay } = req.body;
        if (!routineTemplateId || day == null || week == null || !updatedDay) {
            return res.status(400).json({ message: 'Routine template ID, day, week, and updatedDay are required' });
        }
        try {
            const setFields = {};
            for (const [key, value] of Object.entries(updatedDay)) {
                setFields[`workoutDays.$[targetDay].${key}`] = value;
            }
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId },
                { $set: setFields },
                {
                    new: true,
                    arrayFilters: [
                        { 'targetDay.day': day, 'targetDay.week': week }
                    ]
                }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Day patched in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error patching day in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description patch an exercise in a routine template
     * @route PATCH /routine/patchExercise
     */

    patchExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId, patch } = req.body;
        if (!routineTemplateId || day == null || week == null || !exerciseId || !patch) {
            return res.status(400).json({ message: 'Routine template ID, day, week, exercise ID, and patch object are required' });
        }
        try {
            const setFields = {};
            for (const [key, value] of Object.entries(patch)) {
                setFields[`workoutDays.$.exercises.$[exercise].${key}`] = value;
            }
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $set: setFields },
                { new: true, arrayFilters: [{ 'exercise._id': exerciseId }] }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Exercise patched in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error patching exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description patch a set
     * @route PATCH /routine/patchset
     */

    patchSetInExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId, setId, patch } = req.body;
        if (!routineTemplateId || day == null || week == null || !exerciseId || !setId || !patch) {
            return res.status(400).json({ message: 'Routine template ID, day, week, exercise ID, set ID, and patch object are required' });
        }
        try {
            const setFields = {};
            for (const [key, value] of Object.entries(patch)) {
                setFields[`workoutDays.$.exercises.$[exercise].sets.$[set].${key}`] = value;
            }
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $set: setFields },
                { new: true, arrayFilters: [{ 'exercise._id': exerciseId }, { 'set._id': setId }] }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Set patched in exercise in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error patching set in exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description patch a superset
     * @route PATCH /routine/patchSuperset
     */

    patchSupersetInExerciseInRoutineTemplate: async (req, res) => {
        const { routineTemplateId, day, week, exerciseId, supersetId, updatedSuperset } = req.body;
        if (!routineTemplateId || !day || !week || !exerciseId || !supersetId || !updatedSuperset) {
            return res.status(400).json({ message: 'Routine template ID, day, week, exercise ID, superset ID, and updated superset are required' });
        }
        try {
            // Build $set object for only the fields to update
            const setFields = {};
            for (const [key, value] of Object.entries(updatedSuperset)) {
                setFields[`workoutDays.$.exercises.$[exercise].supersets.$[superset].${key}`] = value;
            }
            const updatedRoutineTemplate = await routineTemplate.findOneAndUpdate(
                { _id: routineTemplateId, 'workoutDays.day': day, 'workoutDays.week': week },
                { $set: setFields },
                {
                    new: true, arrayFilters: [
                        { 'exercise._id': exerciseId },
                        { 'superset._id': supersetId }
                    ]
                }
            );
            if (!updatedRoutineTemplate) {
                return res.status(404).json({ message: 'Routine template or specified day/week not found' });
            }
            res.status(200).json({ message: 'Superset patched in exercise in routine template successfully', routineTemplate: updatedRoutineTemplate });
        } catch (error) {
            console.error('Error patching superset in exercise in routine template:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

}

module.exports = routineTemplateController; 
