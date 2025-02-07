const mongoose = require('mongoose');

<<<<<<< HEAD
const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
=======
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    reps: { type: Number, required: true },
    load: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Workout", workoutSchema);
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f
