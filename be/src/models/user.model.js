const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    username: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
