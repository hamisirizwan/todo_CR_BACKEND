const Todo = require("../models/todoModel");
require("dotenv").config();

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
// AfricasTalking credantials
const credentials = {
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
};

// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

const sendMessage = async (req, res) => {
  const msg = req.body.name;
  const options = {
    // Set the numbers you want to send to in international format
    to: "+254768793923",
    // Set your message
    message: `hello ${msg}`,
    // Set your shortCode or senderId
    // from: 'XXYYZZ'
  };

  // That’s it, hit send and we’ll take care of the rest
  await sms
    .send(options)
    .then(() => {
      res.status(200).json("sent successfully");
    })
    .catch((err) => {
      res.status(500).json("could not send sms");
    });
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  sendMessage,
};
