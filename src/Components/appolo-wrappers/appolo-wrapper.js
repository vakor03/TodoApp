import React, { useState, useEffect } from 'react';
import {
    ApolloProvider,
    concat,
    ApolloClient,
    InMemoryCache,
} from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { setContext } from '@apollo/link-context';
import { WebSocketLink } from '@apollo/client/link/ws';

function ApolloWrapper({ children }) {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [bearerToken, setBearerToken] = useState();
    useEffect(() => {
        const getToken = async () => {
            const token = isAuthenticated ? await getAccessTokenSilently() : '';
            setBearerToken(token);
        };
        getToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    const authLink = setContext((_, { headers }) => {
        if (!bearerToken) return { headers };

        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${bearerToken}`,
            },
        };
    });

    const wsLink = new WebSocketLink({
        uri: process.env.REACT_APP_HASURA_URI,
        options: {
            reconnect: true,
            connectionParams: () => ({
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            }),
        },
    });

    const client = new ApolloClient({
        link: concat(authLink, wsLink),
        cache: new InMemoryCache({
            typePolicies: {
                Subscription: {
                    fields: {
                        todos: {
                            merge: false,
                        },
                    },
                },
            },
        }),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
