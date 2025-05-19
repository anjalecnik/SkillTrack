export class AccessTokenDataChangedPayload {
	userId!: number

	constructor(self: AccessTokenDataChangedPayload) {
		this.userId = self.userId
	}
}
