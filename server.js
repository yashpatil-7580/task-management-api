const express=require('express');
const con=require('./db/db')
const app=express();
const taskRoutes=require('./routes/taskRoutes');
const bodyparser=require('body-parser');
//const { tasks,addtasks, updttask, deletetask, filtertask } = require('./controllers/taskController');
app.use(bodyparser.json());

app.use('/',taskRoutes);
// app.get('/tasks',tasks);
// app.post('/addtasks',addtasks);
// app.put('/updttask/:id',updttask);
// app.delete('/deletetask/:id',deletetask);
// app.get('/filtertask',filtertask);

app.get('/users',async(req,res)=>{
    const result=await con.query("select * from users");
    res.send({msg:result.rows});
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})
