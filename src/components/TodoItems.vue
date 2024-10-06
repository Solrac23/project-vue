<script setup lang='ts'>
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '../store/index'
import { storeToRefs } from 'pinia'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
</script>
<template>
  <div class="space-y-2">
    <TodoItem 
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    />

  </div>
</template>