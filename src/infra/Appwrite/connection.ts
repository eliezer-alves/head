import { Client, Account, ID } from 'appwrite'

export const client = new Client()
  .setEndpoint(
    'appwrite client --selfSigned true --endpoint http://localhost/v1'
  ) // Your API Endpoint
  .setProject('633acaa9071bb839463c') // Your project ID

export const account = new Account(client)
