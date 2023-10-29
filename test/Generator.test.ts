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
      equal(generator.next(1n, 1), 26);
      equal(generator.previous(26n, 1), 1);
    });

    it("should compute values in mode 1", () => {
      const next1 = generator.next(26, 1);
      const next2 = generator.next(next1, 1);
      const next3 = generator.next(next2, 1);
      const prev3 = generator.previous(next3, 1);
      const prev2 = generator.previous(prev3, 1);
      const prev1 = generator.previous(prev2, 1);
      equal(next1, 20);
      equal(next2, 28);
      equal(next3, 31);
      equal(prev3, 28);
      equal(prev2, 20);
      equal(prev1, 26);
    });

    it("should compute values in mode 2", () => {
      const next1 = generator.next(331, 2);
      const next2 = generator.next(next1, 2);
      const next3 = generator.next(next2, 2);
      const prev3 = generator.previous(next3, 2);
      const prev2 = generator.previous(prev3, 2);
      const prev1 = generator.previous(prev2, 2);
      equal(next1, 314);
      equal(next2, 813);
      equal(next3, 580);
      equal(prev3, 813);
      equal(prev2, 314);
      equal(prev1, 331);
    });

    it("should compute values in mode 3", () => {
      const next1 = generator.next(2469, 3);
      const next2 = generator.next(next1, 3);
      const next3 = generator.next(next2, 3);
      const prev3 = generator.previous(next3, 3);
      const prev2 = generator.previous(prev3, 3);
      const prev1 = generator.previous(prev2, 3);
      equal(next1, 2508);
      equal(next2, 33278);
      equal(next3, 48);
      equal(prev3, 33278);
      equal(prev2, 2508);
      equal(prev1, 2469);
    });

    it("should compute values in mode 4", () => {
      const next1 = generator.next(1939807, 4);
      const next2 = generator.next(next1, 4);
      const next3 = generator.next(next2, 4);
      const prev3 = generator.previous(next3, 4);
      const prev2 = generator.previous(prev3, 4);
      const prev1 = generator.previous(prev2, 4);
      equal(next1, 2038067);
      equal(next2, 243760);
      equal(next3, 327824);
      equal(prev3, 243760);
      equal(prev2, 2038067);
      equal(prev1, 1939807);
    });

    it("should compute values in mode 5", () => {
      const next1 = generator.next(6763103, 5);
      const next2 = generator.next(next1, 5);
      const next3 = generator.next(next2, 5);
      const prev3 = generator.previous(next3, 5);
      const prev2 = generator.previous(prev3, 5);
      const prev1 = generator.previous(prev2, 5);
      equal(next1, 42942261);
      equal(next2, 18741982);
      equal(next3, 16879267);
      equal(prev3, 18741982);
      equal(prev2, 42942261);
      equal(prev1, 6763103);
    });

    it("should compute values in mode 6", () => {
      const next1 = generator.next(279470273, 6);
      const next2 = generator.next(next1, 6);
      const next3 = generator.next(next2, 6);
      const prev3 = generator.previous(next3, 6);
      const prev2 = generator.previous(prev3, 6);
      const prev1 = generator.previous(prev2, 6);
      equal(next1, 1196210100);
      equal(next2, 1795977874);
      equal(next3, 3523022591);
      equal(prev3, 1795977874);
      equal(prev2, 1196210100);
      equal(prev1, 279470273);
    });

    it("should compute values in mode 7", () => {
      const next1 = generator.next(85876534675, 7);
      const next2 = generator.next(next1, 7);
      const next3 = generator.next(next2, 7);
      const prev3 = generator.previous(next3, 7);
      const prev2 = generator.previous(prev3, 7);
      const prev1 = generator.previous(prev2, 7);
      equal(next1, 79174808892);
      equal(next2, 46809886702);
      equal(next3, 32500470108);
      equal(prev3, 46809886702);
      equal(prev2, 79174808892);
      equal(prev1, 85876534675);
    });

    it("should compute values in mode 8", () => {
      const next1 = generator.next(92644101553, 8);
      const next2 = generator.next(next1, 8);
      const next3 = generator.next(next2, 8);
      const prev3 = generator.previous(next3, 8);
      const prev2 = generator.previous(prev3, 8);
      const prev1 = generator.previous(prev2, 8);
      equal(next1, 1941162895675);
      equal(next2, 1983942437116);
      equal(next3, 779351132030);
      equal(prev3, 1983942437116);
      equal(prev2, 1941162895675);
      equal(prev1, 92644101553);
    });

    it("should compute values in mode 9", () => {
      const next1 = generator.next(59279420901007, 9);
      const next2 = generator.next(next1, 9);
      const next3 = generator.next(next2, 9);
      const prev3 = generator.previous(next3, 9);
      const prev2 = generator.previous(prev3, 9);
      const prev1 = generator.previous(prev2, 9);
      equal(next1, 255661096628044);
      equal(next2, 117419072028985);
      equal(next3, 115388539590118);
      equal(prev3, 117419072028985);
      equal(prev2, 255661096628044);
      equal(prev1, 59279420901007);
    });

    it("should compute values in mode 10", () => {
      const next1 = generator.next(5667072534355537, 10);
      const next2 = generator.next(next1, 10);
      const next3 = generator.next(next2, 10);
      const prev3 = generator.previous(next3, 10);
      const prev2 = generator.previous(prev3, 10);
      const prev1 = generator.previous(prev2, 10);
      equal(next1, 928173953693534);
      equal(next2, 4186320372898579);
      equal(next3, 3747542636729177);
      equal(prev3, 4186320372898579);
      equal(prev2, 928173953693534);
      equal(prev1, 5667072534355537);
    });

    it("should compute values in mode 11", () => {
      const next1 = generator.next(28146528635210647n, 11);
      const next2 = generator.next(next1, 11);
      const next3 = generator.next(next2, 11);
      const prev3 = generator.previous(next3, 11);
      const prev2 = generator.previous(prev3, 11);
      const prev1 = generator.previous(prev2, 11);
      equal(next1, 61878748459752977n);
      equal(next2, 72037069290323023n);
      equal(next3, 40886811617192014n);
      equal(prev3, 72037069290323023n);
      equal(prev2, 61878748459752977n);
      equal(prev1, 28146528635210647n);
    });

    it("should compute values in mode 12", () => {
      const next1 = generator.next(811465980874026894n, 12);
      const next2 = generator.next(next1, 12);
      const next3 = generator.next(next2, 12);
      const prev3 = generator.previous(next3, 12);
      const prev2 = generator.previous(prev3, 12);
      const prev1 = generator.previous(prev2, 12);
      equal(next1, 13512599034472289930n);
      equal(next2, 8801096262735257704n);
      equal(next3, 2283309942659066867n);
      equal(prev3, 8801096262735257704n);
      equal(prev2, 13512599034472289930n);
      equal(prev1, 811465980874026894n);
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
      equal(generator.next(26n, 1), 35);
      equal(generator.previous(35n, 1), 26);
    });

    it("should compute values in mode 1", () => {
      const next1 = generator.next(26, 1);
      const next2 = generator.next(next1, 1);
      const next3 = generator.next(next2, 1);
      const prev3 = generator.previous(next3, 1);
      const prev2 = generator.previous(prev3, 1);
      const prev1 = generator.previous(prev2, 1);
      equal(next1, 35);
      equal(next2, 23);
      equal(next3, 39);
      equal(prev3, 23);
      equal(prev2, 35);
      equal(prev1, 26);
    });

    it("should compute values in mode 2", () => {
      const next1 = generator.next(331, 2);
      const next2 = generator.next(next1, 2);
      const next3 = generator.next(next2, 2);
      const prev3 = generator.previous(next3, 2);
      const prev2 = generator.previous(prev3, 2);
      const prev1 = generator.previous(prev2, 2);
      equal(next1, 149);
      equal(next2, 146);
      equal(next3, 174);
      equal(prev3, 146);
      equal(prev2, 149);
      equal(prev1, 331);
    });

    it("should compute values in mode 3", () => {
      const next1 = generator.next(2469, 3);
      const next2 = generator.next(next1, 3);
      const next3 = generator.next(next2, 3);
      const prev3 = generator.previous(next3, 3);
      const prev2 = generator.previous(prev3, 3);
      const prev1 = generator.previous(prev2, 3);
      equal(next1, 33603);
      equal(next2, 47316);
      equal(next3, 30357);
      equal(prev3, 47316);
      equal(prev2, 33603);
      equal(prev1, 2469);
    });

    it("should compute values in mode 4", () => {
      const next1 = generator.next(1939807, 4);
      const next2 = generator.next(next1, 4);
      const next3 = generator.next(next2, 4);
      const prev3 = generator.previous(next3, 4);
      const prev2 = generator.previous(prev3, 4);
      const prev1 = generator.previous(prev2, 4);
      equal(next1, 955618);
      equal(next2, 471288);
      equal(next3, 1228119);
      equal(prev3, 471288);
      equal(prev2, 955618);
      equal(prev1, 1939807);
    });

    it("should compute values in mode 5", () => {
      const next1 = generator.next(6763103, 5);
      const next2 = generator.next(next1, 5);
      const next3 = generator.next(next2, 5);
      const prev3 = generator.previous(next3, 5);
      const prev2 = generator.previous(prev3, 5);
      const prev1 = generator.previous(prev2, 5);
      equal(next1, 67019236);
      equal(next2, 21711295);
      equal(next3, 21429604);
      equal(prev3, 21711295);
      equal(prev2, 67019236);
      equal(prev1, 6763103);
    });

    it("should compute values in mode 6", () => {
      const next1 = generator.next(279470273, 6);
      const next2 = generator.next(next1, 6);
      const next3 = generator.next(next2, 6);
      const prev3 = generator.previous(next3, 6);
      const prev2 = generator.previous(prev3, 6);
      const prev1 = generator.previous(prev2, 6);
      equal(next1, 1433986117);
      equal(next2, 218169887);
      equal(next3, 2504882809);
      equal(prev3, 218169887);
      equal(prev2, 1433986117);
      equal(prev1, 279470273);
    });

    it("should compute values in mode 7", () => {
      const next1 = generator.next(85876534675, 7);
      const next2 = generator.next(next1, 7);
      const next3 = generator.next(next2, 7);
      const prev3 = generator.previous(next3, 7);
      const prev2 = generator.previous(prev3, 7);
      const prev1 = generator.previous(prev2, 7);
      equal(next1, 137386043427);
      equal(next2, 80643995542);
      equal(next3, 124755258917);
      equal(prev3, 80643995542);
      equal(prev2, 137386043427);
      equal(prev1, 85876534675);
    });

    it("should compute values in mode 8", () => {
      const next1 = generator.next(92644101553, 8);
      const next2 = generator.next(next1, 8);
      const next3 = generator.next(next2, 8);
      const prev3 = generator.previous(next3, 8);
      const prev2 = generator.previous(prev3, 8);
      const prev1 = generator.previous(prev2, 8);
      equal(next1, 898866670042);
      equal(next2, 2052434658302);
      equal(next3, 922756391464);
      equal(prev3, 2052434658302);
      equal(prev2, 898866670042);
      equal(prev1, 92644101553);
    });

    it("should compute values in mode 9", () => {
      const next1 = generator.next(59279420901007, 9);
      const next2 = generator.next(next1, 9);
      const next3 = generator.next(next2, 9);
      const prev3 = generator.previous(next3, 9);
      const prev2 = generator.previous(prev3, 9);
      const prev1 = generator.previous(prev2, 9);
      equal(next1, 105085205590275);
      equal(next2, 156590029141168);
      equal(next3, 72290393238673);
      equal(prev3, 156590029141168);
      equal(prev2, 105085205590275);
      equal(prev1, 59279420901007);
    });

    it("should compute values in mode 10", () => {
      const next1 = generator.next(5667072534355537, 10);
      const next2 = generator.next(next1, 10);
      const next3 = generator.next(next2, 10);
      const prev3 = generator.previous(next3, 10);
      const prev2 = generator.previous(prev3, 10);
      const prev1 = generator.previous(prev2, 10);
      equal(next1, 777598061583621);
      equal(next2, 3424566155680008);
      equal(next3, 2542043635291673);
      equal(prev3, 3424566155680008);
      equal(prev2, 777598061583621);
      equal(prev1, 5667072534355537);
    });

    it("should compute values in mode 11", () => {
      const next1 = generator.next(28146528635210647n, 11);
      const next2 = generator.next(next1, 11);
      const next3 = generator.next(next2, 11);
      const prev3 = generator.previous(next3, 11);
      const prev2 = generator.previous(prev3, 11);
      const prev1 = generator.previous(prev2, 11);
      equal(next1, 214850559898174016n);
      equal(next2, 37158537206858347n);
      equal(next3, 250538900641187869n);
      equal(prev3, 37158537206858347n);
      equal(prev2, 214850559898174016n);
      equal(prev1, 28146528635210647n);
    });

    it("should compute values in mode 12", () => {
      const next1 = generator.next(811465980874026894n, 12);
      const next2 = generator.next(next1, 12);
      const next3 = generator.next(next2, 12);
      const prev3 = generator.previous(next3, 12);
      const prev2 = generator.previous(prev3, 12);
      const prev1 = generator.previous(prev2, 12);
      equal(next1, 406973542931970301n);
      equal(next2, 12852000776397265805n);
      equal(next3, 12502035333985116704n);
      equal(prev3, 12852000776397265805n);
      equal(prev2, 406973542931970301n);
      equal(prev1, 811465980874026894n);
    });
  });
});