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

const deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({
          message: "todo not found with id " + req.params.id,
        });
      }
      res.json({ message: "todo deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.json({
          message: `todo not found with id:${req.params.id}`,
        });
      }
      return res.status(500).json({
        message: `Could not delete todo with id:${req.params.id}`,
      });
    });
};

const updateTodo = (req, res) => {
  Todo.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  )
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: "todo not found with id " + req.params.id,
        });
      }
      res.send(todo);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "todo not found with id " + req.params.id,
        });
      }

      return res.status(500).send({
        message: "Error updating todo with id " + req.params.id,
      });
    });
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};
