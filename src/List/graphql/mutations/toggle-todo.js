import gql from "graphql-tag";

export default gql`
  mutation ToggleTodo($id: String!) {
    toggleTodo(id: $id) @client {
      id
    }
  }
`;
