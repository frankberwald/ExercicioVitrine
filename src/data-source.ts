import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Audi3354.",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    extra: {
        connectTimeoutMS: 30000
    },
    subscribers: [],
})
