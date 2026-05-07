const express=require('express');
const con=require('./db/db')
const app=express();
const taskRoutes=require('./routes/taskRoutes');
const bodyparser=require('body-parser');
const { tasks,addtasks, updttask, deletetask, filtertask } = require('./controllers/taskController');
app.use(bodyparser.json());


app.get('/tasks',tasks);
app.post('/addtasks',addtasks);
app.put('/updttask/:id',updttask);
app.delete('/deletetask/:id',deletetask);
app.get('/filtertask',filtertask);


app.listen(3000,'127.0.0.1',()=>{
    console.log("Server started at http://localhost:3000");
})