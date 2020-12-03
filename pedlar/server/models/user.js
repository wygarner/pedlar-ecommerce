const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  savedCuts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cut'
    }
  ],
  // following: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Following'
  //   }
  // ],
  // followers: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Followers'
  //   }
  // ]
});

module.exports = mongoose.model('User', userSchema);