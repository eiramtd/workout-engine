const {Schema, model} = require('mongoose');

const exerciseSchema = new Schema({
  _id :{
    type: Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
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
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },

  isCardio: {
    type: Boolean,
    default: false
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
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
  supportsSupersets: {
    type: Boolean,
    default: false
  },
  SubstituteExercises: {
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
