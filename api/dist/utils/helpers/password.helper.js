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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHelper = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const util = __importStar(require("util"));
const HASH_BYTES_LENGTH = 32;
const SALT_BYTES_LENGTH = 16;
const ITERATIONS = 100000;
const randomBytes = util.promisify(crypto.randomBytes);
const pbkdf2 = util.promisify(crypto.pbkdf2);
let PasswordHelper = class PasswordHelper {
    static checkPasswordPolicyCompliance(password) {
        return !!password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:;/<>?~_-])(?=.{10,})"));
    }
    static async hashPassword(password) {
        const salt = await randomBytes(SALT_BYTES_LENGTH);
        const hash = await pbkdf2(password, salt, ITERATIONS, HASH_BYTES_LENGTH, "sha512");
        const combined = Buffer.allocUnsafe(HASH_BYTES_LENGTH + SALT_BYTES_LENGTH + 8);
        combined.writeUInt32BE(salt.length, 0);
        combined.writeUInt32BE(ITERATIONS, 4);
        salt.copy(combined, 8);
        hash.copy(combined, salt.length + 8);
        const hex = combined.toString("hex");
        return hex;
    }
    static async verifyPassword(password, hex) {
        const combined = Buffer.from(hex, "hex");
        const saltBytesLength = combined.readUInt32BE(0);
        const hashBytesLength = combined.length - saltBytesLength - 8;
        const iterations = combined.readUInt32BE(4);
        const salt = combined.subarray(8, saltBytesLength + 8);
        const hash = combined.toString("binary", saltBytesLength + 8);
        const verify = await pbkdf2(password, salt, iterations, hashBytesLength, "sha512");
        return verify.toString("binary") === hash;
    }
};
exports.PasswordHelper = PasswordHelper;
exports.PasswordHelper = PasswordHelper = __decorate([
    (0, common_1.Injectable)()
], PasswordHelper);
//# sourceMappingURL=password.helper.js.map