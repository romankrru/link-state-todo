import gql from "graphql-tag";

export const defaults = {
  todos: []
};

let nextTodoId = 0;

export const resolvers = {
  Mutation: {
    addTodo: (_, args, context) => {
      const query = gql`
        query GetTodos {
          todos @client {
            id
            text
            completed
          }
        }
      `;

      const prev = context.cache.readQuery({ query });

      const newTodo = {
        id: nextTodoId++,
        text: args.text,
        completed: false,
        __typename: "TodoItem"
      };

      const data = {
        todos: prev.todos.concat([newTodo])
      };

      context.cache.writeData({ data });
      return newTodo;
    },

    toggleTodo: (_, args, context) => {
      const fragment = gql`
        fragment completeTodo on TodoItem {
          id
          text
          completed
        }
      `;

      const fragmentData = {
        fragment: fragment,
        id: `TodoItem:${args.id}`,
        __typename: "TodoItem"
      };

      const todo = context.cache.readFragment(fragmentData);
      const data = { ...todo, completed: !todo.completed };
      context.cache.writeData({ ...fragmentData, data });
      return todo;
    }
  }
};
