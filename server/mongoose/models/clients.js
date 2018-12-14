const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for clients
const clientSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const Client = mongoose.model('Clients', clientSchema, 'clients');

export default Client;