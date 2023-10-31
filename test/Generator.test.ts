import { equal } from "node:assert/strict";
import { Generator } from "../src/";

describe("Generator", () => {

  describe("Constructor", () => {
    it("should create an instance", () => {
      const generator = new Generator();
      equal(typeof generator, "object");
      equal(typeof generator.next, "function");
      equal(typeof generator.previous, "function");
    });
  });

  describe("No offset", () => {
    const generator = new Generator();

    it("should handle empty inputs", () => {
      equal(generator.next(0, 6), 0);
      equal(generator.next(0n, 12), 0n);
      equal(generator.previous(0, 3), 0);
      equal(generator.previous(0n, 11), 0n);
    });

    it("should handle unexpected bigint inputs", () => {
      equal(generator.next(1n, 1), 22);
      equal(generator.previous(22n, 1), 1);
    });

    it("should compute values in mode 1", () => {
      const next1 = generator.next(1, 1);
      const next2 = generator.next(next1, 1);
      const next3 = generator.next(next2, 1);
      const prev3 = generator.previous(next3, 1);
      const prev2 = generator.previous(prev3, 1);
      const prev1 = generator.previous(prev2, 1);
      equal(next1, 22);
      equal(next2, 33);
      equal(next3, 29);
      equal(prev3, 33);
      equal(prev2, 22);
      equal(prev1, 1);
    });

    it("should compute values in mode 2", () => {
      const next1 = generator.next(1, 2);
      const next2 = generator.next(next1, 2);
      const next3 = generator.next(next2, 2);
      const prev3 = generator.previous(next3, 2);
      const prev2 = generator.previous(prev3, 2);
      const prev1 = generator.previous(prev2, 2);
      equal(next1, 331);
      equal(next2, 314);
      equal(next3, 813);
      equal(prev3, 314);
      equal(prev2, 331);
      equal(prev1, 1);
    });

    it("should compute values in mode 3", () => {
      const next1 = generator.next(1, 3);
      const next2 = generator.next(next1, 3);
      const next3 = generator.next(next2, 3);
      const prev3 = generator.previous(next3, 3);
      const prev2 = generator.previous(prev3, 3);
      const prev1 = generator.previous(prev2, 3);
      equal(next1, 17364);
      equal(next2, 46375);
      equal(next3, 2410);
      equal(prev3, 46375);
      equal(prev2, 17364);
      equal(prev1, 1);
    });

    it("should compute values in mode 4", () => {
      const next1 = generator.next(1, 4);
      const next2 = generator.next(next1, 4);
      const next3 = generator.next(next2, 4);
      const prev3 = generator.previous(next3, 4);
      const prev2 = generator.previous(prev3, 4);
      const prev1 = generator.previous(prev2, 4);
      equal(next1, 1043187);
      equal(next2, 157124);
      equal(next3, 1211594);
      equal(prev3, 157124);
      equal(prev2, 1043187);
      equal(prev1, 1);
    });

    it("should compute values in mode 5", () => {
      const next1 = generator.next(1, 5);
      const next2 = generator.next(next1, 5);
      const next3 = generator.next(next2, 5);
      const prev3 = generator.previous(next3, 5);
      const prev2 = generator.previous(prev3, 5);
      const prev1 = generator.previous(prev2, 5);
      equal(next1, 19552116);
      equal(next2, 27437110);
      equal(next3, 35418881);
      equal(prev3, 27437110);
      equal(prev2, 19552116);
      equal(prev1, 1);
    });

    it("should compute values in mode 6", () => {
      const next1 = generator.next(1, 6);
      const next2 = generator.next(next1, 6);
      const next3 = generator.next(next2, 6);
      const prev3 = generator.previous(next3, 6);
      const prev2 = generator.previous(prev3, 6);
      const prev1 = generator.previous(prev2, 6);
      equal(next1, 1588635695);
      equal(next2, 3795633075);
      equal(next3, 1359842614);
      equal(prev3, 3795633075);
      equal(prev2, 1588635695);
      equal(prev1, 1);
    });

    it("should compute values in mode 7", () => {
      const next1 = generator.next(1, 7);
      const next2 = generator.next(next1, 7);
      const next3 = generator.next(next2, 7);
      const prev3 = generator.previous(next3, 7);
      const prev2 = generator.previous(prev3, 7);
      const prev1 = generator.previous(prev2, 7);
      equal(next1, 31450092817);
      equal(next2, 119916686274);
      equal(next3, 5334770625);
      equal(prev3, 119916686274);
      equal(prev2, 31450092817);
      equal(prev1, 1);
    });

    it("should compute values in mode 8", () => {
      const next1 = generator.next(1, 8);
      const next2 = generator.next(next1, 8);
      const next3 = generator.next(next2, 8);
      const prev3 = generator.previous(next3, 8);
      const prev2 = generator.previous(prev3, 8);
      const prev1 = generator.previous(prev2, 8);
      equal(next1, 2928603677866);
      equal(next2, 2628492684710);
      equal(next3, 546270961298);
      equal(prev3, 2628492684710);
      equal(prev2, 2928603677866);
      equal(prev1, 1);
    });

    it("should compute values in mode 9", () => {
      const next1 = generator.next(1, 9);
      const next2 = generator.next(next1, 9);
      const next3 = generator.next(next2, 9);
      const prev3 = generator.previous(next3, 9);
      const prev2 = generator.previous(prev3, 9);
      const prev1 = generator.previous(prev2, 9);
      equal(next1, 59279420901007);
      equal(next2, 255661096628044);
      equal(next3, 117419072028985);
      equal(prev3, 255661096628044);
      equal(prev2, 59279420901007);
      equal(prev1, 1);
    });

    it("should compute values in mode 10", () => {
      const next1 = generator.next(1, 10);
      const next2 = generator.next(next1, 10);
      const next3 = generator.next(next2, 10);
      const prev3 = generator.previous(next3, 10);
      const prev2 = generator.previous(prev3, 10);
      const prev1 = generator.previous(prev2, 10);
      equal(next1, 2082839274626558);
      equal(next2, 1578394110522701);
      equal(next3, 3466089578483917);
      equal(prev3, 1578394110522701);
      equal(prev2, 2082839274626558);
      equal(prev1, 1);
    });

    it("should compute values in mode 11", () => {
      const next1 = generator.next(1n, 11);
      const next2 = generator.next(next1, 11);
      const next3 = generator.next(next2, 11);
      const prev3 = generator.previous(next3, 11);
      const prev2 = generator.previous(prev3, 11);
      const prev1 = generator.previous(prev2, 11);
      equal(next1, 56502943171806276n);
      equal(next2, 43489901156567661n);
      equal(next3, 61732157524018942n);
      equal(prev3, 43489901156567661n);
      equal(prev2, 56502943171806276n);
      equal(prev1, 1n);
    });

    it("should compute values in mode 12", () => {
      const next1 = generator.next(1n, 12);
      const next2 = generator.next(next1, 12);
      const next3 = generator.next(next2, 12);
      const prev3 = generator.previous(next3, 12);
      const prev2 = generator.previous(prev3, 12);
      const prev1 = generator.previous(prev2, 12);
      equal(next1, 9044836419713972268n);
      equal(next2, 17873101000765772758n);
      equal(next3, 2109684930356029100n);
      equal(prev3, 17873101000765772758n);
      equal(prev2, 9044836419713972268n);
      equal(prev1, 1n);
    });
  });

  describe("With offsets", () => {
    const generator = new Generator(new Uint8Array([
      55, 98, 111, 81, 13, 119, 31, 74
    ]));

    it("should handle empty inputs", () => {
      equal(generator.next(0, 6), 0);
      equal(generator.next(0n, 12), 0n);
      equal(generator.previous(0, 3), 0);
      equal(generator.previous(0n, 11), 0n);
    });

    it("should handle unexpected bigint inputs", () => {
      equal(generator.next(1n, 1), 37);
      equal(generator.previous(37n, 1), 1);
    });

    it("should compute values in mode 1", () => {
      const next1 = generator.next(1, 1);
      const next2 = generator.next(next1, 1);
      const next3 = generator.next(next2, 1);
      const prev3 = generator.previous(next3, 1);
      const prev2 = generator.previous(prev3, 1);
      const prev1 = generator.previous(prev2, 1);
      equal(next1, 37);
      equal(next2, 10);
      equal(next3, 30);
      equal(prev3, 10);
      equal(prev2, 37);
      equal(prev1, 1);
    });

    it("should compute values in mode 2", () => {
      const next1 = generator.next(1, 2);
      const next2 = generator.next(next1, 2);
      const next3 = generator.next(next2, 2);
      const prev3 = generator.previous(next3, 2);
      const prev2 = generator.previous(prev3, 2);
      const prev1 = generator.previous(prev2, 2);
      equal(next1, 166);
      equal(next2, 668);
      equal(next3, 407);
      equal(prev3, 668);
      equal(prev2, 166);
      equal(prev1, 1);
    });

    it("should compute values in mode 3", () => {
      const next1 = generator.next(1, 3);
      const next2 = generator.next(next1, 3);
      const next3 = generator.next(next2, 3);
      const prev3 = generator.previous(next3, 3);
      const prev2 = generator.previous(prev3, 3);
      const prev1 = generator.previous(prev2, 3);
      equal(next1, 48459);
      equal(next2, 52489);
      equal(next3, 52981);
      equal(prev3, 52489);
      equal(prev2, 48459);
      equal(prev1, 1);
    });

    it("should compute values in mode 4", () => {
      const next1 = generator.next(1, 4);
      const next2 = generator.next(next1, 4);
      const next3 = generator.next(next2, 4);
      const prev3 = generator.previous(next3, 4);
      const prev2 = generator.previous(prev3, 4);
      const prev1 = generator.previous(prev2, 4);
      equal(next1, 2057880);
      equal(next2, 1663445);
      equal(next3, 44273);
      equal(prev3, 1663445);
      equal(prev2, 2057880);
      equal(prev1, 1);
    });

    it("should compute values in mode 5", () => {
      const next1 = generator.next(1, 5);
      const next2 = generator.next(next1, 5);
      const next3 = generator.next(next2, 5);
      const prev3 = generator.previous(next3, 5);
      const prev2 = generator.previous(prev3, 5);
      const prev1 = generator.previous(prev2, 5);
      equal(next1, 43629091);
      equal(next2, 31550254);
      equal(next3, 21619603);
      equal(prev3, 31550254);
      equal(prev2, 43629091);
      equal(prev1, 1);
    });

    it("should compute values in mode 6", () => {
      const next1 = generator.next(1, 6);
      const next2 = generator.next(next1, 6);
      const next3 = generator.next(next2, 6);
      const prev3 = generator.previous(next3, 6);
      const prev2 = generator.previous(prev3, 6);
      const prev1 = generator.previous(prev2, 6);
      equal(next1, 1826411712);
      equal(next2, 2208974623);
      equal(next3, 871136173);
      equal(prev3, 2208974623);
      equal(prev2, 1826411712);
      equal(prev1, 1);
    });

    it("should compute values in mode 7", () => {
      const next1 = generator.next(1, 7);
      const next2 = generator.next(next1, 7);
      const next3 = generator.next(next2, 7);
      const prev3 = generator.previous(next3, 7);
      const prev2 = generator.previous(prev3, 7);
      const prev1 = generator.previous(prev2, 7);
      equal(next1, 89661327352);
      equal(next2, 149007832);
      equal(next3, 58441160161);
      equal(prev3, 149007832);
      equal(prev2, 89661327352);
      equal(prev1, 1);
    });

    it("should compute values in mode 8", () => {
      const next1 = generator.next(1, 8);
      const next2 = generator.next(next1, 8);
      const next3 = generator.next(next2, 8);
      const prev3 = generator.previous(next3, 8);
      const prev2 = generator.previous(prev3, 8);
      const prev1 = generator.previous(prev2, 8);
      equal(next1, 1886307452233);
      equal(next2, 4203936482779);
      equal(next3, 3489399761707);
      equal(prev3, 4203936482779);
      equal(prev2, 1886307452233);
      equal(prev1, 1);
    });

    it("should compute values in mode 9", () => {
      const next1 = generator.next(1, 9);
      const next2 = generator.next(next1, 9);
      const next3 = generator.next(next2, 9);
      const prev3 = generator.previous(next3, 9);
      const prev2 = generator.previous(prev3, 9);
      const prev1 = generator.previous(prev2, 9);
      equal(next1, 190178506573834);
      equal(next2, 235552632839220);
      equal(next3, 100134805760093);
      equal(prev3, 235552632839220);
      equal(prev2, 190178506573834);
      equal(prev1, 1);
    });

    it("should compute values in mode 10", () => {
      const next1 = generator.next(1, 10);
      const next2 = generator.next(next1, 10);
      const next3 = generator.next(next2, 10);
      const prev3 = generator.previous(next3, 10);
      const prev2 = generator.previous(prev3, 10);
      const prev1 = generator.previous(prev2, 10);
      equal(next1, 1932263382516645);
      equal(next2, 1240521594739027);
      equal(next3, 584894572121632);
      equal(prev3, 1240521594739027);
      equal(prev2, 1932263382516645);
      equal(prev1, 1);
    });

    it("should compute values in mode 11", () => {
      const next1 = generator.next(1n, 11);
      const next2 = generator.next(next1, 11);
      const next3 = generator.next(next2, 11);
      const prev3 = generator.previous(next3, 11);
      const prev2 = generator.previous(prev3, 11);
      const prev1 = generator.previous(prev2, 11);
      equal(next1, 209474754610227315n);
      equal(next2, 43479088202405475n);
      equal(next3, 61071716383584770n);
      equal(prev3, 43479088202405475n);
      equal(prev2, 209474754610227315n);
      equal(prev1, 1n);
    });

    it("should compute values in mode 12", () => {
      const next1 = generator.next(1n, 12);
      const next2 = generator.next(next1, 12);
      const next3 = generator.next(next2, 12);
      const prev3 = generator.previous(next3, 12);
      const prev2 = generator.previous(prev3, 12);
      const prev1 = generator.previous(prev2, 12);
      equal(next1, 14385955001883204195n);
      equal(next2, 10091079920073714907n);
      equal(next3, 14289084463478828271n);
      equal(prev3, 10091079920073714907n);
      equal(prev2, 14385955001883204195n);
      equal(prev1, 1n);
    });
  });
});