import "reflect-metadata";
import { createConnection } from "typeorm";

console.log(__dirname)
const db = createConnection(
    {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "projectwanted",
        entities: [
            __dirname + '/entity/*.ts'
        ],
        synchronize: true,
        logging: false
    })

export default db