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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressService = void 0;
const common_1 = require("@nestjs/common");
const user_address_repository_1 = require("../repository/user-address.repository");
const address_helper_1 = require("../../../../../utils/helpers/address.helper");
let UserAddressService = class UserAddressService {
    userAddressRepository;
    constructor(userAddressRepository) {
        this.userAddressRepository = userAddressRepository;
    }
    async validateAddressRequest(userId, addresses) {
        const existingAddresses = await this.userAddressRepository.getUserAddressAll(userId);
        address_helper_1.AddressHelper.validateAddressRequest(existingAddresses, addresses);
    }
};
exports.UserAddressService = UserAddressService;
exports.UserAddressService = UserAddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_address_repository_1.UserAddressRepository])
], UserAddressService);
//# sourceMappingURL=user-address.service.js.map