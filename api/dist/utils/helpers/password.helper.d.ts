export declare class PasswordHelper {
    static checkPasswordPolicyCompliance(password: string): boolean;
    static hashPassword(password: string): Promise<string>;
    static verifyPassword(password: string, hex: string): Promise<boolean>;
}
