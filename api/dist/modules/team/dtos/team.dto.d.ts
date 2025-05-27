export declare class TeamDto {
    id: number;
    name: string;
    description: string;
    createdBy: string | null;
    modifiedBy?: string | null;
}
declare const CreateTeamDto_base: import("@nestjs/common").Type<Omit<TeamDto, "id">>;
export declare class CreateTeamDto extends CreateTeamDto_base {
}
declare const UpdateTeamDto_base: import("@nestjs/common").Type<Partial<TeamDto>>;
export declare class UpdateTeamDto extends UpdateTeamDto_base {
}
export {};
