import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/chatbot';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
//Cambio del server de Apollo
const client = new ApolloClient({
  uri: 'https://cetec-apollo-server.onrender.com',
  cache: new InMemoryCache(),
});

ReactDOM.render(
   <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

export default client;
