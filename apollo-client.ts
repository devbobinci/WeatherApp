import { ApolloClient, InMemoryCache } from "@apollo/client";

export const getClient = () => {
  const client = new ApolloClient({
    uri: process.env.API_URL as string,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `apikey ${
        process.env.NEXT_PUBLIC_STEPZEN_API_KEY as string
      }`,
    },
  });

  if (!client) throw new Error("No Apollo client");

  return client;
};
