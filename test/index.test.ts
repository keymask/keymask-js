import { equal } from "node:assert/strict";
import { KeymaskEncoder } from "../src";
import { Generator } from "../src";
import { Keymask } from "../src";

describe("Exports", () => {
  it("should export KeymaskEncoder class", () => {
    equal(typeof KeymaskEncoder, "function");
    equal(typeof new KeymaskEncoder(), "object");
  });

  it("should export Generator class", () => {
    equal(typeof Generator, "function");
    equal(typeof new Generator(), "object");
  });

  it("should export Keymask class", () => {
    equal(typeof Keymask, "function");
    equal(typeof new Keymask(), "object");
  });
});