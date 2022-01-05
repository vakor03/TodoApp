import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import ApolloWrapper from './Components/appolo-wrappers/appolo-wrapper';
import config from './config.json';

ReactDOM.render(
    <Auth0Provider
        domain="dev-qaszft5o.us.auth0.com"
        clientId="yqVrCmrGQdD9bxRmDXc5E9OB1pted5Dj"
        redirectUri={window.location.origin}
        audience={config['auth-audience']}
    >
        <ApolloWrapper>
            <App />
        </ApolloWrapper>
    </Auth0Provider>,
    document.getElementById('root'),
);