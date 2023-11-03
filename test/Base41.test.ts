import { equal } from "node:assert/strict";
import { Base41 } from "../src/";

describe("Base41", () => {

  describe("Constructor", () => {
    it("should create an instance", () => {
      const base41 = new Base41();
      equal(typeof base41, "object");
      equal(typeof base41.encode, "function");
      equal(typeof base41.decode, "function");
    });

    it("should pad the seed if less than 24 bytes provided", () => {
      const base41 = new Base41(new Uint8Array([1]));
      equal(base41.encode(1, 1), "D");
      equal(base41.encode(40, 1), "B");
      equal(base41.decode("D"), 1);
      equal(base41.decode("B"), 40);
    });
  });

  describe("Unseeded", () => {
    const base41 = new Base41();

    it("should handle 1-character encodings", () => {
      equal(base41.encode(1, 1), "C");
      equal(base41.encode(1, 2), "CB");
      equal(base41.encode(40, 1), "z");
      equal(base41.encode(40, 2), "zB");
      equal(base41.decode("C"), 1);
      equal(base41.decode("CB"), 1);
      equal(base41.decode("z"), 40);
      equal(base41.decode("zB"), 40);
    });

    it("should handle 2-character encodings", () => {
      equal(base41.encode(41, 2), "BC");
      equal(base41.encode(1020, 2), "vf");
      equal(base41.decode("BC"), 41);
      equal(base41.decode("vf"), 1020);
    });

    it("should handle 3-character encodings", () => {
      equal(base41.encode(1021, 3), "wfB");
      equal(base41.encode(65520, 3), "Dzx");
      equal(base41.decode("wfB"), 1021);
      equal(base41.decode("Dzx"), 65520);
    });

    it("should handle 4-character encodings", () => {
      equal(base41.encode(65521, 4), "FzxB");
      equal(base41.encode(2097142, 4), "rcWn");
      equal(base41.decode("FzxB"), 65521);
      equal(base41.decode("rcWn"), 2097142);
    });

    it("should handle 5-character encodings", () => {
      equal(base41.encode(2097143, 5), "scWnB");
      equal(base41.encode(67108858, 5), "Wzknd");
      equal(base41.decode("scWnB"), 2097143);
      equal(base41.decode("Wzknd"), 67108858);
    });

    it("should handle 6-character encodings", () => {
      equal(base41.encode(67108859, 6), "XzkndB");
      equal(base41.encode(4294967290, 6), "pQNxDw");
      equal(base41.decode("XzkndB"), 67108859);
      equal(base41.decode("pQNxDw"), 4294967290);
    });

    it("should handle 7-character encodings", () => {
      equal(base41.encode(4294967291, 7), "qQNxDwB");
      equal(base41.encode(137438953446, 7), "NDDtPxk");
      equal(base41.decode("qQNxDwB"), 4294967291);
      equal(base41.decode("NDDtPxk"), 137438953446);
    });

    it("should handle 8-character encodings", () => {
      equal(base41.encode(137438953447, 8), "PDDtPxkB");
      equal(base41.encode(4398046511092, 8), "rMgSNvdc");
      equal(base41.decode("PDDtPxkB"), 137438953447);
      equal(base41.decode("rMgSNvdc"), 4398046511092);
    });

    it("should handle 9-character encodings", () => {
      equal(base41.encode(4398046511093, 9), "sMgSNvdcB");
      equal(base41.encode(281474976710596, 9), "qmVrJfPNt");
      equal(base41.decode("sMgSNvdcB"), 4398046511093);
      equal(base41.decode("qmVrJfPNt"), 281474976710596);
    });

    it("should handle 10-character encodings", () => {
      equal(base41.encode(281474976710597, 10), "rmVrJfPNtB");
      equal(base41.encode(9007199254740880, 10), "FRFFRtCCbj");
      equal(base41.decode("rmVrJfPNtB"), 281474976710597);
      equal(base41.decode("FRFFRtCCbj"), 9007199254740880);
    });

    it("should handle 11-character encodings", () => {
      equal(base41.encode(9007199254740881n, 11), "GRFFRtCCbjB");
      equal(base41.encode(288230376151711716n, 11), "FRhVLdXrVYb");
      equal(base41.decode("GRFFRtCCbjB"), 9007199254740881n);
      equal(base41.decode("FRhVLdXrVYb"), 288230376151711716n);
    });

    it("should handle 12-character encodings", () => {
      equal(base41.encode(288230376151711717n, 12), "GRhVLdXrVYbB");
      equal(base41.encode(18446744073709551556n, 12), "xWGzGMzLNQbr");
      equal(base41.decode("GRhVLdXrVYbB"), 288230376151711717n);
      equal(base41.decode("xWGzGMzLNQbr"), 18446744073709551556n);
    });
  });

  describe("Seeded", () => {
    const base41 = new Base41(new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8,
      9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24
    ]));

    it("should handle null character encodings", () => {
      equal(base41.encode(0, 1), "q");
      equal(base41.decode("q"), 0);
    });

    it("should handle 1-character encodings", () => {
      equal(base41.encode(1, 1), "d");
      equal(base41.encode(40, 1), "n");
      equal(base41.decode("d"), 1);
      equal(base41.decode("n"), 40);
    });

    it("should handle 2-character encodings", () => {
      equal(base41.encode(41, 2), "qd");
      equal(base41.encode(1020, 2), "gr");
      equal(base41.decode("qd"), 41);
      equal(base41.decode("gr"), 1020);
    });

    it("should handle 3-character encodings", () => {
      equal(base41.encode(1021, 3), "Zrq");
      equal(base41.encode(65520, 3), "ynW");
      equal(base41.decode("Zrq"), 1021);
      equal(base41.decode("ynW"), 65520);
    });

    it("should handle 4-character encodings", () => {
      equal(base41.encode(65521, 4), "SnWq");
      equal(base41.encode(2097142, 4), "DxwP");
      equal(base41.decode("SnWq"), 65521);
      equal(base41.decode("DxwP"), 2097142);
    });

    it("should handle 5-character encodings", () => {
      equal(base41.encode(2097143, 5), "JxwPq");
      equal(base41.encode(67108858, 5), "wnRPY");
      equal(base41.decode("JxwPq"), 2097143);
      equal(base41.decode("wnRPY"), 67108858);
    });

    it("should handle 6-character encodings", () => {
      equal(base41.encode(67108859, 6), "snRPYq");
      equal(base41.encode(4294967290, 6), "HhvWyZ");
      equal(base41.decode("snRPYq"), 67108859);
      equal(base41.decode("HhvWyZ"), 4294967290);
    });

    it("should handle 7-character encodings", () => {
      equal(base41.encode(4294967291, 7), "BhvWyZq");
      equal(base41.encode(137438953446, 7), "vyytNWR");
      equal(base41.decode("BhvWyZq"), 4294967291);
      equal(base41.decode("vyytNWR"), 137438953446);
    });

    it("should handle 8-character encodings", () => {
      equal(base41.encode(137438953447, 8), "NyytNWRq");
      equal(base41.encode(4398046511092, 8), "DcCQvgYx");
      equal(base41.decode("NyytNWRq"), 137438953447);
      equal(base41.decode("DcCQvgYx"), 4398046511092);
    });

    it("should handle 9-character encodings", () => {
      equal(base41.encode(4398046511093, 9), "JcCQvgYxq");
      equal(base41.encode(281474976710596, 9), "BfMDGrNvt");
      equal(base41.decode("JcCQvgYxq"), 4398046511093);
      equal(base41.decode("BfMDGrNvt"), 281474976710596);
    });

    it("should handle 10-character encodings", () => {
      equal(base41.encode(281474976710597, 10), "DfMDGrNvtq");
      equal(base41.encode(9007199254740880, 10), "SmSSmtddpL");
      equal(base41.decode("DfMDGrNvtq"), 281474976710597);
      equal(base41.decode("SmSSmtddpL"), 9007199254740880);
    });

    it("should handle 11-character encodings", () => {
      equal(base41.encode(9007199254740881n, 11), "zmSSmtddpLq");
      equal(base41.encode(288230376151711716n, 11), "SmVMXYsDMkp");
      equal(base41.decode("zmSSmtddpLq"), 9007199254740881n);
      equal(base41.decode("SmVMXYsDMkp"), 288230376151711716n);
    });

    it("should handle 12-character encodings", () => {
      equal(base41.encode(288230376151711717n, 12), "zmVMXYsDMkpq");
      equal(base41.encode(18446744073709551556n, 12), "WwznzcnXvhpD");
      equal(base41.decode("zmVMXYsDMkpq"), 288230376151711717n);
      equal(base41.decode("WwznzcnXvhpD"), 18446744073709551556n);
    });
  });
});