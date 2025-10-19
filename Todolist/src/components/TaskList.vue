<script setup>
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: { type: Array, default: () => [] }
})
const emit = defineEmits(['toggle'])

function onToggle(id) { emit('toggle', id) }
</script>

<template>
  <div class="list">
    <p v-if="!tasks.length" class="empty">Задач нет</p>
    <ul v-else>
      <TaskItem
        v-for="t in tasks"
        :key="t.id"
        :task="t"
        @toggle="onToggle"
      />
    </ul>
  </div>
</template>

<style scoped>
.list ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.empty { color: #888; padding: 12px 0; }
</style>
