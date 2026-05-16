import { escapeHTML } from "..";
import { describe, expect, it } from "vitest";

describe("escapeHTML", () => {
	it("экранирует &, <, >", () => {
		expect(escapeHTML("Tom & Jerry")).toBe("Tom &amp; Jerry");
		expect(escapeHTML("<script>")).toBe("&lt;script&gt;");
	});

	it("не трогает обычный текст", () => {
		expect(escapeHTML("Hello world")).toBe("Hello world");
	});

	it("обрабатывает пустую строку", () => {
		expect(escapeHTML("")).toBe("");
	});
});
