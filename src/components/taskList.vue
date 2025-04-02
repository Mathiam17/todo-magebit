<script setup lang="ts">
import ListFilter from '../components/ListFilter.vue'
import TaskItem from './taskItem.vue'
import CreateNewTaskButton from './CreateNewTaskButton.vue'
import { useTaskList } from '../stores/taskList.ts'
import { storeToRefs } from 'pinia'

const taskStore = useTaskList()
const { displayedList } = storeToRefs(taskStore)
const { deleteTask, filterDisplayedList } = taskStore
</script>

<template>
  <main>
    <ListFilter @set-filter="filterDisplayedList" />
    <div class="list-container">
      <TransitionGroup name="list" class="transition-wrapper">
        <TaskItem
          v-for="(task, index) in displayedList"
          :task="task"
          :index="index"
          :key="task._id"
          @delete-task="deleteTask"
        />
        <CreateNewTaskButton @click="$emit('openCreateTaskModal')" />
      </TransitionGroup>
    </div>
  </main>
</template>

<style scoped>
.list-container {
  min-height: 50px;
  padding: 0.25rem 0.5rem;
  border-radius: 0 0 5px 5px;
  background: #001941;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

.transition-wrapper {
  position: relative;
  padding: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-active {
  position: absolute;
}
</style>
