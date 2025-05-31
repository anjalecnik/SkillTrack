import { DataSourceOptions } from "typeorm"
import { runSeeders, SeederOptions } from "typeorm-extension"
import dbConfig from "../../libs/db/db.cli"
import { HolidayFactory } from "./factories"
import { MainSeeder } from "./main.seeder"

dbConfig.setOptions({
	...dbConfig.options,
	factories: [HolidayFactory],
	seeds: [MainSeeder]
} as unknown as DataSourceOptions & SeederOptions)

void dbConfig.initialize().then(async () => {
	await dbConfig.synchronize(false)
	await runSeeders(dbConfig)
	process.exit()
})
