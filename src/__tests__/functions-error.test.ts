import { ERecht24, ERecht24ResponseError, ERecht24ResponseState } from ".."
import {
	instanceOfModel401,
	instanceOfModel404Imprint,
	instanceOfModel404PrivacyPolicy,
	instanceOfModel404PrivacyPolicySocialMedia,
	instanceOfModel503,
} from "../api/generated"
import { mocked401 } from "../mocks/401"
import { mocked404Imprint, mocked404PrivacyPolicy } from "../mocks/404"
import { mocked503 } from "../mocks/503"

describe("functions - error case", () => {
	let eRecht24: ERecht24

	beforeAll(() => {
		eRecht24 = new ERecht24(
			"e81cbf18a5239377aa4972773d34cc2b81ebc672879581bce29a0a4c414bf117",
		)
	})

	beforeEach(() => {
		fetchMock.doMock()
	})

	test("401", () => {
		fetchMock.mockResponseOnce(JSON.stringify(mocked401), {
			status: 401,
			headers: {
				"Content-Type": "application/json",
			},
		})
		eRecht24.Imprint.catch((error: ERecht24ResponseError) => {
			expect(error).toBeInstanceOf(ERecht24ResponseError)
			expect(error.state).toBe(ERecht24ResponseState.HTTP401)
			expect(error.data).toBeDefined()
			expect(instanceOfModel401(error.data)).toBeTruthy()
		})
	})

	test("Imprint - 404", () => {
		fetchMock.mockResponseOnce(JSON.stringify(mocked404Imprint), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		})
		eRecht24.Imprint.catch((error: ERecht24ResponseError) => {
			expect(error).toBeInstanceOf(ERecht24ResponseError)
			expect(error.state).toBe(ERecht24ResponseState.HTTP404)
			expect(error.data).toBeDefined()
			expect(instanceOfModel404Imprint(error.data)).toBeTruthy()
		})
	})

	test("PrivacyPolicy - 404", () => {
		fetchMock.mockResponseOnce(JSON.stringify(mocked404PrivacyPolicy), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		})
		eRecht24.PrivacyPolicy.catch((error: ERecht24ResponseError) => {
			expect(error).toBeInstanceOf(ERecht24ResponseError)
			expect(error.state).toBe(ERecht24ResponseState.HTTP404)
			expect(error.data).toBeDefined()
			expect(instanceOfModel404PrivacyPolicy(error.data)).toBeTruthy()
		})
	})

	test("PrivacyPolicySocialMedia - 404", () => {
		fetchMock.mockResponseOnce(JSON.stringify(mocked404PrivacyPolicy), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		})
		eRecht24.PrivacyPolicySocialMedia.catch((error: ERecht24ResponseError) => {
			expect(error).toBeInstanceOf(ERecht24ResponseError)
			expect(error.state).toBe(ERecht24ResponseState.HTTP404)
			expect(error.data).toBeDefined()
			expect(
				instanceOfModel404PrivacyPolicySocialMedia(error.data),
			).toBeTruthy()
		})
	})

	test("503", () => {
		fetchMock.mockResponseOnce(JSON.stringify(mocked503), {
			status: 503,
			headers: {
				"Content-Type": "application/json",
			},
		})
		eRecht24.Imprint.catch((error: ERecht24ResponseError) => {
			expect(error).toBeInstanceOf(ERecht24ResponseError)
			expect(error.state).toBe(ERecht24ResponseState.HTTP503)
			expect(error.data).toBeDefined()
			expect(instanceOfModel503(error.data)).toBeTruthy()
		})
	})

	test("different http error", () => {
		fetchMock.mockResponseOnce(JSON.stringify({}), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		})
		eRecht24.Imprint.catch((error: ERecht24ResponseError) => {
			expect(error).toBeInstanceOf(ERecht24ResponseError)
			expect(error.state).toBe(500)
			expect(error.data).toBeDefined()
		})
	})

	test("network error", async () => {
		fetchMock.mockReject(new Error())
		await expect(eRecht24.Imprint).rejects.toThrow(
			"The request failed and the interceptors did not return an alternative response",
		)
	})
})
