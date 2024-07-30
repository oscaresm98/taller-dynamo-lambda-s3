export type UserData = {
  imageUrl?: string;
  nombre: string;
  apellido: string;
  cedula: string;
}

export type UserTableDynamoDB = {
  TableName: string;
  Item: UserData;
}