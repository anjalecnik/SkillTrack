import { Injectable } from "@nestjs/common"
import * as crypto from "crypto"
import * as util from "util"

const HASH_BYTES_LENGTH = 32
const SALT_BYTES_LENGTH = 16
const ITERATIONS = 100000

const randomBytes = util.promisify(crypto.randomBytes)
const pbkdf2 = util.promisify(crypto.pbkdf2)

@Injectable()
export class PasswordHelper {
	static checkPasswordPolicyCompliance(password: string): boolean {
		return !!password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:;/<>?~_-])(?=.{10,})"))
	}

	static async hashPassword(password: string): Promise<string> {
		const salt = await randomBytes(SALT_BYTES_LENGTH)
		const hash = await pbkdf2(password, salt, ITERATIONS, HASH_BYTES_LENGTH, "sha512")

		const combined = Buffer.allocUnsafe(HASH_BYTES_LENGTH + SALT_BYTES_LENGTH + 8)
		combined.writeUInt32BE(salt.length, 0)
		combined.writeUInt32BE(ITERATIONS, 4)

		salt.copy(combined, 8)
		hash.copy(combined, salt.length + 8)

		const hex = combined.toString("hex")
		return hex
	}

	static async verifyPassword(password: string, hex: string): Promise<boolean> {
		const combined = Buffer.from(hex, "hex")
		// extract the salt and hash from the combined buffer
		const saltBytesLength = combined.readUInt32BE(0)
		const hashBytesLength = combined.length - saltBytesLength - 8
		const iterations = combined.readUInt32BE(4)
		const salt = combined.subarray(8, saltBytesLength + 8)
		const hash = combined.toString("binary", saltBytesLength + 8)

		const verify = await pbkdf2(password, salt, iterations, hashBytesLength, "sha512")
		return verify.toString("binary") === hash
	}
}
