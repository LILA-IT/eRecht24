import { ERecht24 } from ".."
import {
	instanceOfImprint,
	instanceOfPrivacyPolicy,
	instanceOfPrivacyPolicySocialMedia,
} from "../api/generated"

describe("functions", () => {
	let eRecht24: ERecht24
	const apiKey =
		"e81cbf18a5239377aa4972773d34cc2b81ebc672879581bce29a0a4c414bf117"

	beforeAll(() => {
		eRecht24 = new ERecht24(apiKey)
	})

	test("Imprint", async () => {
		const imprint = await eRecht24.Imprint
		expect(imprint).toBeDefined()
		expect(instanceOfImprint(imprint)).toBeTruthy()
	})

	test("Imprint Cached", async () => {
		vi.useFakeTimers()
		const imprint = await eRecht24.Imprint
		expect(imprint).toBeDefined()
		expect(instanceOfImprint(imprint)).toBeTruthy()
		vi.advanceTimersByTime(1000 * 60 * 60 * 1)
		const imprintCached = await eRecht24.Imprint
		expect(imprintCached).toBeDefined()
		expect(instanceOfImprint(imprintCached)).toBeTruthy()
		expect(imprint).toEqual(imprintCached)
		vi.useRealTimers()
	})

	test("PrivacyPolicy", async () => {
		const privacyPolicy = await eRecht24.PrivacyPolicy
		expect(privacyPolicy).toBeDefined()
		expect(instanceOfPrivacyPolicy(privacyPolicy)).toBeTruthy()
	})

	test("PrivacyPolicySocialMedia", async () => {
		const privacyPolicySocialMedia = await eRecht24.PrivacyPolicySocialMedia
		expect(privacyPolicySocialMedia).toBeDefined()
		expect(
			instanceOfPrivacyPolicySocialMedia(privacyPolicySocialMedia),
		).toBeTruthy()
	})

	test("Static - Imprint", async () => {
		const imprint = await ERecht24.getImprint(apiKey)
		expect(imprint).toBeDefined()
		expect(instanceOfImprint(imprint)).toBeTruthy()
	})

	test("Static - PrivacyPolicy", async () => {
		const privacyPolicy = await ERecht24.getPrivacyPolicy(apiKey)
		expect(privacyPolicy).toBeDefined()
		expect(instanceOfPrivacyPolicy(privacyPolicy)).toBeTruthy()
	})

	test("Static - PrivacyPolicySocialMedia", async () => {
		const privacyPolicySocialMedia =
			await ERecht24.getPrivacyPolicySocialMedia(apiKey)
		expect(privacyPolicySocialMedia).toBeDefined()
		expect(
			instanceOfPrivacyPolicySocialMedia(privacyPolicySocialMedia),
		).toBeTruthy()
	})
})
