<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import CreateTaskModal from './components/CreateTaskModal.vue'
import TaskList from './components/taskList.vue'
import { useTaskList } from './stores/taskList.ts'

const taskStore = useTaskList()
const { addTask } = taskStore
const isCreateTaskModalVisible = ref(false)
const modalRef = useTemplateRef('createTaskModal')

function handleAddTask(newTaskTitle: string, newTaskDesc: string) {
  if (newTaskTitle) {
    addTask(newTaskTitle, newTaskDesc)
    isCreateTaskModalVisible.value = false
  } else {
    modalRef.value!.titleInputRef!.className = 'error'
    modalRef.value!.titleInputRef!.focus()
  }
}
</script>

<template>
  <TaskList @open-create-taskModal="isCreateTaskModalVisible = true" />
  <CreateTaskModal
    v-if="isCreateTaskModalVisible"
    @close-modal="isCreateTaskModalVisible = false"
    @add-new-task="handleAddTask"
    ref="createTaskModal"
  />
</template>
