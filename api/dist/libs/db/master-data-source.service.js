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
exports.MasterDataSource = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let MasterDataSource = class MasterDataSource {
    _dataSource;
    constructor(dataSource) {
        this._dataSource = dataSource;
    }
    get dataSource() {
        return this._dataSource;
    }
    get manager() {
        return this._dataSource.manager;
    }
    async queryOnMaster(runOnMaster) {
        const queryRunner = this._dataSource.createQueryRunner("master");
        const entityManager = this._dataSource.createEntityManager(queryRunner);
        try {
            await queryRunner.connect();
            return await runOnMaster(entityManager);
        }
        finally {
            await queryRunner.release();
            await entityManager.release();
        }
    }
};
exports.MasterDataSource = MasterDataSource;
exports.MasterDataSource = MasterDataSource = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], MasterDataSource);
//# sourceMappingURL=master-data-source.service.js.map