"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const db_cli_1 = __importDefault(require("../../libs/db/db.cli"));
const factories_1 = require("./factories");
const main_seeder_1 = require("./main.seeder");
db_cli_1.default.setOptions({
    ...db_cli_1.default.options,
    factories: [factories_1.HolidayFactory],
    seeds: [main_seeder_1.MainSeeder]
});
void db_cli_1.default.initialize().then(async () => {
    await db_cli_1.default.synchronize(false);
    await (0, typeorm_extension_1.runSeeders)(db_cli_1.default);
    process.exit();
});
//# sourceMappingURL=seed.js.map