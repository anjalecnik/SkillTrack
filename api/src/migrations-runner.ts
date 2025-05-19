// import { Logger } from "@nestjs/common"
// import { NestFactory } from "@nestjs/core"
// import { DataSource } from "typeorm"

// async function bootstrap(): Promise<void> {
// 	const logger = new Logger("Bootstrap", { timestamp: true })
// 	logger.log("Creating standalone application")

// 	const app = await NestFactory.createApplicationContext(DbConfigModule, { logger: ["log", "error", "warn", "verbose", "debug"] })
// 	const dataSource = await app.select(DbConfigModule).resolve(DataSource)

// 	const startTime = performance.now()
// 	logger.log("Running migrations...")

// 	const migrations = await dataSource.runMigrations({ transaction: "each" })

// 	const endTime = performance.now()

// 	if (migrations.length > 0) logger.log(`Migrations Ran:\n${migrations.map(migration => `name: ${migration.name} timestamp: ${migration.timestamp}`).join("\n")}`)
// 	logger.log(`Migrations Successful! time elapsed: ${new Date(endTime - startTime).toISOString().slice(11, 19)}sec`)

// 	logger.log(`Closing application.`)
// 	await app.close()
// }
// bootstrap().catch((error: Error) => console.error(`ERROR: Can't run: ${error.message}`))
