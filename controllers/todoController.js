const Todo = require("../models/todoModel");

const getTodos = (req, res) => {
  Todo.find(function (err, data) {
    if (err) {
      res.json(err.message);
    } else {
      res.json(data);
    }
  });
};
const addTodo = (req, res) => {
  const todo = new Todo();
  todo.name = req.body.name;

  todo
    .save()
    .then(() => res.json("saved successfully"))
    .catch((e) => res.json(e.message));
};

module.exports = {
  getTodos,
  addTodo,
};
