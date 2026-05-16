const express=require('express');
const router=express.Router();
const {tasks,addtasks,updttask,deletetask,filtertask}=require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const { signup, login } = require('../controllers/authController');

router.post('/signup',signup);
router.post('/login',login);
router.get('/tasks',authMiddleware,tasks);
router.post('/addtasks',authMiddleware,addtasks);
router.put('/updttask/:id',authMiddleware,updttask);
router.delete('/deletetask/:id',authMiddleware,deletetask);
router.get('/filtertask',authMiddleware,filtertask);

module.exports=router;