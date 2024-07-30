import { S3 } from 'aws-sdk';
import { s3, S3_BUCKET_NAME } from '../config/aws-connect';
import { UserTableDynamoDB } from '../types';

export const uploadImage = async (file: File): Promise<string> => {
  const params: S3.PutObjectRequest = {
    Bucket: S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}-${file.name}`,
    Body: file,
    ACL: 'public-read',
  };  

  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

export const sendUserData = async (userTableDynamoDB: UserTableDynamoDB): Promise<void> => {
  const API_GATEWAY_URL = `${import.meta.env.VITE_AWS_API_GATEWAY_URL}/Upload-Data`;

  try {
    console.log(userTableDynamoDB);
    // return
    
    const response = await fetch(API_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userTableDynamoDB),
    });

    if (!response.ok) {
      throw new Error('Failed to send data to API Gateway');
    }

    // Puedes manejar la respuesta si es necesario
    const result = await response.json();
    console.log('API Gateway response:', result);
  } catch (error) {
    console.error('Error sending data to API Gateway:', error);
    throw error;
  }
};

export const getUserRecords = async () => {
  const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;

  try {
    const response = await fetch(`${API_GATEWAY_URL}/Upload-Data?TableName=DataUsuario`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch records from API Gateway');
    }

    const records = await response.json();
    return records;
  } catch (error) {
    console.error('Error fetching records from API Gateway:', error);
    throw error;
  }
};