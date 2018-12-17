import gql from "graphql-tag";

export default gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`;
