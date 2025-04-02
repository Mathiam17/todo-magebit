import { Router } from 'express'
const router = Router()
import taskModel from './taskModel.js'

// create
router.post('/tasks', async (req, res) => {
  try {
    const newTask = await taskModel.create(req.body)
    res.status(201).json(newTask)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// read all
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await taskModel.find({})
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// update
router.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' })
    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// delete
router.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await taskModel.findByIdAndDelete(req.params.id)
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' })
    res.status(200).json(deletedTask)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
