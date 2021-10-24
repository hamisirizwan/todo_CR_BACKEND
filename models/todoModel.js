const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
