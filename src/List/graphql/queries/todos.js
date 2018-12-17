import gql from "graphql-tag";

export default gql`
  query Todos {
    todos @client {
      id
      completed
      text
    }
  }
`;
