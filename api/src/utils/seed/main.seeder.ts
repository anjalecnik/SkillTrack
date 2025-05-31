import { DataSource } from "typeorm"
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { HolidayEntity } from "../../libs/db/entities/holiday.entity"
import { predefinedHolidays } from "./factories"

export class MainSeeder implements Seeder {
	public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
		const holidayFactory = factoryManager.get(HolidayEntity)

		await holidayFactory.saveMany(predefinedHolidays.length)
	}
}
