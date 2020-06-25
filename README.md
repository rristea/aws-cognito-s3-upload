# SAM Application with Cognito User Pools and Identity Pool for uploading an Image to S3

This project that makes use of Cognito User Pools for Authentication and Cognito Identity Pool to get temporary IAM access for uploading to S3. The upload to s3 will fail if the user is not authenticated.

In order to test this there is also a frontend client, which is a SPA React App that was created with [create-react-app](https://github.com/facebook/create-react-app), where it was integrated the [Amplify framework](https://docs.amplify.aws/start/q/integration/react) in order to handle the Authentication and the upload to S3. For the Authentication it was used the [Authentication library](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js), and the `App.js` was modified according to the [React sample](https://docs.amplify.aws/lib/auth/social/q/platform/js#full-react-sample). For the S3 upload it was used the [Storage library](https://docs.amplify.aws/lib/restapi/getting-started/q/platform/js), and added a simple component according to the [Browser uploads sample](https://docs.amplify.aws/lib/storage/upload/q/platform/js#browser-uploads).

The Client has a button for Sign-in, which redirects to the Cognito hosted UI for registration and authentication. After succesfully authenticating, you are redirected back to the Client which will then Display a Sign-out button. There is also a form for selecting an image to upload, as well as a label that specifies wether the upload succeeded or failed.

The client is hosted in S3 with Static Website Hosting. But this only supports (unencrypted) http, which is not good for cognito which needs to redirect to a https site after login. The standard way of adding https would have been to use CloudFront, but that takes to long to create (20 to 30 min) which is too much for this example. So instead it is used an API Gateway HTTP Proxy, which supports https and does a passthrough of the received request to the configured S3 bucket via http.


The structure of the repo:
* frontend/ - The React Client.
* echo_frontend_config.sh - A script which queries the created CloudFormation stack and extracts data for a `config.js` file that is needed by the React Client.
* run.sh - Script that autmatically runs the SAM template, builds the React Client, and uploads it to S3. Use this right after cloning this repo for a quick setup.
* template.yaml - A template that defines the application's AWS resources.