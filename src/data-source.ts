import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Audi3354.",
    database: "postgres",
    synchronize: false,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    extra: {
        connectTimeoutMS: 30000
    },
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch((err) => console.error("Error during Data Source initialization:", err));