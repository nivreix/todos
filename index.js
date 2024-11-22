const express = require("express")
const app = express()
const port = 3000 

app.use(express.json())

// Sample data
let todos = [
    { id: 1, task: "Learn Node.js", completed: false, priority: "medium" },
    { id: 2, task: "Build a REST API", completed: false, priority: "medium" },
    {id: 3, task: "Rank Up in League ", completed: false, priority: "medium"}
    ];


    // GET /todos - Retrieve all to-do items
    // THIS IS THE Read part of CRUD
    app.get('/todos', (req, res) =>{
        res.json(todos)
});

//POST 
app.post('/todos', (req, res)=> {
    const newItem = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false,
        priority: req.body.priority || "medium"
    };
    todos.push(newItem);
    res.status(201).json(newItem);
});

app.put('/todos/:id', (req, res, next) => {
    if(req.url.includes('complete all'))
        next()
    else{
        const id = parseInt(req.params.id);
        const todo = todos.find(t => t.id === id);
        if (!todo) {
          return res.status(404).send("To-Do item not found");
        }
        todo.task = req.body.task || todo.task;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        res.json(todo);
    }

  });
  
  app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).send("To-Do item not found");
    }
    todos.splice(index, 1);
    res.status(204).send();
  });

app.put('/todos/complete-all', (req, res) => {
 todos.forEach(item => {
        item.completed = true
    })
    if (!todos){
        return res.status(404).send("To-Do Array is Empty!");
    }
    todos.forEach(item => {
        item.completed = true
    })
})
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});