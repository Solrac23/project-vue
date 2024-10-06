<script setup lang="ts">
import { storeToRefs } from 'pinia'
import TodoEmpty from './components/TodoEmpty.vue'
import TodoFormAdd from './components/TodoFormAdd.vue'
import TodoItems from './components/TodoItems.vue'
import TodoSpinner from './components/TodoSpinner.vue'
import { useTodoStore } from './store/index'
import { ref } from 'vue'
const loading = ref<boolean>(false)

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
const { getAllTodos } = todoStore

try {
	loading.value = true
	getAllTodos()
} catch (err) {
	console.error('getAllTodos failed', err)
} finally {
	loading.value = false
}
</script>

	<template>
		<!-- Content -->
		<div class="px-3 py-10 md:px-10">
			<div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
				<TodoSpinner v-if="loading"/>

				<template v-else>
					<TodoFormAdd />

					<TodoItems v-if="todos.length" />

					<TodoEmpty v-else />
				</template>
			</div>
		</div>
			<!--/ Content -->
	</template>
