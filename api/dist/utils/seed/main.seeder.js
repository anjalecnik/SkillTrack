"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSeeder = void 0;
const holiday_entity_1 = require("../../libs/db/entities/holiday.entity");
const factories_1 = require("./factories");
class MainSeeder {
    async run(_dataSource, factoryManager) {
        const holidayFactory = factoryManager.get(holiday_entity_1.HolidayEntity);
        await holidayFactory.saveMany(factories_1.predefinedHolidays.length);
    }
}
exports.MainSeeder = MainSeeder;
//# sourceMappingURL=main.seeder.js.map