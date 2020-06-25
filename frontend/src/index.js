import React from 'react';
import ReactDOM from 'react-dom';

import Amplify, { Auth, Storage } from 'aws-amplify';

import config from './config';
import './index.css';
import App from './App';

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolId: config.cognito.USER_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID,
		oauth: {
			domain: config.cognito.DOMAIN,
			scope: config.cognito.SCOPE,
			redirectSignIn: config.cognito.REDIRECT_SIGN_IN,
			redirectSignOut: config.cognito.REDIRECT_SIGN_OUT,
			responseType: config.cognito.RESPONSE_TYPE
		}
	},
	Storage: {
		AWSS3: {
            bucket: config.s3.BUCKET,
            region: config.s3.REGION
		}
	}
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
