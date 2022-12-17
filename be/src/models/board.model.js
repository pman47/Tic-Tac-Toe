const mongoose = require('mongoose')

const boardSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    turn: {
      type: Number,
      required: true
    },
    board: {
      type: Array,
      default: [0,0,0,0,0,0,0,0,0],
      required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    result: {
        type: String,
        default: 'Pending',
        required: false
    },
    whoWon: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
  },
  {
    timestamps: true
  }
)

const Board = mongoose.model('Board', boardSchema)

module.exports = Board
