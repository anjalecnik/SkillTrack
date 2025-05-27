"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const config_1 = require("../../utils/config/config");
const typeorm_1 = require("typeorm");
exports.dbConfig = {
    type: "postgres",
    host: config_1.Config.get("POSTGRES_HOST"),
    port: config_1.Config.get("POSTGRES_PORT"),
    username: config_1.Config.get("POSTGRES_USER"),
    password: config_1.Config.get("SECRET_POSTGRES_PASS"),
    database: config_1.Config.get("POSTGRES_DB"),
    entities: ["src/libs/db/entities/**/*.ts"],
    migrations: ["src/libs/db/migrations/**/*.ts"],
    ssl: false,
    synchronize: false
};
exports.default = new typeorm_1.DataSource(exports.dbConfig);
//# sourceMappingURL=db.cli.js.map