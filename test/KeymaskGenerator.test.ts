import { equal } from "node:assert/strict";
import { KeymaskGenerator } from "../src";

describe("KeymaskGenerator", () => {

  describe("Constructor", () => {
    it("should create an instance", () => {
      const generator = new KeymaskGenerator();
      equal(typeof generator, "object");
      equal(typeof generator.next, "function");
      equal(typeof generator.previous, "function");
    });
  });

  describe("No offset", () => {
    const generator = new KeymaskGenerator();

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
      equal(next1, 65);
      equal(next2, 141);
      equal(next3, 997);
      equal(prev3, 141);
      equal(prev2, 65);
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

  describe("No offset, safe mode", () => {
    const generator = new KeymaskGenerator(void 0, true);

    it("should handle empty inputs", () => {
      equal(generator.next(0, 6), 0);
      equal(generator.next(0n, 13), 0n);
      equal(generator.previous(0, 3), 0);
      equal(generator.previous(0n, 12), 0n);
    });

    it("should handle unexpected bigint inputs", () => {
      equal(generator.next(1n, 1), 7);
      equal(generator.previous(7n, 1), 1);
    });

    it("should compute values in mode 1", () => {
      const next1 = generator.next(1, 1);
      const next2 = generator.next(next1, 1);
      const next3 = generator.next(next2, 1);
      const prev3 = generator.previous(next3, 1);
      const prev2 = generator.previous(prev3, 1);
      const prev1 = generator.previous(prev2, 1);
      equal(next1, 7);
      equal(next2, 3);
      equal(next3, 21);
      equal(prev3, 3);
      equal(prev2, 7);
      equal(prev1, 1);
    });

    it("should compute values in mode 2", () => {
      const next1 = generator.next(1, 2);
      const next2 = generator.next(next1, 2);
      const next3 = generator.next(next2, 2);
      const prev3 = generator.previous(next3, 2);
      const prev2 = generator.previous(prev3, 2);
      const prev1 = generator.previous(prev2, 2);
      equal(next1, 110);
      equal(next2, 393);
      equal(next3, 474);
      equal(prev3, 393);
      equal(prev2, 110);
      equal(prev1, 1);
    });

    it("should compute values in mode 3", () => {
      const next1 = generator.next(1, 3);
      const next2 = generator.next(next1, 3);
      const next3 = generator.next(next2, 3);
      const prev3 = generator.previous(next3, 3);
      const prev2 = generator.previous(prev3, 3);
      const prev1 = generator.previous(prev2, 3);
      equal(next1, 1716);
      equal(next2, 4087);
      equal(next3, 1796);
      equal(prev3, 4087);
      equal(prev2, 1716);
      equal(prev1, 1);
    });

    it("should compute values in mode 4", () => {
      const next1 = generator.next(1, 4);
      const next2 = generator.next(next1, 4);
      const next3 = generator.next(next2, 4);
      const prev3 = generator.previous(next3, 4);
      const prev2 = generator.previous(prev3, 4);
      const prev1 = generator.previous(prev2, 4);
      equal(next1, 92717);
      equal(next2, 117862);
      equal(next3, 22561);
      equal(prev3, 117862);
      equal(prev2, 92717);
      equal(prev1, 1);
    });

    it("should compute values in mode 5", () => {
      const next1 = generator.next(1, 5);
      const next2 = generator.next(next1, 5);
      const next3 = generator.next(next2, 5);
      const prev3 = generator.previous(next3, 5);
      const prev2 = generator.previous(prev3, 5);
      const prev1 = generator.previous(prev2, 5);
      equal(next1, 1731287);
      equal(next2, 2324244);
      equal(next3, 734347);
      equal(prev3, 2324244);
      equal(prev2, 1731287);
      equal(prev1, 1);
    });

    it("should compute values in mode 6", () => {
      const next1 = generator.next(1, 6);
      const next2 = generator.next(next1, 6);
      const next3 = generator.next(next2, 6);
      const prev3 = generator.previous(next3, 6);
      const prev2 = generator.previous(prev3, 6);
      const prev1 = generator.previous(prev2, 6);
      equal(next1, 45576512);
      equal(next2, 127107601);
      equal(next3, 29785520);
      equal(prev3, 127107601);
      equal(prev2, 45576512);
      equal(prev1, 1);
    });

    it("should compute values in mode 7", () => {
      const next1 = generator.next(1, 7);
      const next2 = generator.next(next1, 7);
      const next3 = generator.next(next2, 7);
      const prev3 = generator.previous(next3, 7);
      const prev2 = generator.previous(prev3, 7);
      const prev1 = generator.previous(prev2, 7);
      equal(next1, 1588635695);
      equal(next2, 3795633075);
      equal(next3, 1359842614);
      equal(prev3, 3795633075);
      equal(prev2, 1588635695);
      equal(prev1, 1);
    });

    it("should compute values in mode 8", () => {
      const next1 = generator.next(1, 8);
      const next2 = generator.next(next1, 8);
      const next3 = generator.next(next2, 8);
      const prev3 = generator.previous(next3, 8);
      const prev2 = generator.previous(prev3, 8);
      const prev1 = generator.previous(prev2, 8);
      equal(next1, 40162435147);
      equal(next2, 6434331558);
      equal(next3, 34088349488);
      equal(prev3, 6434331558);
      equal(prev2, 40162435147);
      equal(prev1, 1);
    });

    it("should compute values in mode 9", () => {
      const next1 = generator.next(1, 9);
      const next2 = generator.next(next1, 9);
      const next3 = generator.next(next2, 9);
      const prev3 = generator.previous(next3, 9);
      const prev2 = generator.previous(prev3, 9);
      const prev1 = generator.previous(prev2, 9);
      equal(next1, 717943173063);
      equal(next2, 215767240487);
      equal(next3, 1006265014734);
      equal(prev3, 215767240487);
      equal(prev2, 717943173063);
      equal(prev1, 1);
    });

    it("should compute values in mode 10", () => {
      const next1 = generator.next(1, 10);
      const next2 = generator.next(next1, 10);
      const next3 = generator.next(next2, 10);
      const prev3 = generator.previous(next3, 10);
      const prev2 = generator.previous(prev3, 10);
      const prev1 = generator.previous(prev2, 10);
      equal(next1, 11850386302026);
      equal(next2, 26888292506525);
      equal(next3, 4129700370630);
      equal(prev3, 26888292506525);
      equal(prev2, 11850386302026);
      equal(prev1, 1);
    });

    it("should compute values in mode 11", () => {
      const next1 = generator.next(1, 11);
      const next2 = generator.next(next1, 11);
      const next3 = generator.next(next2, 11);
      const prev3 = generator.previous(next3, 11);
      const prev2 = generator.previous(prev3, 11);
      const prev1 = generator.previous(prev2, 11);
      equal(next1, 605985299432352);
      equal(next2, 277998636065574);
      equal(next3, 307477457863406);
      equal(prev3, 277998636065574);
      equal(prev2, 605985299432352);
      equal(prev1, 1);
    });

    it("should compute values in mode 12", () => {
      const next1 = generator.next(1n, 12);
      const next2 = generator.next(next1, 12);
      const next3 = generator.next(next2, 12);
      const prev3 = generator.previous(next3, 12);
      const prev2 = generator.previous(prev3, 12);
      const prev1 = generator.previous(prev2, 12);
      equal(next1, 19708881949174686n);
      equal(next2, 19671333105867716n);
      equal(next3, 9303007882087066n);
      equal(prev3, 19671333105867716n);
      equal(prev2, 19708881949174686n);
      equal(prev1, 1n);
    });

    it("should compute values in mode 13", () => {
      const next1 = generator.next(1n, 13);
      const next2 = generator.next(next1, 13);
      const next3 = generator.next(next2, 13);
      const prev3 = generator.previous(next3, 13);
      const prev2 = generator.previous(prev3, 13);
      const prev1 = generator.previous(prev2, 13);
      equal(next1, 287514719519235431n);
      equal(next2, 386640941313532123n);
      equal(next3, 308504311051725166n);
      equal(prev3, 386640941313532123n);
      equal(prev2, 287514719519235431n);
      equal(prev1, 1n);
    });

    it("should compute values in mode 14", () => {
      const next1 = generator.next(1n, 14);
      const next2 = generator.next(next1, 14);
      const next3 = generator.next(next2, 14);
      const prev3 = generator.previous(next3, 14);
      const prev2 = generator.previous(prev3, 14);
      const prev1 = generator.previous(prev2, 14);
      equal(next1, 9044836419713972268n);
      equal(next2, 17873101000765772758n);
      equal(next3, 2109684930356029100n);
      equal(prev3, 17873101000765772758n);
      equal(prev2, 9044836419713972268n);
      equal(prev1, 1n);
    });
  });

  describe("With offsets", () => {
    const generator = new KeymaskGenerator(new Uint8Array([
      55, 98, 111, 81, 13, 119, 31, 74
    ]).buffer);

    it("should handle empty inputs", () => {
      equal(generator.next(0, 6), 0);
      equal(generator.next(0n, 12), 0n);
      equal(generator.previous(0, 3), 0);
      equal(generator.previous(0n, 11), 0n);
    });

    it("should handle unexpected bigint inputs", () => {
      equal(generator.next(1n, 1), 40);
      equal(generator.previous(40n, 1), 1);
    });

    it("should compute values in mode 1", () => {
      const next1 = generator.next(1, 1);
      const next2 = generator.next(next1, 1);
      const next3 = generator.next(next2, 1);
      const prev3 = generator.previous(next3, 1);
      const prev2 = generator.previous(prev3, 1);
      const prev1 = generator.previous(prev2, 1);
      equal(next1, 40);
      equal(next2, 37);
      equal(next3, 13);
      equal(prev3, 37);
      equal(prev2, 40);
      equal(prev1, 1);
    });

    it("should compute values in mode 2", () => {
      const next1 = generator.next(1, 2);
      const next2 = generator.next(next1, 2);
      const next3 = generator.next(next2, 2);
      const prev3 = generator.previous(next3, 2);
      const prev2 = generator.previous(prev3, 2);
      const prev1 = generator.previous(prev2, 2);
      equal(next1, 283);
      equal(next2, 235);
      equal(next3, 179);
      equal(prev3, 235);
      equal(prev2, 283);
      equal(prev1, 1);
    });

    it("should compute values in mode 3", () => {
      const next1 = generator.next(1, 3);
      const next2 = generator.next(next1, 3);
      const next3 = generator.next(next2, 3);
      const prev3 = generator.previous(next3, 3);
      const prev2 = generator.previous(prev3, 3);
      const prev1 = generator.previous(prev2, 3);
      equal(next1, 4142);
      equal(next2, 31929);
      equal(next3, 28753);
      equal(prev3, 31929);
      equal(prev2, 4142);
      equal(prev1, 1);
    });

    it("should compute values in mode 4", () => {
      const next1 = generator.next(1, 4);
      const next2 = generator.next(next1, 4);
      const next3 = generator.next(next2, 4);
      const prev3 = generator.previous(next3, 4);
      const prev2 = generator.previous(prev3, 4);
      const prev1 = generator.previous(prev2, 4);
      equal(next1, 2245);
      equal(next2, 502285);
      equal(next3, 768517);
      equal(prev3, 502285);
      equal(prev2, 2245);
      equal(prev1, 1);
    });

    it("should compute values in mode 5", () => {
      const next1 = generator.next(1, 5);
      const next2 = generator.next(next1, 5);
      const next3 = generator.next(next2, 5);
      const prev3 = generator.previous(next3, 5);
      const prev2 = generator.previous(prev3, 5);
      const prev1 = generator.previous(prev2, 5);
      equal(next1, 10120408);
      equal(next2, 12043413);
      equal(next3, 16875499);
      equal(prev3, 12043413);
      equal(prev2, 10120408);
      equal(prev1, 1);
    });

    it("should compute values in mode 6", () => {
      const next1 = generator.next(1, 6);
      const next2 = generator.next(next1, 6);
      const next3 = generator.next(next2, 6);
      const prev3 = generator.previous(next3, 6);
      const prev2 = generator.previous(prev3, 6);
      const prev1 = generator.previous(prev2, 6);
      equal(next1, 2048965993);
      equal(next2, 2882355448);
      equal(next3, 1358781941);
      equal(prev3, 2882355448);
      equal(prev2, 2048965993);
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

  describe("With offsets, safe mode", () => {
    const generator = new KeymaskGenerator(new Uint8Array([
      55, 98, 111, 81, 13, 119, 31, 74
    ]).buffer, true);

    it("should handle empty inputs", () => {
      equal(generator.next(0, 6), 0);
      equal(generator.next(0n, 13), 0n);
      equal(generator.previous(0, 3), 0);
      equal(generator.previous(0n, 12), 0n);
    });

    it("should handle unexpected bigint inputs", () => {
      equal(generator.next(1n, 1), 17);
      equal(generator.previous(17n, 1), 1);
    });

    it("should compute values in mode 1", () => {
      const next1 = generator.next(1, 1);
      const next2 = generator.next(next1, 1);
      const next3 = generator.next(next2, 1);
      const prev3 = generator.previous(next3, 1);
      const prev2 = generator.previous(prev3, 1);
      const prev1 = generator.previous(prev2, 1);
      equal(next1, 17);
      equal(next2, 14);
      equal(next3, 16);
      equal(prev3, 14);
      equal(prev2, 17);
      equal(prev1, 1);
    });

    it("should compute values in mode 2", () => {
      const next1 = generator.next(1, 2);
      const next2 = generator.next(next1, 2);
      const next3 = generator.next(next2, 2);
      const prev3 = generator.previous(next3, 2);
      const prev2 = generator.previous(prev3, 2);
      const prev1 = generator.previous(prev2, 2);
      equal(next1, 112);
      equal(next2, 106);
      equal(next3, 464);
      equal(prev3, 106);
      equal(prev2, 112);
      equal(prev1, 1);
    });

    it("should compute values in mode 3", () => {
      const next1 = generator.next(1, 3);
      const next2 = generator.next(next1, 3);
      const next3 = generator.next(next2, 3);
      const prev3 = generator.previous(next3, 3);
      const prev2 = generator.previous(prev3, 3);
      const prev1 = generator.previous(prev2, 3);
      equal(next1, 4874);
      equal(next2, 3931);
      equal(next3, 7561);
      equal(prev3, 3931);
      equal(prev2, 4874);
      equal(prev1, 1);
    });

    it("should compute values in mode 4", () => {
      const next1 = generator.next(1, 4);
      const next2 = generator.next(next1, 4);
      const next3 = generator.next(next2, 4);
      const prev3 = generator.previous(next3, 4);
      const prev2 = generator.previous(prev3, 4);
      const prev1 = generator.previous(prev2, 4);
      equal(next1, 108687);
      equal(next2, 1112);
      equal(next3, 96647);
      equal(prev3, 1112);
      equal(prev2, 108687);
      equal(prev1, 1);
    });

    it("should compute values in mode 5", () => {
      const next1 = generator.next(1, 5);
      const next2 = generator.next(next1, 5);
      const next3 = generator.next(next2, 5);
      const prev3 = generator.previous(next3, 5);
      const prev2 = generator.previous(prev3, 5);
      const prev1 = generator.previous(prev2, 5);
      equal(next1, 688585);
      equal(next2, 3625865);
      equal(next3, 2915301);
      equal(prev3, 3625865);
      equal(prev2, 688585);
      equal(prev1, 1);
    });

    it("should compute values in mode 6", () => {
      const next1 = generator.next(1, 6);
      const next2 = generator.next(next1, 6);
      const next3 = generator.next(next2, 6);
      const prev3 = generator.previous(next3, 6);
      const prev2 = generator.previous(prev3, 6);
      const prev1 = generator.previous(prev2, 6);
      equal(next1, 103253746);
      equal(next2, 73518693);
      equal(next3, 104442888);
      equal(prev3, 73518693);
      equal(prev2, 103253746);
      equal(prev1, 1);
    });

    it("should compute values in mode 7", () => {
      const next1 = generator.next(1, 7);
      const next2 = generator.next(next1, 7);
      const next3 = generator.next(next2, 7);
      const prev3 = generator.previous(next3, 7);
      const prev2 = generator.previous(prev3, 7);
      const prev1 = generator.previous(prev2, 7);
      equal(next1, 2048965993);
      equal(next2, 2882355448);
      equal(next3, 1358781941);
      equal(prev3, 2882355448);
      equal(prev2, 2048965993);
      equal(prev1, 1);
    });

    it("should compute values in mode 8", () => {
      const next1 = generator.next(1, 8);
      const next2 = generator.next(next1, 8);
      const next3 = generator.next(next2, 8);
      const prev3 = generator.previous(next3, 8);
      const prev2 = generator.previous(prev3, 8);
      const prev1 = generator.previous(prev2, 8);
      equal(next1, 29110128424);
      equal(next2, 1183414022);
      equal(next3, 1639275494);
      equal(prev3, 1183414022);
      equal(prev2, 29110128424);
      equal(prev1, 1);
    });

    it("should compute values in mode 9", () => {
      const next1 = generator.next(1, 9);
      const next2 = generator.next(next1, 9);
      const next3 = generator.next(next2, 9);
      const prev3 = generator.previous(next3, 9);
      const prev2 = generator.previous(prev3, 9);
      const prev1 = generator.previous(prev2, 9);
      equal(next1, 1874709064720);
      equal(next2, 1085017648074);
      equal(next3, 768581879344);
      equal(prev3, 1085017648074);
      equal(prev2, 1874709064720);
      equal(prev1, 1);
    });

    it("should compute values in mode 10", () => {
      const next1 = generator.next(1, 10);
      const next2 = generator.next(next1, 10);
      const next3 = generator.next(next2, 10);
      const prev3 = generator.previous(next3, 10);
      const prev2 = generator.previous(prev3, 10);
      const prev1 = generator.previous(prev2, 10);
      equal(next1, 2011990982049);
      equal(next2, 15001030797763);
      equal(next3, 10816797220892);
      equal(prev3, 15001030797763);
      equal(prev2, 2011990982049);
      equal(prev1, 1);
    });

    it("should compute values in mode 11", () => {
      const next1 = generator.next(1, 11);
      const next2 = generator.next(next1, 11);
      const next3 = generator.next(next2, 11);
      const prev3 = generator.previous(next3, 11);
      const prev2 = generator.previous(prev3, 11);
      const prev1 = generator.previous(prev2, 11);
      equal(next1, 455409407388855);
      equal(next2, 1125415030257687);
      equal(next3, 501822946954661);
      equal(prev3, 1125415030257687);
      equal(prev2, 455409407388855);
      equal(prev1, 1);
    });

    it("should compute values in mode 12", () => {
      const next1 = generator.next(1n, 12);
      const next2 = generator.next(next1, 12);
      const next3 = generator.next(next2, 12);
      const prev3 = generator.previous(next3, 12);
      const prev2 = generator.previous(prev3, 12);
      const prev1 = generator.previous(prev2, 12);
      equal(next1, 28565505311747637n);
      equal(next2, 29473870147412094n);
      equal(next3, 5738407593423799n);
      equal(prev3, 29473870147412094n);
      equal(prev2, 28565505311747637n);
      equal(prev1, 1n);
    });

    it("should compute values in mode 13", () => {
      const next1 = generator.next(1n, 13);
      const next2 = generator.next(next1, 13);
      const next3 = generator.next(next2, 13);
      const prev3 = generator.previous(next3, 13);
      const prev2 = generator.previous(prev3, 13);
      const prev1 = generator.previous(prev2, 13);
      equal(next1, 440486530957656470n);
      equal(next2, 146641254034747117n);
      equal(next3, 235389632144868738n);
      equal(prev3, 146641254034747117n);
      equal(prev2, 440486530957656470n);
      equal(prev1, 1n);
    });

    it("should compute values in mode 14", () => {
      const next1 = generator.next(1n, 14);
      const next2 = generator.next(next1, 14);
      const next3 = generator.next(next2, 14);
      const prev3 = generator.previous(next3, 14);
      const prev2 = generator.previous(prev3, 14);
      const prev1 = generator.previous(prev2, 14);
      equal(next1, 14385955001883204195n);
      equal(next2, 10091079920073714907n);
      equal(next3, 14289084463478828271n);
      equal(prev3, 10091079920073714907n);
      equal(prev2, 14385955001883204195n);
      equal(prev1, 1n);
    });
  });

  describe("Positive offsets", () => {
    const generator = new KeymaskGenerator(new Uint8Array([
      77, 158, 218, 19, 241, 33, 41, 218
    ]).buffer);

    it("should not produce negative offsets", () => {
      equal(generator.next(3n, 6, true), 3859134542n);
    });
  });
});