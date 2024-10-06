import { defineStore } from 'pinia'
import { ref } from 'vue'

type TodosResponse = {
	id: number
	title: string
	completed: boolean
}[]

type TodosRequest = {
	id?: number
	title: string
	completed: boolean
}

// Define your Pinia store here.
export const useTodoStore = defineStore('todo', () => {
	const todos = ref<TodosResponse>([])

	const getAllTodos = async () => {
		const response = await fetch('http://localhost:3000/todos')
		const data = await response.json()
		todos.value = data
	}

	async function addTodo({ title, completed }: TodosRequest) {
		if (!title) return
		const response = await fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, completed }),
		})
		const data = await response.json()
		todos.value.unshift(data)
	}

	async function updateTodo({ id, title, completed }: TodosRequest) {
		const response = await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, completed }),
		})
		const data = await response.json()
		const index = todos.value.findIndex(todo => todo.id === data.id)
		if (index !== -1) {
			todos.value.splice(index, 1, data)
		} else {
			todos.value.push(data)
		}
	}

	async function deleteTodo(id: number) {
		await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const index = todos.value.findIndex(todo => todo.id === id)
		if (index !== -1) {
			todos.value.splice(index, 1)
		}
	}

	return {
		todos,
		getAllTodos,
		addTodo,
		updateTodo,
		deleteTodo,
	}
})
