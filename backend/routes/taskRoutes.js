const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // JWT middleware


router.post('/', protect, createTask);      // Create a new task
router.get('/', protect, getTasks);        // Get all tasks for logged-in user
router.put('/:id', protect, updateTask);   // Update a task by ID
router.delete('/:id', protect, deleteTask);// Delete a task by ID


module.exports = router;
