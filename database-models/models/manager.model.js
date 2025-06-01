const {Schema, model} = require('mongoose');

const managerSchema = new Schema({

  managerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true
  },
  name: {
    type: String,
    required: true
  }, 
  description: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  clientId: {
    type:[Schema.Types.ObjectId],
    ref: 'User',
    default: []
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
