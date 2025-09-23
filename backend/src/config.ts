import dotenv from "dotenv";

dotenv.config();

export const USER_JWT_SECRET: string = process.env.USER_JWT_SEC ?? "user_Test";
export const DB_URL: string = process.env.DATABASE_URL?? "mongodb://localhost:27017/defaultdb";
