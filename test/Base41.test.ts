import { equal, deepEqual } from "node:assert/strict";
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

    describe("Single value", () => {
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
        equal(base41.encode(9007199254740881, 11), "GRFFRtCCbjB");
        equal(base41.encode(288230376151711716n, 11), "FRhVLdXrVYb");
        equal(base41.decode("GRFFRtCCbjB"), 9007199254740881);
        equal(base41.decode("FRhVLdXrVYb"), 288230376151711716n);
      });

      it("should handle 12-character encodings", () => {
        equal(base41.encode(288230376151711717n, 12), "GRhVLdXrVYbB");
        equal(base41.encode(18446744073709551556n, 12), "xWGzGMzLNQbr");
        equal(base41.decode("GRhVLdXrVYbB"), 288230376151711717n);
        equal(base41.decode("xWGzGMzLNQbr"), 18446744073709551556n);
      });
    });

    describe("Multiple values", () => {
      it("should handle 1-character encodings", () => {
        equal(base41.encode(new BigUint64Array([1n, 1n]), 1), "CBBBBBBBBBBBC");
        equal(base41.encode(new BigUint64Array([40n, 40n]), 1), "zBBBBBBBBBBBz");
        deepEqual(base41.decode("CBBBBBBBBBBBC"), new BigUint64Array([1n, 1n]).buffer);
        deepEqual(base41.decode("zBBBBBBBBBBBz"), new BigUint64Array([40n, 40n]).buffer);
      });

      it("should handle 2-character encodings", () => {
        equal(base41.encode(new BigUint64Array([41n, 41n]), 2), "BCBBBBBBBBBBBC");
        equal(base41.encode(new BigUint64Array([1020n, 1020n]), 2), "vfBBBBBBBBBBvf");
        deepEqual(base41.decode("BCBBBBBBBBBBBC"), new BigUint64Array([41n, 41n]).buffer);
        deepEqual(base41.decode("vfBBBBBBBBBBvf"), new BigUint64Array([1020n, 1020n]).buffer);
      });

      it("should handle 3-character encodings", () => {
        equal(base41.encode(new BigUint64Array([1021n, 1021n]), 3), "wfBBBBBBBBBBwfB");
        equal(base41.encode(new BigUint64Array([65520n, 65520n]), 3), "DzxBBBBBBBBBDzx");
        deepEqual(base41.decode("wfBBBBBBBBBBwfB"), new BigUint64Array([1021n, 1021n]).buffer);
        deepEqual(base41.decode("DzxBBBBBBBBBDzx"), new BigUint64Array([65520n, 65520n]).buffer);
      });

      it("should handle 10-character encodings", () => {
        equal(base41.encode(new BigUint64Array([281474976710597n, 281474976710597n]), 10), "rmVrJfPNtBBBrmVrJfPNtB");
        equal(base41.encode(new BigUint64Array([9007199254740880n, 9007199254740880n]), 10), "FRFFRtCCbjBBFRFFRtCCbj");
        deepEqual(base41.decode("rmVrJfPNtBBBrmVrJfPNtB"), new BigUint64Array([281474976710597n, 281474976710597n]).buffer);
        deepEqual(base41.decode("FRFFRtCCbjBBFRFFRtCCbj"), new BigUint64Array([9007199254740880n, 9007199254740880n]).buffer);
      });

      it("should handle 11-character encodings", () => {
        equal(base41.encode(new BigUint64Array([9007199254740881n, 9007199254740881n]), 11), "GRFFRtCCbjBBGRFFRtCCbjB");
        equal(base41.encode(new BigUint64Array([288230376151711716n, 288230376151711716n]), 11), "FRhVLdXrVYbBFRhVLdXrVYb");
        deepEqual(base41.decode("GRFFRtCCbjBBGRFFRtCCbjB"), new BigUint64Array([9007199254740881n, 9007199254740881n]).buffer);
        deepEqual(base41.decode("FRhVLdXrVYbBFRhVLdXrVYb"), new BigUint64Array([288230376151711716n, 288230376151711716n]).buffer);
      });

      it("should handle 12-character encodings", () => {
        equal(base41.encode(new BigUint64Array([288230376151711717n, 288230376151711717n]), 12), "GRhVLdXrVYbBGRhVLdXrVYbB");
        equal(base41.encode(new BigUint64Array([18446744073709551556n, 18446744073709551556n]), 12), "xWGzGMzLNQbrxWGzGMzLNQbr");
        deepEqual(base41.decode("GRhVLdXrVYbBGRhVLdXrVYbB"), new BigUint64Array([288230376151711717n, 288230376151711717n]).buffer);
        deepEqual(base41.decode("xWGzGMzLNQbrxWGzGMzLNQbr"), new BigUint64Array([18446744073709551556n, 18446744073709551556n]).buffer);
      });
    });
  });

  describe("Seeded", () => {
    const base41 = new Base41(new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8,
      9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24
    ]));

    it("should handle null character encodings", () => {
      equal(base41.encode(0, 1), "t");
      equal(base41.decode("t"), 0);
    });

    it("should handle 1-character encodings", () => {
      equal(base41.encode(1, 1), "F");
      equal(base41.encode(40, 1), "C");
      equal(base41.decode("F"), 1);
      equal(base41.decode("C"), 40);
    });

    it("should handle 2-character encodings", () => {
      equal(base41.encode(41, 2), "tF");
      equal(base41.encode(1020, 2), "MD");
      equal(base41.decode("tF"), 41);
      equal(base41.decode("MD"), 1020);
    });

    it("should handle 3-character encodings", () => {
      equal(base41.encode(1021, 3), "vDt");
      equal(base41.encode(65520, 3), "VCH");
      equal(base41.decode("vDt"), 1021);
      equal(base41.decode("VCH"), 65520);
    });

    it("should handle 4-character encodings", () => {
      equal(base41.encode(65521, 4), "XCHt");
      equal(base41.encode(2097142, 4), "gBWK");
      equal(base41.decode("XCHt"), 65521);
      equal(base41.decode("gBWK"), 2097142);
    });

    it("should handle 5-character encodings", () => {
      equal(base41.encode(2097143, 5), "ZBWKt");
      equal(base41.encode(67108858, 5), "WCjKp");
      equal(base41.decode("ZBWKt"), 2097143);
      equal(base41.decode("WCjKp"), 67108858);
    });

    it("should handle 6-character encodings", () => {
      equal(base41.encode(67108859, 6), "wCjKpt");
      equal(base41.encode(4294967290, 6), "TnxHVv");
      equal(base41.decode("wCjKpt"), 67108859);
      equal(base41.decode("TnxHVv"), 4294967290);
    });

    it("should handle 7-character encodings", () => {
      equal(base41.encode(4294967291, 7), "fnxHVvt");
      equal(base41.encode(137438953446, 7), "xVVNrHj");
      equal(base41.decode("fnxHVvt"), 4294967291);
      equal(base41.decode("xVVNrHj"), 137438953446);
    });

    it("should handle 8-character encodings", () => {
      equal(base41.encode(137438953447, 8), "rVVNrHjt");
      equal(base41.encode(4398046511092, 8), "ghzkxMpB");
      equal(base41.decode("rVVNrHjt"), 137438953447);
      equal(base41.decode("ghzkxMpB"), 4398046511092);
    });

    it("should handle 9-character encodings", () => {
      equal(base41.encode(4398046511093, 9), "ZhzkxMpBt");
      equal(base41.encode(281474976710596, 9), "fQJgbDrxN");
      equal(base41.decode("ZhzkxMpBt"), 4398046511093);
      equal(base41.decode("fQJgbDrxN"), 281474976710596);
    });

    it("should handle 10-character encodings", () => {
      equal(base41.encode(281474976710597, 10), "gQJgbDrxNt");
      equal(base41.encode(9007199254740880, 10), "XPXXPNFFds");
      equal(base41.decode("gQJgbDrxNt"), 281474976710597);
      equal(base41.decode("XPXXPNFFds"), 9007199254740880);
    });

    it("should handle 11-character encodings", () => {
      equal(base41.encode(9007199254740881, 11), "cPXXPNFFdst");
      equal(base41.encode(288230376151711716n, 11), "XPYJypwgJqd");
      equal(base41.decode("cPXXPNFFdst"), 9007199254740881);
      equal(base41.decode("XPYJypwgJqd"), 288230376151711716n);
    });

    it("should handle 12-character encodings", () => {
      equal(base41.encode(288230376151711717n, 12), "cPYJypwgJqdt");
      equal(base41.encode(18446744073709551556n, 12), "HWcCchCyxndg");
      equal(base41.decode("cPYJypwgJqdt"), 288230376151711717n);
      equal(base41.decode("HWcCchCyxndg"), 18446744073709551556n);
    });
  });
});