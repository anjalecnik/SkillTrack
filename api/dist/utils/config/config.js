"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const common_1 = require("@nestjs/common");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const config_default_values_class_1 = require("./classes/config.default-values.class");
const class_validator_1 = require("class-validator");
const IsBooleanString_1 = require("../class-validator/IsBooleanString");
class ConfigClass {
    defaultValues = new config_default_values_class_1.DefaultValues();
    constructor() {
        dotenv.config({ path: path.resolve(process.cwd(), ".env") });
    }
    get(configName) {
        const env = process.env[configName.toString()];
        const defaultValue = this.defaultValues[configName];
        if (env === undefined && defaultValue === undefined) {
            common_1.Logger.error(this.getErrorMessage(configName.toString()));
            throw new common_1.InternalServerErrorException("Invalid enviroment", this.getErrorMessage(configName.toString()));
        }
        if (env !== undefined) {
            return this.parseType(env);
        }
        return this.parseType(defaultValue);
    }
    getErrorMessage(configName) {
        return `${configName} not defined in .env nor in ${config_default_values_class_1.DefaultValues.name}`;
    }
    parseType(env) {
        if ((0, class_validator_1.isBooleanString)(env)) {
            return IsBooleanString_1.booleanMapper.get(env.toLowerCase());
        }
        if (this.isNumeric(env)) {
            return parseFloat(env);
        }
        if (this.isStringArray(env)) {
            return env.split(", ");
        }
        return env;
    }
    isNumeric(num) {
        return (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) && !isNaN(num);
    }
    isStringArray(env) {
        return env.split(", ").length > 1;
    }
}
exports.Config = new ConfigClass();
//# sourceMappingURL=config.js.map