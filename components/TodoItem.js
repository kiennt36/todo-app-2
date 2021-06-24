import html from '../core.js'
import { connect } from '../store.js'

function TodoItem({ todo, index, indexEditing}) {
	return html`
		<li class="${todo.completed && 'completed'} ${indexEditing === index && 'editing'}">
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					${todo.completed && 'checked'}
					onclick="dispatch('toggleCompleted', ${index})"
				>
				<label
					ondblclick="dispatch('startEdit', ${index})"
				>${todo.title}</label>
				<button
					class="destroy"
					onclick="dispatch('destroyTodo', ${index})"
				></button>
			</div>
			<input
				class="edit"
				value="${todo.title}"
				autofocus
				onkeyup="event.keyCode === 13 && dispatch('endEdit', this.value.trim()) ||
					event.keyCode === 27 && dispatch('cancelEdit')"
				onblur="dispatch('endEdit', this.value.trim())"
			>
		</li>
	`
}

export default connect()(TodoItem)