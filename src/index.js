import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import ApolloWrapper from './Components/appolo-wrappers/appolo-wrapper';
import config from './config.json';

ReactDOM.render(
    <Auth0Provider
        domain={config['auth-domain']}
        clientId={config['auth-clinet-id']}
        redirectUri={config['auth-redirect-uri']}
        audience={config['auth-audience']}
    >
        <ApolloWrapper>
            <App />
        </ApolloWrapper>
    </Auth0Provider>,
    document.getElementById('root'),
);