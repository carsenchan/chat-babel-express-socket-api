const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: ''
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  chats: [{
    _id: String
  }],
  members: [{
    _id: String,
    rights: Number
  }],
  isActive: {
    default: true,
    required: true,
    type: Boolean
  }

});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

export default Chatroom;