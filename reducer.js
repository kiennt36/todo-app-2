import storage from './util/Stogare.js'

const init = {
	todos: storage.get(),
	filter: 'all',
	filters: {
		all: () => true,
		active: todo => !todo.completed,
		completed: todo => todo.completed
	},
	indexEditing: null
}

const actions = {
	add: ({ todos }, title) => {
		if(title) {
			todos.push({title, completed: false})
			storage.set(todos)
		}
	},
	toggleCompleted: ({ todos }, index) => {
		const todo = todos[index]
		todo.completed = !todo.completed
		storage.set(todos)
	},
	completedAll: ({ todos }, completed) => {
		todos.forEach(todo => todo.completed = completed)
		storage.set(todos)
	},
	destroyTodo: ({ todos }, index) => {
		todos.splice(index, 1)
		storage.set(todos)
	},
	startEdit: (state, index) => {
		state.indexEditing = index
	},
	endEdit: (state, title) => {
		if(state.indexEditing !== null) {
			const todoEditing = state.todos[state.indexEditing]
			if(title) {
				todoEditing.title = title
				state.indexEditing = null
				storage.set(state.todos)
			}
			else {
				destroyTodo(state, state.indexEditing)
			}
		}
	},
	cancelEdit: (state) => {
		state.indexEditing = null
	},
	switchFilter: (state, type) => {
		if(type)
			state.filter = type
	},
	clearCompleted: (state) => {
		state.todos = state.todos.filter(state.filters.active)
		storage.set(state.todos)
	}
}

export default function reducer(state = init, action, args) {
	actions[action] && actions[action](state, ...args)

	return state
}