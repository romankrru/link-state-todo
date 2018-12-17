import React from "react";
import TodosQuery from "./graphql/queries/todos";
import ToggleTodoMutation from "./graphql/mutations/toggle-todo";
import { graphql, compose } from "react-apollo";

class List extends React.Component {
  render() {
    return (
      <ul>
        {this.props.data.todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                onChange={() =>
                  this.props.toggleTodo({ variables: { id: todo.id } })
                }
                type="checkbox"
                checked={todo.completed}
              />
              {todo.text}
            </label>
          </li>
        ))}
      </ul>
    );
  }
}

export default compose(
  graphql(ToggleTodoMutation, {
    name: "toggleTodo"
  }),

  graphql(TodosQuery)
)(List);
