#!/bin/bash

STACK_NAME=$(cat samconfig.toml | grep stack_name | grep -o '"[^"]*' | tr -d '"')

echo "export default {"
echo "	s3: {"
echo "		REGION: '$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='Region'].OutputValue" --output text)',"
echo "		BUCKET: '$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='BackendImageBucketName'].OutputValue" --output text)'"
echo "	},"
echo "	cognito: {"
echo "		REGION: '$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='Region'].OutputValue" --output text)',"
echo "		IDENTITY_POOL_ID: '$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='BackendCognitoIdentityPoolId'].OutputValue" --output text)',"
echo "		USER_POOL_ID: '$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='BackendCognitoUserPoolId'].OutputValue" --output text)',"
echo "		APP_CLIENT_ID: '$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='BackendCognitoUserPoolClientId'].OutputValue" --output text)',"
echo "		DOMAIN: '$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='FrontendProxyApiId'].OutputValue" --output text).auth.$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='Region'].OutputValue" --output text).amazoncognito.com',"
echo "		SCOPE: ['email', 'openid'],"
echo "		REDIRECT_SIGN_IN: '$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='FrontendUrl'].OutputValue" --output text)',"
echo "		REDIRECT_SIGN_OUT: '$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='FrontendUrl'].OutputValue" --output text)',"
echo "		RESPONSE_TYPE: 'code'"
echo "	}"
echo "};"