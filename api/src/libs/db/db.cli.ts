import { Config } from "../../utils/config/config"
import { DataSource } from "typeorm"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

export const dbConfig: PostgresConnectionOptions = {
	type: "postgres",
	host: Config.get<string>("POSTGRES_HOST"),
	port: Config.get<number>("POSTGRES_PORT"),
	username: Config.get<string>("POSTGRES_USER"),
	password: Config.get<string>("SECRET_POSTGRES_PASS"),
	database: Config.get<string>("POSTGRES_DB"),
	entities: ["src/libs/db/entities/**/*.ts"],
	migrations: ["src/libs/db/migrations/**/*.ts"],
	ssl: false,
	synchronize: false
}

export default new DataSource(dbConfig)
