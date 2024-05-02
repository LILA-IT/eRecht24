import {
	Model401,
	Model404Imprint,
	Model404PrivacyPolicy,
	Model404PrivacyPolicySocialMedia,
	Model503,
} from "./api/generated"

export enum ERecht24ResponseState {
	HTTP401 = 401,
	HTTP404 = 404,
	HTTP503 = 503,
}

export class ERecht24ResponseError extends Error {
	constructor(
		public state: ERecht24ResponseState,
		public data: object,
	) {
		super()
	}
}

export type ERecht24Unsuccessful =
	| Model401
	| Model404Imprint
	| Model404PrivacyPolicy
	| Model404PrivacyPolicySocialMedia
	| Model503
