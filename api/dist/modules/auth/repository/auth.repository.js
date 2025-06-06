"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../libs/db/entities/user.entity");
const user_status_enum_1 = require("../../../utils/types/enums/user-status.enum");
let AuthRepository = class AuthRepository {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user ?? undefined;
    }
    async getUserById(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        return user ?? undefined;
    }
    async getOrCreateUserByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user)
            return user;
        return this.userRepository.save({ email, status: user_status_enum_1.UserStatus.Active });
    }
    async createUser(localSignup) {
        return this.userRepository.save(localSignup);
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map