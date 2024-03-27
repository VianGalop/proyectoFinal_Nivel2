import { config } from 'dotenv'

config()

export const DB_PORT = process.env.DB_PORT || 3308
export const DB_HOSTNAME = process.env.DB_HOSTNAME || 'localhost'
export const DB_USERNAME = process.env.DB_USERNAME || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD | ''
export const DB_DATABASE = process.env.DB_DATABASE || 'blogging'
export const PORT = process.env.PORT || 3000