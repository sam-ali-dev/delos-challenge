import dotenv from "dotenv";
import { join, dirname } from "path";

export const env = process.env.NODE_ENV?.toLowerCase() as string;

console.log(env, 'env')

const envFile = join(dirname(__dirname), `.env`);
console.log(envFile, 'envFile')
dotenv.config({ path: envFile, encoding: "utf8" });
