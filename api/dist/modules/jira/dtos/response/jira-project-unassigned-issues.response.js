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
exports.JiraProjectUnassignedIssuesResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class JiraProjectUnassignedIssuesResponse {
    key;
    summary;
}
exports.JiraProjectUnassignedIssuesResponse = JiraProjectUnassignedIssuesResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "ST" }),
    __metadata("design:type", String)
], JiraProjectUnassignedIssuesResponse.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Add endpoint for fetching users" }),
    __metadata("design:type", String)
], JiraProjectUnassignedIssuesResponse.prototype, "summary", void 0);
//# sourceMappingURL=jira-project-unassigned-issues.response.js.map