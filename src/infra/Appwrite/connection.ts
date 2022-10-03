import { Client, Account, ID } from 'appwrite'

export const client = new Client()
  .setEndpoint('http://http://192.168.65.108//v1') // Your API Endpoint
  .setProject('633acaa9071bb839463c') // Your project ID

export const account = new Account(client)
