import { Schema, model } from 'mongoose'

const taskSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 30, trim: true },
    desc: { type: String, maxLength: 500, trim: true },
    isActive: Boolean,
  },
  { collection: 'tasks' },
)

const TaskModel = model('Task', taskSchema)

export default TaskModel
