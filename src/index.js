import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import ApolloWrapper from './Components/appolo-wrappers/appolo-wrapper';

ReactDOM.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH_DOMAIN}
        clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
        redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
        audience={process.env.REACT_APP_AUTH_AUDIENCE}>
        <ApolloWrapper>
            <App />
        </ApolloWrapper>
    </Auth0Provider>,
    document.getElementById('root'),
);
