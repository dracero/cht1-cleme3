import ReactDOM from "react-dom";
import App from "./components/chatbot";
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://apollochatf1-production.up.railway.app/',
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);

export default client
