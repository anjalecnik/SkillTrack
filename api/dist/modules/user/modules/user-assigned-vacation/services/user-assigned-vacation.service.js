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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAssignedVacationService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = __importDefault(require("lodash"));
const user_assigned_vacation_repository_1 = require("../repository/user-assigned-vacation.repository");
let UserAssignedVacationService = class UserAssignedVacationService {
    userAssignedVacationRepository;
    constructor(userAssignedVacationRepository) {
        this.userAssignedVacationRepository = userAssignedVacationRepository;
    }
    async validateAssignedVacationRequest(userId, assignedVacations) {
        const existingAssignedVacations = await this.userAssignedVacationRepository.getUserAssignedVacationAll(userId);
        this.validateExistingAssignedVacations(existingAssignedVacations, assignedVacations);
        this.validateNoAssignedVacationDeletion(existingAssignedVacations, assignedVacations);
        this.validateInitialAssignedVacation(assignedVacations);
    }
    async createAssignedVacationForYear(workspaceUserId, year) {
        return this.userAssignedVacationRepository.createAssignedVacationForYear(workspaceUserId, year);
    }
    validateExistingAssignedVacations(existingAssignedVacations, requestedAssignedVacations) {
        const existingAssignedVacationIds = existingAssignedVacations.map(existingAssignedVacation => existingAssignedVacation.id);
        requestedAssignedVacations.forEach(requestedAssignedVacation => {
            if (requestedAssignedVacation.id && !existingAssignedVacationIds.includes(requestedAssignedVacation.id)) {
                throw new common_1.NotFoundException(`Assigned vacation not found.`, `Assigned vacation with ID ${requestedAssignedVacation.id} not found.`);
            }
        });
    }
    validateNoAssignedVacationDeletion(existingAssignedVacations, requestedAssignedVacations) {
        const existingAssignedVacationYears = existingAssignedVacations.map(existingAssignedVacation => existingAssignedVacation.year);
        const requestedAssignedVacationYears = requestedAssignedVacations.map(requestedAssignedVacation => requestedAssignedVacation.year);
        if (!existingAssignedVacationYears.every(existingAssignedVacationYear => requestedAssignedVacationYears.includes(existingAssignedVacationYear))) {
            throw new common_1.BadRequestException("Cannot delete assigned vacation.");
        }
    }
    validateInitialAssignedVacation(requestedAssignedVacations) {
        const initialAssignedVacation = this.validateAndReturnOnlyOneInitialAssignedVacation(requestedAssignedVacations);
        if (!initialAssignedVacation) {
            return;
        }
        this.validateBothInitialPropertiesDefined(initialAssignedVacation);
        this.validateInitialAssignedVacationPrecedesAll(initialAssignedVacation, requestedAssignedVacations);
    }
    validateAndReturnOnlyOneInitialAssignedVacation(requestedAssignedVacations) {
        const initialAssignedVacations = requestedAssignedVacations.filter(requestedAssignedVacation => requestedAssignedVacation.initialUsedDays || requestedAssignedVacation.initialDate);
        if (initialAssignedVacations.length > 1) {
            throw new common_1.BadRequestException("User already has set initial vacation status");
        }
        if (initialAssignedVacations.length === 0) {
            return undefined;
        }
        return initialAssignedVacations.at(0);
    }
    validateBothInitialPropertiesDefined({ initialUsedDays, initialDate }) {
        const bothDefined = initialUsedDays !== undefined && initialDate !== undefined;
        if (!bothDefined) {
            throw new common_1.BadRequestException("Initial vacation setup is not complete");
        }
    }
    validateInitialAssignedVacationPrecedesAll(initialAssignedVacation, requestedAssignedVacations) {
        const assignedVacationSorted = requestedAssignedVacations.sort((a, b) => a.year - b.year);
        if (!lodash_1.default.isEqual(assignedVacationSorted.at(0), initialAssignedVacation)) {
            throw new common_1.BadRequestException("Initial assigned vacation must precede all other assigned vacations.");
        }
    }
};
exports.UserAssignedVacationService = UserAssignedVacationService;
exports.UserAssignedVacationService = UserAssignedVacationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_assigned_vacation_repository_1.UserAssignedVacationRepository])
], UserAssignedVacationService);
//# sourceMappingURL=user-assigned-vacation.service.js.map