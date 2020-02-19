import {matchesRegex} from "../filters";

describe("matchesRegex", () => {
    let filter: RegExp | undefined;

    describe("without a filter", () => {
        beforeAll(() => filter = undefined);

        it("returns true", () => expect(matchesRegex("value", filter)).toBe(true));
    });

    describe("with a matching filter", () => {
        beforeAll(() => filter = new RegExp("v.*"));

        it("returns true", () => expect(matchesRegex("value", filter)).toBe(true));
    });

    describe("with a non-matching filter", () => {
        beforeAll(() => filter = new RegExp("x.*"));

        it("returns false", () => expect(matchesRegex("value", filter)).toBe(false));
    });
});
