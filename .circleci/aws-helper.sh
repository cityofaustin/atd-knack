#!/usr/bin/env bash
#
# Helper Scripts for AWS
#

function deploy_knack_apps {
    echo "Copying files to s3";
    aws s3 cp knack "s3://atd-knack-code/${CIRCLE_PROJECT_REPONAME}/${CIRCLE_BRANCH}" --recursive;

    echo "Clearing CloudFront distribution...";
    aws cloudfront create-invalidation --distribution-id "E2DXTBTARUZTKP" --paths "/${CIRCLE_PROJECT_REPONAME}/*";

    echo "Deployment Finished";
}
