import dotenv from "dotenv";
import nano from "nano";

dotenv.config();
let client: nano.DocumentScope<unknown> | undefined = undefined;

export async function database() {
    if(client) {
        return client;
    }
    let connection = nano(process.env.COUCHDB_URL);
    await connection.auth(process.env.COUCHDB_USER, process.env.COUCHDB_PASS)
    client = connection.use("traffikhunt");
    return client;
}
