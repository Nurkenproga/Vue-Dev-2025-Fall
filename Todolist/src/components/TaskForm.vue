<script setup>
import { ref } from 'vue'

const text = ref('')
const category = ref('Дом')
const priority = ref('medium')

const emit = defineEmits(['add'])

function submit() {
  const trimmed = text.value.trim()
  if (!trimmed) return
  emit('add', { text: trimmed, category: category.value, priority: priority.value })
  text.value = ''
  priority.value = 'medium'
  category.value = 'Дом'
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <input class="input" type="text" v-model="text" placeholder="Новая задача..." />
    <select v-model="category" class="select">
      <option>Дом</option>
      <option>Работа</option>
      <option>Учёба</option>
    </select>
    <select v-model="priority" class="select">
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
    </select>
    <button class="btn" type="submit">Добавить</button>
  </form>
</template>

<style scoped>
.form { display: flex; gap: 8px; }
.input, .select { padding: 8px; border: 1px solid #ddd; border-radius: 6px; }
.btn { padding: 8px 12px; border: none; border-radius: 6px; background: #3b82f6; color: #fff; cursor: pointer; }
.btn:hover { filter: brightness(0.95); }
</style>
