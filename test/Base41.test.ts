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

    it("should throw error if invalid seed provided", () => {
      try {
        new Base41({
          seed: new Uint8Array([1])
        });
      } catch (error) {
        equal(error instanceof RangeError, true);
        equal((error as RangeError).message, "If seed is provided it must be 24 bytes long.");
      }
    });
  });

  describe("Unseeded", () => {
    describe("Adaptive", () => {
      const base41 = new Base41();

      describe("Single value", () => {
        it("should handle 1-character encodings", () => {
          equal(base41.encode(1), "C");
          equal(base41.encode(40), "z");
          equal(base41.decode("C"), 1);
          equal(base41.decode("z"), 40);
        });

        it("should handle 2-character encodings", () => {
          equal(base41.encode(41), "BC");
          equal(base41.encode(1020), "vf");
          equal(base41.decode("BC"), 41);
          equal(base41.decode("vf"), 1020);
        });

        it("should handle 3-character encodings", () => {
          equal(base41.encode(1021), "wfB");
          equal(base41.encode(65520), "Dzx");
          equal(base41.decode("wfB"), 1021);
          equal(base41.decode("Dzx"), 65520);
        });

        it("should handle 4-character encodings", () => {
          equal(base41.encode(65521), "FzxB");
          equal(base41.encode(2097142), "rcWn");
          equal(base41.decode("FzxB"), 65521);
          equal(base41.decode("rcWn"), 2097142);
        });

        it("should handle 5-character encodings", () => {
          equal(base41.encode(2097143), "scWnB");
          equal(base41.encode(67108858), "Wzknd");
          equal(base41.decode("scWnB"), 2097143);
          equal(base41.decode("Wzknd"), 67108858);
        });

        it("should handle 6-character encodings", () => {
          equal(base41.encode(67108859), "XzkndB");
          equal(base41.encode(4294967290), "pQNxDw");
          equal(base41.decode("XzkndB"), 67108859);
          equal(base41.decode("pQNxDw"), 4294967290);
        });

        it("should handle 7-character encodings", () => {
          equal(base41.encode(4294967291), "qQNxDwB");
          equal(base41.encode(137438953446), "NDDtPxk");
          equal(base41.decode("qQNxDwB"), 4294967291);
          equal(base41.decode("NDDtPxk"), 137438953446);
        });

        it("should handle 8-character encodings", () => {
          equal(base41.encode(137438953447), "PDDtPxkB");
          equal(base41.encode(4398046511092), "rMgSNvdc");
          equal(base41.decode("PDDtPxkB"), 137438953447);
          equal(base41.decode("rMgSNvdc"), 4398046511092);
        });

        it("should handle 9-character encodings", () => {
          equal(base41.encode(4398046511093), "sMgSNvdcB");
          equal(base41.encode(281474976710596), "qmVrJfPNt");
          equal(base41.decode("sMgSNvdcB"), 4398046511093);
          equal(base41.decode("qmVrJfPNt"), 281474976710596);
        });

        it("should handle 10-character encodings", () => {
          equal(base41.encode(281474976710597), "rmVrJfPNtB");
          equal(base41.encode(9007199254740880), "FRFFRtCCbj");
          equal(base41.decode("rmVrJfPNtB"), 281474976710597);
          equal(base41.decode("FRFFRtCCbj"), 9007199254740880);
        });

        it("should handle 11-character encodings", () => {
          equal(base41.encode(9007199254740881), "GRFFRtCCbjB");
          equal(base41.encode(288230376151711716n), "FRhVLdXrVYb");
          equal(base41.decode("GRFFRtCCbjB"), 9007199254740881);
          equal(base41.decode("FRhVLdXrVYb"), 288230376151711716n);
        });

        it("should handle 12-character encodings", () => {
          equal(base41.encode(288230376151711717n), "GRhVLdXrVYbB");
          equal(base41.encode(18446744073709551556n), "xWGzGMzLNQbr");
          equal(base41.decode("GRhVLdXrVYbB"), 288230376151711717n);
          equal(base41.decode("xWGzGMzLNQbr"), 18446744073709551556n);
        });
      });

      describe("Multiple values", () => {
        it("should handle 1-character encodings", () => {
          equal(base41.encode(new BigUint64Array([1n, 1n])), "CBBBBBBBBBBBC");
          equal(base41.encode(new BigUint64Array([40n, 40n])), "zBBBBBBBBBBBz");
          deepEqual(base41.decode("CBBBBBBBBBBBC"), new BigUint64Array([1n, 1n]).buffer);
          deepEqual(base41.decode("zBBBBBBBBBBBz"), new BigUint64Array([40n, 40n]).buffer);
        });

        it("should handle 2-character encodings", () => {
          equal(base41.encode(new BigUint64Array([41n, 41n])), "BCBBBBBBBBBBBC");
          equal(base41.encode(new BigUint64Array([1020n, 1020n])), "vfBBBBBBBBBBvf");
          deepEqual(base41.decode("BCBBBBBBBBBBBC"), new BigUint64Array([41n, 41n]).buffer);
          deepEqual(base41.decode("vfBBBBBBBBBBvf"), new BigUint64Array([1020n, 1020n]).buffer);
        });

        it("should handle 3-character encodings", () => {
          equal(base41.encode(new BigUint64Array([1021n, 1021n])), "wfBBBBBBBBBBwfB");
          equal(base41.encode(new BigUint64Array([65520n, 65520n])), "DzxBBBBBBBBBDzx");
          deepEqual(base41.decode("wfBBBBBBBBBBwfB"), new BigUint64Array([1021n, 1021n]).buffer);
          deepEqual(base41.decode("DzxBBBBBBBBBDzx"), new BigUint64Array([65520n, 65520n]).buffer);
        });

        it("should handle 10-character encodings", () => {
          equal(base41.encode(new BigUint64Array([281474976710597n, 281474976710597n])), "rmVrJfPNtBBBrmVrJfPNtB");
          equal(base41.encode(new BigUint64Array([9007199254740880n, 9007199254740880n])), "FRFFRtCCbjBBFRFFRtCCbj");
          deepEqual(base41.decode("rmVrJfPNtBBBrmVrJfPNtB"), new BigUint64Array([281474976710597n, 281474976710597n]).buffer);
          deepEqual(base41.decode("FRFFRtCCbjBBFRFFRtCCbj"), new BigUint64Array([9007199254740880n, 9007199254740880n]).buffer);
        });

        it("should handle 11-character encodings", () => {
          equal(base41.encode(new BigUint64Array([9007199254740881n, 9007199254740881n])), "GRFFRtCCbjBBGRFFRtCCbjB");
          equal(base41.encode(new BigUint64Array([288230376151711716n, 288230376151711716n])), "FRhVLdXrVYbBFRhVLdXrVYb");
          deepEqual(base41.decode("GRFFRtCCbjBBGRFFRtCCbjB"), new BigUint64Array([9007199254740881n, 9007199254740881n]).buffer);
          deepEqual(base41.decode("FRhVLdXrVYbBFRhVLdXrVYb"), new BigUint64Array([288230376151711716n, 288230376151711716n]).buffer);
        });

        it("should handle 12-character encodings", () => {
          equal(base41.encode(new BigUint64Array([288230376151711717n, 288230376151711717n])), "GRhVLdXrVYbBGRhVLdXrVYbB");
          equal(base41.encode(new BigUint64Array([18446744073709551556n, 18446744073709551556n])), "xWGzGMzLNQbrxWGzGMzLNQbr");
          deepEqual(base41.decode("GRhVLdXrVYbBGRhVLdXrVYbB"), new BigUint64Array([288230376151711717n, 288230376151711717n]).buffer);
          deepEqual(base41.decode("xWGzGMzLNQbrxWGzGMzLNQbr"), new BigUint64Array([18446744073709551556n, 18446744073709551556n]).buffer);
        });
      });
    });

    describe("Fluid (single output length)", () => {
      const base41 = new Base41({
        outputs: 7
      });

      describe("Single value", () => {
        it("should handle 1-character encodings", () => {
          equal(base41.encode(1), "CBBBBBB");
          equal(base41.encode(40), "zBBBBBB");
          equal(base41.decode("CBBBBBB"), 1);
          equal(base41.decode("zBBBBBB"), 40);
        });

        it("should handle 2-character encodings", () => {
          equal(base41.encode(41), "BCBBBBB");
          equal(base41.encode(1020), "vfBBBBB");
          equal(base41.decode("BCBBBBB"), 41);
          equal(base41.decode("vfBBBBB"), 1020);
        });

        it("should handle 3-character encodings", () => {
          equal(base41.encode(1021), "wfBBBBB");
          equal(base41.encode(65520), "DzxBBBB");
          equal(base41.decode("wfBBBBB"), 1021);
          equal(base41.decode("DzxBBBB"), 65520);
        });

        it("should handle 4-character encodings", () => {
          equal(base41.encode(65521), "FzxBBBB");
          equal(base41.encode(2097142), "rcWnBBB");
          equal(base41.decode("FzxBBBB"), 65521);
          equal(base41.decode("rcWnBBB"), 2097142);
        });

        it("should handle 5-character encodings", () => {
          equal(base41.encode(2097143), "scWnBBB");
          equal(base41.encode(67108858), "WzkndBB");
          equal(base41.decode("scWnBBB"), 2097143);
          equal(base41.decode("WzkndBB"), 67108858);
        });

        it("should handle 6-character encodings", () => {
          equal(base41.encode(67108859), "XzkndBB");
          equal(base41.encode(4294967290), "pQNxDwB");
          equal(base41.decode("XzkndBB"), 67108859);
          equal(base41.decode("pQNxDwB"), 4294967290);
        });

        it("should handle 7-character encodings", () => {
          equal(base41.encode(4294967291), "qQNxDwB");
          equal(base41.encode(137438953446), "NDDtPxk");
          equal(base41.decode("qQNxDwB"), 4294967291);
          equal(base41.decode("NDDtPxk"), 137438953446);
        });

        it("should handle 8-character encodings", () => {
          equal(base41.encode(137438953447), "PDDtPxkB");
          equal(base41.encode(4398046511092), "rMgSNvdc");
          equal(base41.decode("PDDtPxkB"), 137438953447);
          equal(base41.decode("rMgSNvdc"), 4398046511092);
        });

        it("should handle 9-character encodings", () => {
          equal(base41.encode(4398046511093), "sMgSNvdcB");
          equal(base41.encode(281474976710596), "qmVrJfPNt");
          equal(base41.decode("sMgSNvdcB"), 4398046511093);
          equal(base41.decode("qmVrJfPNt"), 281474976710596);
        });

        it("should handle 10-character encodings", () => {
          equal(base41.encode(281474976710597), "rmVrJfPNtB");
          equal(base41.encode(9007199254740880), "FRFFRtCCbj");
          equal(base41.decode("rmVrJfPNtB"), 281474976710597);
          equal(base41.decode("FRFFRtCCbj"), 9007199254740880);
        });

        it("should handle 11-character encodings", () => {
          equal(base41.encode(9007199254740881), "GRFFRtCCbjB");
          equal(base41.encode(288230376151711716n), "FRhVLdXrVYb");
          equal(base41.decode("GRFFRtCCbjB"), 9007199254740881);
          equal(base41.decode("FRhVLdXrVYb"), 288230376151711716n);
        });

        it("should handle 12-character encodings", () => {
          equal(base41.encode(288230376151711717n), "GRhVLdXrVYbB");
          equal(base41.encode(18446744073709551556n), "xWGzGMzLNQbr");
          equal(base41.decode("GRhVLdXrVYbB"), 288230376151711717n);
          equal(base41.decode("xWGzGMzLNQbr"), 18446744073709551556n);
        });
      });

      describe("Multiple values", () => {
        it("should handle 1-character encodings", () => {
          equal(base41.encode(new BigUint64Array([1n, 1n])), "CBBBBBBBBBBBCBBBBBB");
          equal(base41.encode(new BigUint64Array([40n, 40n])), "zBBBBBBBBBBBzBBBBBB");
          deepEqual(base41.decode("CBBBBBBBBBBBCBBBBBB"), new BigUint64Array([1n, 1n]).buffer);
          deepEqual(base41.decode("zBBBBBBBBBBBzBBBBBB"), new BigUint64Array([40n, 40n]).buffer);
        });

        it("should handle 2-character encodings", () => {
          equal(base41.encode(new BigUint64Array([41n, 41n])), "BCBBBBBBBBBBBCBBBBB");
          equal(base41.encode(new BigUint64Array([1020n, 1020n])), "vfBBBBBBBBBBvfBBBBB");
          deepEqual(base41.decode("BCBBBBBBBBBBBCBBBBB"), new BigUint64Array([41n, 41n]).buffer);
          deepEqual(base41.decode("vfBBBBBBBBBBvfBBBBB"), new BigUint64Array([1020n, 1020n]).buffer);
        });

        it("should handle 3-character encodings", () => {
          equal(base41.encode(new BigUint64Array([1021n, 1021n])), "wfBBBBBBBBBBwfBBBBB");
          equal(base41.encode(new BigUint64Array([65520n, 65520n])), "DzxBBBBBBBBBDzxBBBB");
          deepEqual(base41.decode("wfBBBBBBBBBBwfBBBBB"), new BigUint64Array([1021n, 1021n]).buffer);
          deepEqual(base41.decode("DzxBBBBBBBBBDzxBBBB"), new BigUint64Array([65520n, 65520n]).buffer);
        });

        it("should handle 10-character encodings", () => {
          equal(base41.encode(new BigUint64Array([281474976710597n, 281474976710597n])), "rmVrJfPNtBBBrmVrJfPNtB");
          equal(base41.encode(new BigUint64Array([9007199254740880n, 9007199254740880n])), "FRFFRtCCbjBBFRFFRtCCbj");
          deepEqual(base41.decode("rmVrJfPNtBBBrmVrJfPNtB"), new BigUint64Array([281474976710597n, 281474976710597n]).buffer);
          deepEqual(base41.decode("FRFFRtCCbjBBFRFFRtCCbj"), new BigUint64Array([9007199254740880n, 9007199254740880n]).buffer);
        });

        it("should handle 11-character encodings", () => {
          equal(base41.encode(new BigUint64Array([9007199254740881n, 9007199254740881n])), "GRFFRtCCbjBBGRFFRtCCbjB");
          equal(base41.encode(new BigUint64Array([288230376151711716n, 288230376151711716n])), "FRhVLdXrVYbBFRhVLdXrVYb");
          deepEqual(base41.decode("GRFFRtCCbjBBGRFFRtCCbjB"), new BigUint64Array([9007199254740881n, 9007199254740881n]).buffer);
          deepEqual(base41.decode("FRhVLdXrVYbBFRhVLdXrVYb"), new BigUint64Array([288230376151711716n, 288230376151711716n]).buffer);
        });

        it("should handle 12-character encodings", () => {
          equal(base41.encode(new BigUint64Array([288230376151711717n, 288230376151711717n])), "GRhVLdXrVYbBGRhVLdXrVYbB");
          equal(base41.encode(new BigUint64Array([18446744073709551556n, 18446744073709551556n])), "xWGzGMzLNQbrxWGzGMzLNQbr");
          deepEqual(base41.decode("GRhVLdXrVYbBGRhVLdXrVYbB"), new BigUint64Array([288230376151711717n, 288230376151711717n]).buffer);
          deepEqual(base41.decode("xWGzGMzLNQbrxWGzGMzLNQbr"), new BigUint64Array([18446744073709551556n, 18446744073709551556n]).buffer);
        });
      });
    });

    describe("Explicit (multiple output lengths)", () => {
      const base41 = new Base41({
        outputs: [5, 7]
      });

      describe("Single value", () => {
        it("should handle 1-character encodings", () => {
          equal(base41.encode(1), "CBBBB");
          equal(base41.encode(40), "zBBBB");
          equal(base41.decode("CBBBB"), 1);
          equal(base41.decode("zBBBB"), 40);
        });

        it("should handle 2-character encodings", () => {
          equal(base41.encode(41), "BCBBB");
          equal(base41.encode(1020), "vfBBB");
          equal(base41.decode("BCBBB"), 41);
          equal(base41.decode("vfBBB"), 1020);
        });

        it("should handle 3-character encodings", () => {
          equal(base41.encode(1021), "wfBBB");
          equal(base41.encode(65520), "DzxBB");
          equal(base41.decode("wfBBB"), 1021);
          equal(base41.decode("DzxBB"), 65520);
        });

        it("should handle 4-character encodings", () => {
          equal(base41.encode(65521), "FzxBB");
          equal(base41.encode(2097142), "rcWnB");
          equal(base41.decode("FzxBB"), 65521);
          equal(base41.decode("rcWnB"), 2097142);
        });

        it("should handle 5-character encodings", () => {
          equal(base41.encode(2097143), "scWnB");
          equal(base41.encode(67108858), "Wzknd");
          equal(base41.decode("scWnB"), 2097143);
          equal(base41.decode("Wzknd"), 67108858);
        });

        it("should handle 6-character encodings", () => {
          equal(base41.encode(67108859), "XzkndBB");
          equal(base41.encode(4294967290), "pQNxDwB");
          equal(base41.decode("XzkndBB"), 67108859);
          equal(base41.decode("pQNxDwB"), 4294967290);
        });

        it("should handle 7-character encodings", () => {
          equal(base41.encode(4294967291), "qQNxDwB");
          equal(base41.encode(137438953446), "NDDtPxk");
          equal(base41.decode("qQNxDwB"), 4294967291);
          equal(base41.decode("NDDtPxk"), 137438953446);
        });

        it("should handle 8-character encodings", () => {
          equal(base41.encode(137438953447), "PDDtPxkB");
          equal(base41.encode(4398046511092), "rMgSNvdc");
          equal(base41.decode("PDDtPxkB"), 137438953447);
          equal(base41.decode("rMgSNvdc"), 4398046511092);
        });

        it("should handle 9-character encodings", () => {
          equal(base41.encode(4398046511093), "sMgSNvdcB");
          equal(base41.encode(281474976710596), "qmVrJfPNt");
          equal(base41.decode("sMgSNvdcB"), 4398046511093);
          equal(base41.decode("qmVrJfPNt"), 281474976710596);
        });

        it("should handle 10-character encodings", () => {
          equal(base41.encode(281474976710597), "rmVrJfPNtB");
          equal(base41.encode(9007199254740880), "FRFFRtCCbj");
          equal(base41.decode("rmVrJfPNtB"), 281474976710597);
          equal(base41.decode("FRFFRtCCbj"), 9007199254740880);
        });

        it("should handle 11-character encodings", () => {
          equal(base41.encode(9007199254740881), "GRFFRtCCbjB");
          equal(base41.encode(288230376151711716n), "FRhVLdXrVYb");
          equal(base41.decode("GRFFRtCCbjB"), 9007199254740881);
          equal(base41.decode("FRhVLdXrVYb"), 288230376151711716n);
        });

        it("should handle 12-character encodings", () => {
          equal(base41.encode(288230376151711717n), "GRhVLdXrVYbB");
          equal(base41.encode(18446744073709551556n), "xWGzGMzLNQbr");
          equal(base41.decode("GRhVLdXrVYbB"), 288230376151711717n);
          equal(base41.decode("xWGzGMzLNQbr"), 18446744073709551556n);
        });
      });

      describe("Multiple values", () => {
        it("should handle 1-character encodings", () => {
          equal(base41.encode(new BigUint64Array([1n, 1n])), "CBBBBBBBBBBBCBBBB");
          equal(base41.encode(new BigUint64Array([40n, 40n])), "zBBBBBBBBBBBzBBBB");
          deepEqual(base41.decode("CBBBBBBBBBBBCBBBB"), new BigUint64Array([1n, 1n]).buffer);
          deepEqual(base41.decode("zBBBBBBBBBBBzBBBB"), new BigUint64Array([40n, 40n]).buffer);
        });

        it("should handle 2-character encodings", () => {
          equal(base41.encode(new BigUint64Array([41n, 41n])), "BCBBBBBBBBBBBCBBB");
          equal(base41.encode(new BigUint64Array([1020n, 1020n])), "vfBBBBBBBBBBvfBBB");
          deepEqual(base41.decode("BCBBBBBBBBBBBCBBB"), new BigUint64Array([41n, 41n]).buffer);
          deepEqual(base41.decode("vfBBBBBBBBBBvfBBB"), new BigUint64Array([1020n, 1020n]).buffer);
        });

        it("should handle 3-character encodings", () => {
          equal(base41.encode(new BigUint64Array([1021n, 1021n])), "wfBBBBBBBBBBwfBBB");
          equal(base41.encode(new BigUint64Array([65520n, 65520n])), "DzxBBBBBBBBBDzxBB");
          deepEqual(base41.decode("wfBBBBBBBBBBwfBBB"), new BigUint64Array([1021n, 1021n]).buffer);
          deepEqual(base41.decode("DzxBBBBBBBBBDzxBB"), new BigUint64Array([65520n, 65520n]).buffer);
        });

        it("should handle 10-character encodings", () => {
          equal(base41.encode(new BigUint64Array([281474976710597n, 281474976710597n])), "rmVrJfPNtBBBrmVrJfPNtB");
          equal(base41.encode(new BigUint64Array([9007199254740880n, 9007199254740880n])), "FRFFRtCCbjBBFRFFRtCCbj");
          deepEqual(base41.decode("rmVrJfPNtBBBrmVrJfPNtB"), new BigUint64Array([281474976710597n, 281474976710597n]).buffer);
          deepEqual(base41.decode("FRFFRtCCbjBBFRFFRtCCbj"), new BigUint64Array([9007199254740880n, 9007199254740880n]).buffer);
        });

        it("should handle 11-character encodings", () => {
          equal(base41.encode(new BigUint64Array([9007199254740881n, 9007199254740881n])), "GRFFRtCCbjBBGRFFRtCCbjB");
          equal(base41.encode(new BigUint64Array([288230376151711716n, 288230376151711716n])), "FRhVLdXrVYbBFRhVLdXrVYb");
          deepEqual(base41.decode("GRFFRtCCbjBBGRFFRtCCbjB"), new BigUint64Array([9007199254740881n, 9007199254740881n]).buffer);
          deepEqual(base41.decode("FRhVLdXrVYbBFRhVLdXrVYb"), new BigUint64Array([288230376151711716n, 288230376151711716n]).buffer);
        });

        it("should handle 12-character encodings", () => {
          equal(base41.encode(new BigUint64Array([288230376151711717n, 288230376151711717n])), "GRhVLdXrVYbBGRhVLdXrVYbB");
          equal(base41.encode(new BigUint64Array([18446744073709551556n, 18446744073709551556n])), "xWGzGMzLNQbrxWGzGMzLNQbr");
          deepEqual(base41.decode("GRhVLdXrVYbBGRhVLdXrVYbB"), new BigUint64Array([288230376151711717n, 288230376151711717n]).buffer);
          deepEqual(base41.decode("xWGzGMzLNQbrxWGzGMzLNQbr"), new BigUint64Array([18446744073709551556n, 18446744073709551556n]).buffer);
        });
      });
    });
  });

  describe("Seeded (default options)", () => {
    const base41 = new Base41({
      seed: new Uint8Array([
        1, 2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23, 24
      ])
    });

    it("should handle null character encodings", () => {
      equal(base41.encode(0), "t");
      equal(base41.decode("t"), 0);
    });

    it("should handle 1-character encodings", () => {
      equal(base41.encode(1), "F");
      equal(base41.encode(40), "C");
      equal(base41.decode("F"), 1);
      equal(base41.decode("C"), 40);
    });

    it("should handle 2-character encodings", () => {
      equal(base41.encode(41), "tF");
      equal(base41.encode(1020), "MD");
      equal(base41.decode("tF"), 41);
      equal(base41.decode("MD"), 1020);
    });

    it("should handle 3-character encodings", () => {
      equal(base41.encode(1021), "vDt");
      equal(base41.encode(65520), "VCH");
      equal(base41.decode("vDt"), 1021);
      equal(base41.decode("VCH"), 65520);
    });

    it("should handle 4-character encodings", () => {
      equal(base41.encode(65521), "XCHt");
      equal(base41.encode(2097142), "gBWK");
      equal(base41.decode("XCHt"), 65521);
      equal(base41.decode("gBWK"), 2097142);
    });

    it("should handle 5-character encodings", () => {
      equal(base41.encode(2097143), "ZBWKt");
      equal(base41.encode(67108858), "WCjKp");
      equal(base41.decode("ZBWKt"), 2097143);
      equal(base41.decode("WCjKp"), 67108858);
    });

    it("should handle 6-character encodings", () => {
      equal(base41.encode(67108859), "wCjKpt");
      equal(base41.encode(4294967290), "TnxHVv");
      equal(base41.decode("wCjKpt"), 67108859);
      equal(base41.decode("TnxHVv"), 4294967290);
    });

    it("should handle 7-character encodings", () => {
      equal(base41.encode(4294967291), "fnxHVvt");
      equal(base41.encode(137438953446), "xVVNrHj");
      equal(base41.decode("fnxHVvt"), 4294967291);
      equal(base41.decode("xVVNrHj"), 137438953446);
    });

    it("should handle 8-character encodings", () => {
      equal(base41.encode(137438953447), "rVVNrHjt");
      equal(base41.encode(4398046511092), "ghzkxMpB");
      equal(base41.decode("rVVNrHjt"), 137438953447);
      equal(base41.decode("ghzkxMpB"), 4398046511092);
    });

    it("should handle 9-character encodings", () => {
      equal(base41.encode(4398046511093), "ZhzkxMpBt");
      equal(base41.encode(281474976710596), "fQJgbDrxN");
      equal(base41.decode("ZhzkxMpBt"), 4398046511093);
      equal(base41.decode("fQJgbDrxN"), 281474976710596);
    });

    it("should handle 10-character encodings", () => {
      equal(base41.encode(281474976710597), "gQJgbDrxNt");
      equal(base41.encode(9007199254740880), "XPXXPNFFds");
      equal(base41.decode("gQJgbDrxNt"), 281474976710597);
      equal(base41.decode("XPXXPNFFds"), 9007199254740880);
    });

    it("should handle 11-character encodings", () => {
      equal(base41.encode(9007199254740881), "cPXXPNFFdst");
      equal(base41.encode(288230376151711716n), "XPYJypwgJqd");
      equal(base41.decode("cPXXPNFFdst"), 9007199254740881);
      equal(base41.decode("XPYJypwgJqd"), 288230376151711716n);
    });

    it("should handle 12-character encodings", () => {
      equal(base41.encode(288230376151711717n), "cPYJypwgJqdt");
      equal(base41.encode(18446744073709551556n), "HWcCchCyxndg");
      equal(base41.decode("cPYJypwgJqdt"), 288230376151711717n);
      equal(base41.decode("HWcCchCyxndg"), 18446744073709551556n);
    });
  });
});