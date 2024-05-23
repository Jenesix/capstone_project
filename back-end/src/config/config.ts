import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT) || 8000;
export const MONGO_URI = String(process.env.MONGO_URI);
export const secret_jwt = process.env.SECRET_JWT;
export const supabaseUrl = String(process.env.SUPABASE_URL);
export const supabaseKey = String(process.env.SUPABASE_KEY);
