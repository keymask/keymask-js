import { equal } from "node:assert/strict";
import { KeymaskEncoder } from "../src";

describe("KeymaskEncoder", () => {

  describe("Constructor", () => {
    it("should create an instance", () => {
      const encoder = new KeymaskEncoder();
      equal(typeof encoder, "object");
      equal(typeof encoder.encode, "function");
      equal(typeof encoder.decode, "function");
    });

    it("should pad the seed if less than 24 bytes provided", () => {
      const encoder = new KeymaskEncoder(new Uint8Array([1]));
      equal(encoder.encode(1, 1), "D");
      equal(encoder.encode(40, 1), "B");
      equal(encoder.decode("D"), 1);
      equal(encoder.decode("B"), 40);
    });
  });

  describe("Unseeded", () => {
    const encoder = new KeymaskEncoder();

    it("should handle 1-character encodings", () => {
      equal(encoder.encode(1, 1), "C");
      equal(encoder.encode(1, 2), "CB");
      equal(encoder.encode(40, 1), "z");
      equal(encoder.encode(40, 2), "zB");
      equal(encoder.decode("C"), 1);
      equal(encoder.decode("CB"), 1);
      equal(encoder.decode("z"), 40);
      equal(encoder.decode("zB"), 40);
    });

    it("should handle 2-character encodings", () => {
      equal(encoder.encode(41, 2), "BC");
      equal(encoder.encode(1020, 2), "vf");
      equal(encoder.decode("BC"), 41);
      equal(encoder.decode("vf"), 1020);
    });

    it("should handle 3-character encodings", () => {
      equal(encoder.encode(1021, 3), "wfB");
      equal(encoder.encode(65520, 3), "Dzx");
      equal(encoder.decode("wfB"), 1021);
      equal(encoder.decode("Dzx"), 65520);
    });

    it("should handle 4-character encodings", () => {
      equal(encoder.encode(65521, 4), "FzxB");
      equal(encoder.encode(2097142, 4), "rcWn");
      equal(encoder.decode("FzxB"), 65521);
      equal(encoder.decode("rcWn"), 2097142);
    });

    it("should handle 5-character encodings", () => {
      equal(encoder.encode(2097143, 5), "scWnB");
      equal(encoder.encode(67108858, 5), "Wzknd");
      equal(encoder.decode("scWnB"), 2097143);
      equal(encoder.decode("Wzknd"), 67108858);
    });

    it("should handle 6-character encodings", () => {
      equal(encoder.encode(67108859, 6), "XzkndB");
      equal(encoder.encode(4294967290, 6), "pQNxDw");
      equal(encoder.decode("XzkndB"), 67108859);
      equal(encoder.decode("pQNxDw"), 4294967290);
    });

    it("should handle 7-character encodings", () => {
      equal(encoder.encode(4294967291, 7), "qQNxDwB");
      equal(encoder.encode(137438953446, 7), "NDDtPxk");
      equal(encoder.decode("qQNxDwB"), 4294967291);
      equal(encoder.decode("NDDtPxk"), 137438953446);
    });

    it("should handle 8-character encodings", () => {
      equal(encoder.encode(137438953447, 8), "PDDtPxkB");
      equal(encoder.encode(4398046511092, 8), "rMgSNvdc");
      equal(encoder.decode("PDDtPxkB"), 137438953447);
      equal(encoder.decode("rMgSNvdc"), 4398046511092);
    });

    it("should handle 9-character encodings", () => {
      equal(encoder.encode(4398046511093, 9), "sMgSNvdcB");
      equal(encoder.encode(281474976710596, 9), "qmVrJfPNt");
      equal(encoder.decode("sMgSNvdcB"), 4398046511093);
      equal(encoder.decode("qmVrJfPNt"), 281474976710596);
    });

    it("should handle 10-character encodings", () => {
      equal(encoder.encode(281474976710597, 10), "rmVrJfPNtB");
      equal(encoder.encode(9007199254740880, 10), "FRFFRtCCbj");
      equal(encoder.decode("rmVrJfPNtB"), 281474976710597);
      equal(encoder.decode("FRFFRtCCbj"), 9007199254740880);
    });

    it("should handle 11-character encodings", () => {
      equal(encoder.encode(9007199254740881n, 11), "GRFFRtCCbjB");
      equal(encoder.encode(288230376151711716n, 11), "FRhVLdXrVYb");
      equal(encoder.decode("GRFFRtCCbjB"), 9007199254740881n);
      equal(encoder.decode("FRhVLdXrVYb"), 288230376151711716n);
    });

    it("should handle 12-character encodings", () => {
      equal(encoder.encode(288230376151711717n, 12), "GRhVLdXrVYbB");
      equal(encoder.encode(18446744073709551556n, 12), "xWGzGMzLNQbr");
      equal(encoder.decode("GRhVLdXrVYbB"), 288230376151711717n);
      equal(encoder.decode("xWGzGMzLNQbr"), 18446744073709551556n);
    });
  });

  describe("Seeded", () => {
    const encoder = new KeymaskEncoder(new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8,
      9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24
    ]));

    it("should handle null character encodings", () => {
      equal(encoder.encode(0, 1), "q");
      equal(encoder.decode("q"), 0);
    });

    it("should handle 1-character encodings", () => {
      equal(encoder.encode(1, 1), "d");
      equal(encoder.encode(40, 1), "n");
      equal(encoder.decode("d"), 1);
      equal(encoder.decode("n"), 40);
    });

    it("should handle 2-character encodings", () => {
      equal(encoder.encode(41, 2), "qd");
      equal(encoder.encode(1020, 2), "gr");
      equal(encoder.decode("qd"), 41);
      equal(encoder.decode("gr"), 1020);
    });

    it("should handle 3-character encodings", () => {
      equal(encoder.encode(1021, 3), "Zrq");
      equal(encoder.encode(65520, 3), "ynW");
      equal(encoder.decode("Zrq"), 1021);
      equal(encoder.decode("ynW"), 65520);
    });

    it("should handle 4-character encodings", () => {
      equal(encoder.encode(65521, 4), "SnWq");
      equal(encoder.encode(2097142, 4), "DxwP");
      equal(encoder.decode("SnWq"), 65521);
      equal(encoder.decode("DxwP"), 2097142);
    });

    it("should handle 5-character encodings", () => {
      equal(encoder.encode(2097143, 5), "JxwPq");
      equal(encoder.encode(67108858, 5), "wnRPY");
      equal(encoder.decode("JxwPq"), 2097143);
      equal(encoder.decode("wnRPY"), 67108858);
    });

    it("should handle 6-character encodings", () => {
      equal(encoder.encode(67108859, 6), "snRPYq");
      equal(encoder.encode(4294967290, 6), "HhvWyZ");
      equal(encoder.decode("snRPYq"), 67108859);
      equal(encoder.decode("HhvWyZ"), 4294967290);
    });

    it("should handle 7-character encodings", () => {
      equal(encoder.encode(4294967291, 7), "BhvWyZq");
      equal(encoder.encode(137438953446, 7), "vyytNWR");
      equal(encoder.decode("BhvWyZq"), 4294967291);
      equal(encoder.decode("vyytNWR"), 137438953446);
    });

    it("should handle 8-character encodings", () => {
      equal(encoder.encode(137438953447, 8), "NyytNWRq");
      equal(encoder.encode(4398046511092, 8), "DcCQvgYx");
      equal(encoder.decode("NyytNWRq"), 137438953447);
      equal(encoder.decode("DcCQvgYx"), 4398046511092);
    });

    it("should handle 9-character encodings", () => {
      equal(encoder.encode(4398046511093, 9), "JcCQvgYxq");
      equal(encoder.encode(281474976710596, 9), "BfMDGrNvt");
      equal(encoder.decode("JcCQvgYxq"), 4398046511093);
      equal(encoder.decode("BfMDGrNvt"), 281474976710596);
    });

    it("should handle 10-character encodings", () => {
      equal(encoder.encode(281474976710597, 10), "DfMDGrNvtq");
      equal(encoder.encode(9007199254740880, 10), "SmSSmtddpL");
      equal(encoder.decode("DfMDGrNvtq"), 281474976710597);
      equal(encoder.decode("SmSSmtddpL"), 9007199254740880);
    });

    it("should handle 11-character encodings", () => {
      equal(encoder.encode(9007199254740881n, 11), "zmSSmtddpLq");
      equal(encoder.encode(288230376151711716n, 11), "SmVMXYsDMkp");
      equal(encoder.decode("zmSSmtddpLq"), 9007199254740881n);
      equal(encoder.decode("SmVMXYsDMkp"), 288230376151711716n);
    });

    it("should handle 12-character encodings", () => {
      equal(encoder.encode(288230376151711717n, 12), "zmVMXYsDMkpq");
      equal(encoder.encode(18446744073709551556n, 12), "WwznzcnXvhpD");
      equal(encoder.decode("zmVMXYsDMkpq"), 288230376151711717n);
      equal(encoder.decode("WwznzcnXvhpD"), 18446744073709551556n);
    });
  });
});