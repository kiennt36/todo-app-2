import html from '../core.js'
import { connect } from '../store.js'

import TodoList from './TodoList.js'

function Main({ todos, filters }) {
	return html`
		<section class="main">
			<input
				id="toggle-all"
				class="toggle-all"
				type="checkbox"
				onchange="dispatch('completedAll', this.checked)"
				${todos.every(filters.completed) && 'checked'}
			>
			<label for="toggle-all">Mark all as complete</label>
			${TodoList()}
		</section>
	`
}

export default connect()(Main)