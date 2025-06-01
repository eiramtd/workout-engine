const userProfile = require('./models/userProfile.model');
const exercise = require('./models/exercise.model');
const workoutSession = require('./models/workoutSession.model');
const manager = require('./models/manager.model'); 
const routineTemplate = require('./models/routineTemplate.model');

module.exports = {
  userProfile,
  exercise,
  workoutSession,
  manager,
  routineTemplate
};
