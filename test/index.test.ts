import { equal } from "node:assert/strict";
import { Keymask, KeymaskEncoder, KeymaskGenerator } from "../src";

describe("Exports", () => {
  it("should export KeymaskEncoder class", () => {
    equal(typeof KeymaskEncoder, "function");
    equal(typeof new KeymaskEncoder(), "object");
  });

  it("should export KeymaskGenerator class", () => {
    equal(typeof KeymaskGenerator, "function");
    equal(typeof new KeymaskGenerator(), "object");
  });

  it("should export Keymask class", () => {
    equal(typeof Keymask, "function");
    equal(typeof new Keymask(), "object");
  });
});