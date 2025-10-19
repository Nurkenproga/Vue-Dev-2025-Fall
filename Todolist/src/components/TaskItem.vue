<script setup>
const props = defineProps({
  task: { type: Object, required: true }
})
const emit = defineEmits(['toggle'])

function toggle() { emit('toggle', props.task.id) }
</script>

<template>
  <li class="item" :class="{ done: task.completed }">
    <label class="left">
      <input type="checkbox" :checked="task.completed" @change="toggle" />
      <span class="text">{{ task.text }}</span>
    </label>
    <div class="right">
      <span class="badge">{{ task.category }}</span>
      <span class="badge" :class="`p-${task.priority}`">{{ task.priority }}</span>
      <button
        class="action"
        :class="{ on: !task.completed, off: task.completed }"
        @click="toggle"
      >
        {{ task.completed ? 'Отменить' : 'Выполнено' }}
      </button>
    </div>
  </li>
</template>

<style scoped>
.item { display: flex; align-items: center; justify-content: space-between; border: 1px solid #eee; border-radius: 8px; padding: 10px 12px; }
.left { display: flex; align-items: center; gap: 8px; }
.text { transition: opacity .15s; }
.item.done .text { text-decoration: line-through; opacity: .6; }
.right { display: flex; align-items: center; gap: 8px; }
.badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; border: 1px solid #ddd; color: #111; background: #f6f6f6; }
.p-low { background: #e8f5e9; }
.p-medium { background: #fff8e1; }
.p-high { background: #ffebee; }
.action { border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; color: #fff; }
.action.on { background: #10b981; }
.action.off { background: #6b7280; }
.action:hover { filter: brightness(0.95); }
</style>
