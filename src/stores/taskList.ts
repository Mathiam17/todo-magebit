import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { ObjectId } from 'mongoose'

export const useTaskList = defineStore('taskList', () => {
  const list = ref(<taskListInterface>(<unknown>[]))
  getList()
  const displayedList = ref(JSON.parse(<string>localStorage.getItem('taskList')) || []) // pull initial list from local storage so that the initial load after refresh can display a populated list instantly
  let currentFilter = 'all' // only used for keeping set filters when adding or removing tasks
  async function getList() {
    axios
      .get('api/tasks')
      .then((result) => {
        list.value = result.data
        displayedList.value = list.value
        filterDisplayedList(currentFilter)
        localStorage.setItem('taskList', JSON.stringify(displayedList.value))
      })
      .catch((error) => {
        console.error('Error getting DB data: ', error.message)
        throw error
      })
  }
  async function addTask(newTaskTitle: string, newTaskDesc: string) {
    if (newTaskTitle) {
      await axios
        .post('api/tasks', {
          title: newTaskTitle,
          desc: newTaskDesc,
          isActive: true,
        })
        .then(() => {
          getList()
        })
        .catch((error) => {
          console.error('Error adding task to DB: ', error.message)
          throw error
        })
    } else console.error('taskListStore: Attempted to create new task with no title')
  }
  async function deleteTask(key: ObjectId) {
    await axios
      .delete(`api/tasks/${key}`)
      .then(() => {
        getList()
      })
      .catch((error) => {
        console.error('Error deleting task from DB: ', error.message)
        throw error
      })
  }
  async function updateTaskState(key: ObjectId, newState: boolean) {
    const taskToUpdate = list.value[list.value.findIndex((task) => task._id === key)]
    taskToUpdate.isActive = newState
    await axios
      .put(`api/tasks/${key}`, taskToUpdate)
      .then(() => {
        getList()
      })
      .catch((error) => {
        console.error('Error deleting task from DB: ', error.message)
        throw error
      })
  }
  function filterDisplayedList(filterType: string) {
    if (filterType === 'all' || !filterType) displayedList.value = list.value
    if (filterType === 'active')
      displayedList.value = list.value.filter((task) => task.isActive === true)
    else if (filterType === 'complete')
      displayedList.value = list.value.filter((task) => task.isActive === false)
    currentFilter = filterType
  }

  return {
    displayedList,
    addTask,
    deleteTask,
    updateTaskState,
    filterDisplayedList,
  }
})

export interface taskListInterface extends Array<taskInterface> {
  _id: ObjectId
  title: string
  desc: string
  isActive: boolean
}
export interface taskInterface {
  _id: ObjectId
  title: string
  desc: string
  isActive: boolean
}
