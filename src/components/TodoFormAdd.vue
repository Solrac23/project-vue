<script setup lang='ts'>
import { ref } from 'vue'
import { useTodoStore } from '../store'

const title = ref<string>('')
const todoStore = useTodoStore()
const { addTodo } = todoStore

function handleAddTodo() {
	if (!title.value) return
	addTodo({ title: title.value, completed: false })
	title.value = '' // Reset the input field after adding the todo
}
</script>
<template>
  <form 
  class="flex items-center px-4 bg-gray-900 h-15 
  rounded-sm border-l-2 border-green-400 mb-3"
  @submit.stop.prevent="handleAddTodo"
  >
    <input
        v-model="title"
        placeholder="Adicione um novo item ..."
        type="text"
        class="bg-gray-900 placeholder-gray-500 text-gray-500 
font-light focus:outline-none block w-full appearance-none leading-normal 
py-3 pr-3"
    >

    <button
        class="text-green-400 text-xs font-semibold 
focus:outline-none"
        type="submit"
    >
        ADICIONAR
    </button>
  </form>
</template>