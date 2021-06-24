import html from '../core.js'
import { connect } from '../store.js'

import TodoItem from './TodoItem.js'

function TodoList({ todos, filter, filters }) {
	return html`
		<ul class="todo-list">
			${todos &&
				todos
					.filter(filters[filter])
					.map((todo, index) => TodoItem({ todo, index }))
			}
		</ul>
	`
}

export default connect()(TodoList)