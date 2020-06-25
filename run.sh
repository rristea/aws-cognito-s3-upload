#!/bin/bash

SAM_CONFIG_FILE="samconfig.toml"
if [ -f "${SAM_CONFIG_FILE}" ]; then
    sam deploy
else
    sam deploy --guided
fi

./echo_frontend_config.sh > frontend/src/config.js

STACK_NAME=$(cat samconfig.toml | grep stack_name | grep -o '"[^"]*' | tr -d '"')
S3_BUCKET="$(aws cloudformation describe-stacks --stack-name "${STACK_NAME}" --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" --output text)"

cd frontend

npm install
npm run build

aws s3 sync build/ "s3://${S3_BUCKET}"

