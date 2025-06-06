const {Schema, model} = require('mongoose');
const {setSchema,supersetSchema} = require('./workoutSession.model'); 


const exerciseTemplateSchema = new Schema({
  exerciseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Exercise'
  },
  sets :[setSchema],
  supersets: [supersetSchema], 
  note: {
    type: String,
    default: ''
  }
}, {_id: false, timestamps: true});

const workoutDaySchema = new Schema({
  day: {
    type: Number,
    required: true
  },
  week: {
    type: Number,
    required: true
  },
  exerciseType: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'other'],
    default: 'strength'
  }, 
  exercises: [exerciseTemplateSchema]
}, {_id: false, timestamps: true});

const routineTemplateSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  workoutDays: [workoutDaySchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true}); 


module.exports = model('RoutineTemplate', routineTemplateSchema, 'routineTemplates');
