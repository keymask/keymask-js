import { equal } from "node:assert/strict";
import { Base41 } from "../src";
import { Generator } from "../src";
import { Keymask } from "../src";

describe("Exports", () => {
  it("should export Base41 class", () => {
    equal(typeof Base41, "function");
    equal(typeof new Base41(), "object");
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