import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/chatbot';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://apollochatf1-production.up.railway.app/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
   <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

export default client;