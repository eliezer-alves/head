import { Client, Account } from 'appwrite'

export const client = new Client()
  .setEndpoint(
    'appwrite client --selfSigned true --endpoint http://localhost/v1',
  ) // Your API Endpoint
  .setProject('633d10de55eb7a3990bc') // Your project ID

export const account = new Account(client)
