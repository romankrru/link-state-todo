import React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { resolvers, defaults } from "./resolvers";
import { ApolloProvider } from "react-apollo";
import List from "./List";
import TodoInput from "./TodoInput";
import "./App.css";

const cache = new InMemoryCache();

const typeDefs = `
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: String!): Todo
  }

  type Query {
    todos: [Todo]!
  }
`;

const stateLink = withClientState({
  cache,
  resolvers: resolvers,
  defaults: defaults,
  typeDefs: typeDefs
});

const client = new ApolloClient({
  cache: cache,
  link: stateLink
});

const App = props => {
  return (
    <ApolloProvider client={client}>
      <TodoInput />
      <List />
    </ApolloProvider>
  );
};

export default App;
