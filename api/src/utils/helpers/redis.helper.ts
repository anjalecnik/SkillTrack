export abstract class RedisHelper {
	static ONE_DAY_MILLISECONDS = 86_400_000

	/**
	 * @param ttlInMs ttl in ms
	 * @returns redis object for setting ttl in seconds
	 */
	static setTTL(ttlInMs: number): number {
		// This is required because redis / cache manager has a bug when setting value and ttl
		return { ttl: ttlInMs / 1000 } as unknown as number
	}
}
