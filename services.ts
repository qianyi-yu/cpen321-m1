import { MongoClient } from "mongodb";

export const client = new MongoClient(process.env.DB_URI ?? "mongodb://127.0.0.1:27017/");
