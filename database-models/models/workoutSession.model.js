const {Schema, model} = require('mongoose');




const setSchema = new Schema({
  setNumber: {
    type: Number,
    required: true,
    min: 1
  },
  isWarmup: {
    type: Boolean,
    default: false
  },
  reps: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    default: 0,
    min: 0
  },
  restTime: {
    type: Number, // in seconds
    default: 60,
    min: 0
  },
  rpe: {
    type: Number,
    min: 1,
    max: 10
  }, 
},{_id: true});

const supersetSchema = new Schema({
  supersetId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Exercise'
  },
  sets: [setSchema],
  completed: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    trim: true
  }
},{_id: true});

const exerciseEntrySchema = new Schema({ 
  exerciseId:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Exercise'
  },
  sets : [setSchema],
  supersets: [supersetSchema],
  completed: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    trim: true
  },
},{_id: false});

const workoutSessionSchema = new Schema({
  _id:{
    type: Schema.Types.ObjectId,
    auto: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }, 
  sessionType: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'balance','custom'],
    required: true
  },
  duration: {
    type: Number, 
    required: true,
    min: 1
  }, 
  exercises: [exerciseEntrySchema],
  notes: {
    type: String,
    trim: true
  },
  isTracked: {
    type: Boolean,
    default: true
  },

  source: {
    type: String,
    enum: ['auto', 'manual', 'template'],
    default: 'app'
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}); 
module.exports = {
  setSchema,
  supersetSchema,
  WorkoutSession: model('WorkoutSession', workoutSessionSchema, 'workoutSessions')
};
