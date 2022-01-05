import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react";
import config from './config.json';
import AppoloWrapper from "./Components/appolo-wrappers/appolo-wrapper";

ReactDOM.render(
  <React.StrictMode>
      {/*<Auth0Provider*/}
      {/*    domain={config['auth-domain']}*/}
      {/*    clientId={config['auth-clinet-id']}*/}
      {/*    redirectUri={config['auth-redirect-uri']}*/}
      {/*    audience={config['auth-audience']}*/}
      {/*>*/}
      {/*    <AppoloWrapper>*/}
              <App />

  </React.StrictMode>,
  document.getElementById('root')
);

