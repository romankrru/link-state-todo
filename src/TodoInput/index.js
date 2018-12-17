import React from "react";
import { graphql } from "react-apollo";
import AddTodoMutation from "./graphql/mutations/add-todo";

class TodoInput extends React.Component {
  state = {
    input: ""
  };

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();

          if (!this.state.input) return;

          this.props.mutate({
            variables: {
              text: this.state.input
            }
          });

          this.setState({
            input: ""
          });
        }}
      >
        <input
          autoFocus
          value={this.state.input}
          onChange={e => this.setState({ input: e.target.value })}
        />

        <button type="submit">add todo</button>
      </form>
    );
  }
}

export default graphql(AddTodoMutation)(TodoInput);
