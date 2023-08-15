import { Client, Databases } from 'appwrite'
export const DATABASE_ID = '64db37fdaedd9d23a02b'
export const COLLECTION_MESSAGE_ID = '64db380e52df8be3cbf4'
export const PROJECT_ID = '64db199642508803a239'
const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('64db199642508803a239')
export const databases = new Databases(client)
export default client
