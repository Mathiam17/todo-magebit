<script setup lang="ts">
import { ref } from 'vue'
import { useTaskList, type taskInterface } from '../stores/taskList.ts'

const taskStore = useTaskList()
const { deleteTask, updateTaskState } = taskStore

const footerIsOpened = ref(false)

defineProps<{
  task: taskInterface
}>()
</script>

<template>
  <div class="task-wrapper" :class="{ active: task.isActive }">
    <div class="task-container">
      <section @click="footerIsOpened = !footerIsOpened">
        <h3>{{ task.title }}</h3>
      </section>
      <Transition>
        <footer v-show="footerIsOpened">
          <div :v-if="task.desc">
            {{ task.desc }}
          </div>
          <div>
            <button @click.once="deleteTask(task._id)">Delete</button>
            <div class="state-button-wrapper">
              <button @click="updateTaskState(task._id, true)" :class="{ mute: task.isActive }">
                Set Active
              </button>
              <button @click="updateTaskState(task._id, false)" :class="{ mute: !task.isActive }">
                Set Complete
              </button>
            </div>
          </div>
        </footer>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.task-wrapper {
  height: auto;
  border: 1px solid white;
  border-radius: 3px;
  background-color: #cccccc;
  transition: all 500ms ease;
  overflow: hidden;
}

.task-wrapper.active {
  background-color: #ffffff;
}

.task-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
}

h3 {
  color: #181818;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}

footer div {
  display: flex;
  align-items: baseline;
  color: #282828;
  height: 100%;
  margin-top: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  max-height: 0px;
}
.v-enter-to,
.v-leave-from {
  max-height: 400px;
}

.state-button-wrapper {
  width: 100%;
  display: inherit;
  justify-content: space-around;
}

.state-button-wrapper button {
  width: 100%;
}

.state-button-wrapper :first-child {
  order: -1;
}

.state-button-wrapper:before {
  content: '';
  border: 1px solid black;
  align-self: stretch;
}

button {
  background: transparent;
  border: 0;
  font-size: 11pt;
}

button.mute {
  color: var(--vt-c-black-mute);
}
</style>
