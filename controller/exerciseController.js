const Exercise = require('../database-models/models/exercise.model.js');
const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
const { Readable } = require('stream');



const exerciseController = {

    /** 
     * @REQUIRED FIELDS : -  name, primaryMuscleGroup,
     */

    /**
     * @description Creates a new exercise in the database
     * @route POST /exercise/create
     */

    createNewExercise: async (req, res) => {
        const exerciseBody = req.body;
        try {
            const newExercise = new Exercise({
                ...exerciseBody,
            });
            await newExercise.save();
            console.log('Exercise created successfully:', newExercise.name);
            res.status(201).json({ message: 'Exercise created successfully', exercise: newExercise });
        } catch (error) {
            console.error('Error creating exercise:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },


    /**
     * @description Updates an exercise in the database
     * @route POST /exercise/update
     */

    updateExercise: async (req, res) => {
        const { _id, ...updateFields } = req.body;
        if (!_id) {
            return res.status(400).json({ message: 'Exercise ID is required' });
        }
        try {
            const updatedExercise = await Exercise.findByIdAndUpdate(_id, { $set: updateFields }, { new: true });
            if (!updatedExercise) {
                return res.status(404).json({ message: 'Exercise not found' });
            }
            res.status(200).json({ message: 'Exercise updated successfully', exercise: updatedExercise });
        } catch (error) {
            console.error('Error updating exercise:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Deletes an exercise from the database
     * * @route POST /exercise/delete
     * */

    deleteExercise: async (req, res) => {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ message: 'Exercise ID is required' });
        }
        try {
            const deletedExercise = await Exercise.findByIdAndDelete(_id);
            if (!deletedExercise) {
                return res.status(404).json({ message: 'Exercise not found' });
            }
            res.status(200).json({ message: 'Exercise deleted successfully', exercise: deletedExercise });
        } catch (error) {
            console.error('Error deleting exercise:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    /**
     * @description Retrieves all exercises from the database
     * @route GET /exercise/getAll
     */

    getAllExercises: async (req, res) => {
        try {
            const exercises = await Exercise.find({});
            res.status(200).json({ message: 'Exercises retrieved successfully', exercises });
        } catch (error) {
            console.error('Error retrieving exercises:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },


    /**
     * @description add exercises using csv import . 
     * * @route POST /exercise/import
     */
    importExercisesFromCSV: async (req, res) => {
        const file = req.file?.buffer;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log(file);
        const mapper = {
            exerciseId: 'id',
            name: 'name',
            tags: 'tags',
            primaryMuscleGroup: 'primary',
            secondaryMuscleGroup: 'secondary',
            equipment: 'equipment',
            isBodyweight: 'bodyweight',
            isCardio: 'cardio',
            videoUrl: 'video',
            imageUrl: 'image',
            isCompound: 'compound',
            substituteExercises: 'substitute'
        };
        const stream = Readable.from(file);
        const allRows = await new Promise((resolve, reject) => {
            const rows = [];
            stream
                .pipe(csv())
                .on('data', (row) => {
                    const mappedRow = {};
                    for (const key in mapper) {
                        if (mapper.hasOwnProperty(key)) {
                            if (key === 'tags' || key === 'secondaryMuscleGroup' || key === 'SubstituteExercises') {
                                mappedRow[key] = row[mapper[key]] ? row[mapper[key]].split(',').map(tag => tag.trim()) : [];
                            } else if (key === 'isBodyweight' || key === 'isCardio' || key === 'isCompound') {
                                mappedRow[key] = row[mapper[key]] ? row[mapper[key]].toLowerCase() === 'true' : false;
                            } else {
                                mappedRow[key] = row[mapper[key]];
                            }
                        }
                    }
                    rows.push(mappedRow);
                })
                .on('end', () => resolve(rows))
                .on('error', reject);
        });

        try {
            const exercises = await Exercise.insertMany(allRows,{ordered: false});
            res.status(201).json({ message: 'Exercises imported successfully', exercises });
        } catch (error) {
            console.error('Error importing exercises:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }


    }

};

module.exports = exerciseController;