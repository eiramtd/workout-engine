const { workoutSession, Exercise } = require('../database-models/index.js');


const workoutSessionController = {

    /*
        * @description Creates a new workout session in the database
        * @route POST /workout/create
    */

    createNewWorkoutSession: async (req, res) => {
        const workoutSessionBody = req.body;
        try {
            const newWorkoutSession = new workoutSession({
                ...workoutSessionBody,
            });
            await newWorkoutSession.save();
            console.log('Workout session created successfully:', newWorkoutSession.name);
            res.status(201).json({ message: 'Workout session created successfully', workoutSession: newWorkoutSession });
        } catch (error) {
            console.error('Error creating workout session:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Updates a workout session in the database
     * @route POST /workout/update
     * */
    updateWorkoutSession: async (req, res) => {
        const { _id, ...updateFields } = req.body;
        if (!_id) {
            return res.status(400).json({ message: 'Workout session ID is required' });
        }
        try {
            const updatedWorkoutSession = await workoutSession.findByIdAndUpdate(_id, { $set: updateFields }, { new: true });
            if (!updatedWorkoutSession) {
                return res.status(404).json({ message: 'Workout session not found' });
            }
            res.status(200).json({ message: 'Workout session updated successfully', workoutSession: updatedWorkoutSession });
        } catch (error) {
            console.error('Error updating workout session:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }

    },


    /**
     * @description Deletes a workout session from the database
     * * @route POST /workout/delete
     * */

    deleteWorkoutSession: async (req, res) => {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ message: 'Workout session ID is required' });
        }
        try {
            const deletedWorkoutSession = await workoutSession.findByIdAndDelete(_id);
            if (!deletedWorkoutSession) {
                return res.status(404).json({ message: 'Workout session not found' });
            }
            res.status(200).json({ message: 'Workout session deleted successfully', workoutSession: deletedWorkoutSession });
        } catch (error) {
            console.error('Error deleting workout session:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /** 
     * @description get workout session by user ID
     * * @route GET /workout/getByUserId
     */

    getWorkoutSessionByUserId: async (req, res) => {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        try {
            const workoutSessions = await workoutSession.find({ userId });
            if (workoutSessions.length === 0) {
                return res.status(404).json({ message: 'No workout sessions found for this user' });
            }
            res.status(200).json({ message: 'Workout sessions retrieved successfully', workoutSessions });
        } catch (error) {
            console.error('Error retrieving workout sessions:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description get 5 recent workout sessions of a user
     * * @route GET /workout/getRecentByUserId
     */

    getRecentWorkoutSessionsByUserId: async (req, res) => {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        try {
            const workoutSessions = await workoutSession.find({ userId }).sort({ createdAt: -1 }).limit(5);
            if (workoutSessions.length === 0) {
                return res.status(404).json({ message: 'No recent workout sessions found for this user' });
            }
            res.status(200).json({ message: 'Recent workout sessions retrieved successfully', workoutSessions });
        } catch (error) {
            console.error('Error retrieving recent workout sessions:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description clone a workout session
     * * @route POST /workout/clone
     */

    cloneWorkoutSession: async (req, res) => {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ message: 'Workout session ID is required' });
        }
        try {
            const workoutSessionToClone = await workoutSession.findById(_id);
            if (!workoutSessionToClone) {
                return res.status(404).json({ message: 'Workout session not found' });
            }
            const clonedWorkoutSession = new workoutSession({
                ...workoutSessionToClone.toObject(),
                _id: undefined, // Remove the ID to create a new document
                name: `${workoutSessionToClone.name} (Clone)`, // Optionally modify the name
            });
            await clonedWorkoutSession.save();
            res.status(201).json({ message: 'Workout session cloned successfully', workoutSession: clonedWorkoutSession });
        } catch (error) {
            console.error('Error cloning workout session:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description get sessions by date range
     * * @route GET /workout/getByDateRange
     */

    getWorkoutSessionsByDateRange: async (req, res) => {
        const { userId, startDate, endDate } = req.query;
        if (!userId || !startDate || !endDate) {
            return res.status(400).json({ message: 'User ID, start date, and end date are required' });
        }
        try {
            const workoutSessions = await workoutSession.find({
                userId,
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            });
            if (workoutSessions.length === 0) {
                return res.status(404).json({ message: 'No workout sessions found for this date range' });
            }
            res.status(200).json({ message: 'Workout sessions retrieved successfully', workoutSessions });
        } catch (error) {
            console.error('Error retrieving workout sessions by date range:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description get session by tags
     * * @route GET /workout/getByTags 
     */

    getWorkoutSessionsByTags: async (req, res) => {
        const { userId, tags } = req.query;
        if (!userId || !tags) {
            return res.status(400).json({ message: 'User ID and tags are required' });
        }
        try {
            const exercisesWithTag = await Exercise.find({ tags: { $in: tags.split(',') } }).select('_id');
            const workoutSessions = await workoutSession.find({
                userId,
                exercises: { $in: exercisesWithTag.map(exercise => exercise._id) },
            });
            if (workoutSessions.length === 0) {
                return res.status(404).json({ message: 'No workout sessions found for these tags' });
            }
            res.status(200).json({ message: 'Workout sessions retrieved successfully', workoutSessions });
        }
        catch (error) {
            console.error('Error retrieving workout sessions by tags:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },


};
module.exports = workoutSessionController;