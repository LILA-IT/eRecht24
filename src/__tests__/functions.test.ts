import { ERecht24 } from ".."
import {
	instanceOfImprint,
	instanceOfPrivacyPolicy,
	instanceOfPrivacyPolicySocialMedia,
} from "../api/generated"

describe("functions", () => {
	let eRecht24: ERecht24

	beforeAll(() => {
		eRecht24 = new ERecht24(
			"e81cbf18a5239377aa4972773d34cc2b81ebc672879581bce29a0a4c414bf117",
		)
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
})
