<script setup lang="ts">
import { useTemplateRef } from 'vue'
var newTaskTitle = ''
var newTaskDesc = ''

const titleInputRef = useTemplateRef<HTMLInputElement>('title-input-ref')
defineExpose({
  titleInputRef,
})
</script>

<template>
  <div class="modal">
    <article class="modal-content">
      <header>
        <h2>Create Task</h2>
        <button class="close-button" @click="$emit('closeModal')">X</button>
      </header>
      <section>
        <form>
          <label>
            Task name
            <input
              id="task-name"
              v-model="newTaskTitle"
              ref="title-input-ref"
              placeholder="E.g. Feed the cat"
              maxlength="30"
            />
          </label>
          <label>
            Task description
            <textarea id="task-desc" v-model="newTaskDesc" maxlength="500"></textarea>
          </label>
        </form>
      </section>
      <footer>
        <button class="add-button" @click="$emit('addNewTask', newTaskTitle, newTaskDesc)">
          Add
        </button>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  place-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  color: var(--vt-c-text-light-1);
  background-color: #fefefe;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #888;
  width: 85%;
  max-width: 512px;
}

header {
  display: flex;
  justify-content: space-between;
}

section {
  margin: 1rem 0;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

label {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  padding: 0.5rem;
  font-size: 10pt;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;
}

input.error:focus {
  outline: 1px solid red;
}

button {
  border: solid 1px black;
  background: transparent;
  width: 100%;
  font-size: 12pt;
  cursor: pointer;
}

.close-button {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.add-button {
  border-radius: 5px;
  padding: 0.5rem;
}
</style>
