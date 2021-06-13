import dotenv from "dotenv";
import nano from "nano";

dotenv.config();

export async function database() {
    let connection = nano(process.env.COUCHDB_URL);
    await connection.auth(process.env.COUCHDB_USER, process.env.COUCHDB_PASS)
    return connection.use("traffikhunt");
}