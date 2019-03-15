const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// schema
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = Profile = mongoose.model('profile', profileSchema);
