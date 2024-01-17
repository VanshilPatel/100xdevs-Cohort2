  const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();

  app.use(bodyParser.json());


  todos = []

  app.get("/todos" , (req,res)=>{
       for(let i = 0 ; i < todos.length ; i++){
        res.status(200).send(todos[i]);
       }

  })

  app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
      res.status(404).send();
    } else {
      res.json(todo);
    }
  });


  app.post('/todos', (req, res) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000), 
      title: req.body.title,
      description: req.body.description
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  });


  app.put('/todos/:id', (req, res) => {
    const todoInd = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoInd === -1) {
      res.status(404).send();
    } else {
      todos[todoInd].title = req.body.title;
      todos[todoInd].description = req.body.description;
      res.json(todos[todoInd]);
    }
  });
  
  app.delete('/todos/:id', (req, res) => {
    const todoInd = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoInd === -1) {
      res.status(404).send();
    } else {
      todos.splice(todoInd, 1);
      res.status(200).send();
    }
  });


  app.use((req, res, next) => {
    res.status(404).send();
  });
  module.exports = app;