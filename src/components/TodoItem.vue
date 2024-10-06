<script setup lang='ts'>
import TodoCheck from './ui/TodoCheck.vue'
import TodoTrash from './ui/TodoTrash.vue'
import { useTodoStore } from '../store'
import { ref } from 'vue'

const todoStore = useTodoStore()
const { updateTodo, deleteTodo } = todoStore
const { todo } = defineProps({
	todo: {
		type: Object,
		default: () => ({}),
	},
})

const title = ref<string>(todo.title)
const isCompleted = ref<boolean>(todo.completed)

function handleUpdateTodo() {
	if (!title) return
	updateTodo({
		id: todo.id,
		title: title.value,
		completed: isCompleted.value,
	})
}

function handleDeleteTodo() {
	deleteTodo(todo.id)
}

function checkClick() {
	isCompleted.value = !isCompleted.value
	handleUpdateTodo()
}
</script>
  <template>
	<div class="bg-gray-300 rounded-sm mt-5">
					  <div class="flex items-center px-4 py-3 border-b 
  border-gray-400 last:border-b-0">
						  <div class="flex items-center justify-center 
  mr-2">
							  <button :class="{
									'text-green-600': isCompleted,
									'text-gray-400': !isCompleted
								}"
								@click="checkClick"
								>
									<TodoCheck />
							  </button>
						  </div>

						  <div class="w-full">
							  <input
									v-model="title"
								  type="text"
								  placeholder="Digite a sua tarefa"
								  class="bg-gray-300 placeholder-gray-500 
  text-gray-700 font-light focus:outline-none block w-full appearance-none 
  leading-normal mr-3"
									@keyup.enter="handleUpdateTodo"
							  >
						  </div>

						  <div class="ml-auto flex items-center 
  justify-center">
							  <button 
									class="focus:outline-none"
									@click="handleDeleteTodo"
								>
									<TodoTrash />
							  </button>
						  </div>
							
					  </div>
				  </div>
  </template>