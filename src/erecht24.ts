import { isBrowser } from "browser-or-node"
import { LRUCache } from "lru-cache"

import {
	Configuration,
	instanceOfImprint,
	instanceOfPrivacyPolicy,
	instanceOfPrivacyPolicySocialMedia,
	LegalDocumentsApi,
	ResponseError,
} from "./api/generated"
import { ERecht24ResponseError } from "./types"

export class ERecht24 {
	private api: LegalDocumentsApi
	private cache: LRUCache<string, object>

	constructor(apiKey: string, ttl: number = 1000 * 60 * 60 * 2) {
		const apiConfig: Configuration = new Configuration({
			apiKey: (name) => {
				if (name === "eRecht24-plugin-key") {
					return (
						process.env.ERECHT24_PLUGIN_KEY ??
						// This is the testing plugin key from the eRecht24 API documentation
						"3jh4uhn8u69i97kj9timk466748996ikhkjhlk67plli08lhkijgh8z4363gr53v"
					)
				} else {
					return apiKey
				}
			},
		})
		this.api = new LegalDocumentsApi(apiConfig)
		this.cache = new LRUCache({ ttl, ttlAutopurge: !isBrowser })
	}

	private handleApiResponse<T extends () => Promise<object>>(
		apiFunction: T,
	): Promise<Awaited<ReturnType<T>>> {
		return apiFunction()
			.then((response) => response as Awaited<ReturnType<T>>)
			.catch(async (error) => {
				if (error instanceof ResponseError) {
					const response = error.response
					const status = response.status
					const data: object = (await response.json()) as object
					throw new ERecht24ResponseError(status, data)
				}
				throw error
			})
	}

	private async getCachedResponse<T extends () => Promise<object>>(
		apiFunction: T,
		key: string,
		instanceOf: (data: object) => boolean,
	): Promise<Awaited<ReturnType<T>>> {
		if (!isBrowser) {
			const cachedResponse = this.cache.get(key)
			if (cachedResponse && instanceOf(cachedResponse))
				return cachedResponse as Awaited<ReturnType<T>>
		}
		const response = await this.handleApiResponse(apiFunction)
		if (!isBrowser) this.cache.set(key, response)
		return response
	}

	public get Imprint() {
		return this.getCachedResponse(
			this.api.imprintGet.bind(this.api),
			"imprint",
			instanceOfImprint,
		)
	}

	public get PrivacyPolicy() {
		return this.getCachedResponse(
			this.api.privacyPolicyGet.bind(this.api),
			"privacyPolicy",
			instanceOfPrivacyPolicy,
		)
	}

	public get PrivacyPolicySocialMedia() {
		return this.getCachedResponse(
			this.api.privacyPolicySocialMediaGet.bind(this.api),
			"privacyPolicySocialMedia",
			instanceOfPrivacyPolicySocialMedia,
		)
	}

	static getImprint(apiKey: string) {
		return new ERecht24(apiKey).Imprint
	}

	static getPrivacyPolicy(apiKey: string) {
		return new ERecht24(apiKey).PrivacyPolicy
	}

	static getPrivacyPolicySocialMedia(apiKey: string) {
		return new ERecht24(apiKey).PrivacyPolicySocialMedia
	}
}
