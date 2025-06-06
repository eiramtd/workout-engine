const {mongoose , Schema} = require('mongoose');

const userActivitySchema = new Schema({
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  age: {
    type: Number,
  },
  trainingExperience: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], // add more later 
  }, 
  goal: {
    type: String,
    enum: ['Weight Loss', 'Muscle Gain', 'Maintenance'], // add more later 
  },
  activityLevel: {
    type: String,
    enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Super Active'], // add more later 
  }, 
}); 


const userSocialSchema = new Schema({
  Instagram: {
    type: String,
    trim: true
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  followers: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }, 
  following: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
});

const userProfileSchema = new Schema({
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // },
  username:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  }, 
  phoneNumber: {
    type: String,
    trim: true
  }, 
  password_hash: {
    type: String,
    required: true
  }, 
  gender: {
    type: String,
    enum: ['male','female','other'],
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  userActivity: [userActivitySchema],
  userSocial: [userSocialSchema],
  isManager: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('UserProfile', userProfileSchema, 'userProfiles');
