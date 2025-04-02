<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['setFilter'])

const currentActiveFilter = ref('filter-all')
function setFilter(event: MouseEvent) {
  const button = <HTMLButtonElement>event.target
  const pressedButtonID = button.attributes.getNamedItem('id')!.value
  if (currentActiveFilter.value == pressedButtonID) return
  emit('setFilter', pressedButtonID.split('-')[1])
  currentActiveFilter.value = pressedButtonID
}
</script>

<template>
  <nav class="filter-wrapper">
    <button
      @click="setFilter($event)"
      :class="{ 'active-filter': currentActiveFilter === 'filter-all' }"
      id="filter-all"
    >
      All
    </button>
    <button
      @click="setFilter($event)"
      :class="{ 'active-filter': currentActiveFilter === 'filter-active' }"
      id="filter-active"
    >
      Active
    </button>
    <button
      @click="setFilter($event)"
      :class="{ 'active-filter': currentActiveFilter === 'filter-complete' }"
      id="filter-complete"
    >
      Complete
    </button>
  </nav>
</template>

<style scoped>
.filter-wrapper {
  display: flex;
  justify-content: space-around;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  background-color: #2b4c82;
}
button {
  transition: all 0.3s;
  background: transparent;
  color: var(--color-text);
  font-size: 12pt;
  border: 0;
  width: 100%;
  padding: 10px;
}
button.active-filter {
  background: #f8f8f8;
  color: #2c3e50;
}
</style>
