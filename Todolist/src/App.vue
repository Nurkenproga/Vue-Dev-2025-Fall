<script setup>
import { ref, computed } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref([
  { id: 1, text: 'Купить молоко', category: 'Дом', priority: 'medium', completed: false },
  { id: 2, text: 'Сделать ДЗ по Vue', category: 'Учёба', priority: 'high', completed: false }
])

const categoryFilter = ref('all')
const statusFilter = ref('incomplete')

const incompleteCount = computed(() => tasks.value.filter(t => !t.completed).length)
const completedCount = computed(() => tasks.value.filter(t => t.completed).length)

const filteredTasks = computed(() => {
  let list = tasks.value
  if (categoryFilter.value !== 'all') list = list.filter(t => t.category === categoryFilter.value)
  if (statusFilter.value === 'incomplete') list = list.filter(t => !t.completed)
  if (statusFilter.value === 'completed') list = list.filter(t => t.completed)
  return list
})

function addTask(newTask) {
  const id = Date.now()
  tasks.value.push({ id, ...newTask, completed: false })
}

function toggleCompleted(id) {
  const t = tasks.value.find(t => t.id === id)
  if (t) t.completed = !t.completed
}
</script>

<template>
  <div class="container">
    <h1>Todo List</h1>

    <TaskForm @add="addTask" />

    <section class="filters">
      <label>
        Категория:
        <select v-model="categoryFilter">
          <option value="all">Все</option>
          <option value="Дом">Дом</option>
          <option value="Работа">Работа</option>
          <option value="Учёба">Учёба</option>
        </select>
      </label>

      <label>
        Статус:
        <select v-model="statusFilter">
          <option value="all">Все</option>
          <option value="incomplete">Невыполненные</option>
          <option value="completed">Выполненные</option>
        </select>
      </label>

      <div class="counter">Невыполненных: {{ incompleteCount }} · Выполненных: {{ completedCount }}</div>
    </section>

    <TaskList :tasks="filteredTasks" @toggle="toggleCompleted" />
  </div>
</template>

<style scoped>
.container { max-width: 720px; margin: 32px auto; padding: 16px; }
h1 { margin-bottom: 16px; }
.filters { display: flex; gap: 16px; align-items: center; margin: 16px 0; flex-wrap: wrap; }
.counter { margin-left: auto; font-weight: 600; }
</style>
