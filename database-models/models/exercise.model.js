const {Schema, model} = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(require('mongoose'));

const exerciseSchema = new Schema({
  _id :{
    type: Schema.Types.ObjectId,
    auto: true
  },
  exerciseId: {
    type:Number,
    unique: true,
    trim: true
  }, 
  name: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },

  primaryMuscleGroup: {
    type: String,
    required: true,
    trim: true
  },
  secondaryMuscleGroup: {
    type: [String],
    default: []
  },
  equipment: {
    type: [String],
    default: []
  },
  isBodyweight: {
    type: Boolean,
    default: false
  },
  isCardio: {
    type: Boolean,
    default: false
  },


  videoUrl: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },

  isCompound: {
    type: Boolean,
    default: false
  },

  substituteExercises: {
    type: [Schema.Types.ObjectId],
    ref: 'Exercise',
    default: []
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

exerciseSchema.plugin(AutoIncrement, { inc_field: 'exerciseId' });
module.exports = model('Exercise', exerciseSchema, 'exercises'); 
