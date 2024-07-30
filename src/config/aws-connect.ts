import AWS from 'aws-sdk';

 AWS.config.update({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
  sessionToken: import.meta.env.VITE_AWS_SESSION_TOKEN
});

export const s3 = new AWS.S3();


export const S3_BUCKET_NAME = `${import.meta.env.VITE_AWS_BUCKET_NAME}`;