/// <reference types="vitest" />

import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		globals: true,
		setupFiles: ["./src/__tests__/setupVitest.ts"],
		exclude: ["node_modules", "build", "coverage", "src/api", "lib", "*.d.ts"],
		reporters: "vitest-sonar-reporter",
		outputFile: "sonar-report.xml",
		coverage: {
			reporter: ["cobertura", "html-spa", "text", "lcov"],
			exclude: [
				"node_modules",
				"build",
				"coverage",
				"src/api",
				"lib",
				"*.d.ts",
			],
		},
	},
})
