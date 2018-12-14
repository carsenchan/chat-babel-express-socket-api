const mongoose = require("mongoose");

const memberRightSchema = new mongoose.Schema({
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  right: {
    type: String,
    required: true,
    enum: ['owner', 'admin', 'member']
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const MemberRight = mongoose.model("MemberRight", memberRightSchema, "memberRights");

export default MemberRight;