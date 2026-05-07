const express=require('express');
const router=express.Router();
const {tasks,addtasks,updttask,deletetask,filtertask}=require('../controllers/taskController');

router.get('/tasks',tasks);
router.post('/addtasks',addtasks);
router.put('/updttask/:id',updttask);
router.delete('/deletetask/:id',deletetask);
router.get('/filtertask',filtertask);

module.exports=router;