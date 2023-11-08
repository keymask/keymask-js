import { equal, deepEqual } from "node:assert/strict";
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

    it("should handle null character encodings", () => {
      equal(encoder.encode(0), "");
      equal(encoder.encode(0, 1), "B");
      equal(encoder.decode("B"), 0);
    });

    it("should handle 1-character encodings", () => {
      equal(encoder.encode(1), "C");
      equal(encoder.encode(1, 1), "C");
      equal(encoder.encode(1, 2), "CB");
      equal(encoder.encode(1, 3), "CBB");
      equal(encoder.encode(40, 1), "z");
      equal(encoder.encode(40, 2), "zB");
      equal(encoder.encode(40, 3), "zBB");
      equal(encoder.decode("C"), 1);
      equal(encoder.decode("CB"), 1);
      equal(encoder.decode("CBB"), 1);
      equal(encoder.decode("z"), 40);
      equal(encoder.decode("zB"), 40);
      equal(encoder.decode("zBB"), 40);
    });

    it("should handle 2-character encodings", () => {
      equal(encoder.encode(41), "BC");
      equal(encoder.encode(41, 2), "BC");
      equal(encoder.encode(1020, 2), "vf");
      equal(encoder.decode("BC"), 41);
      equal(encoder.decode("vf"), 1020);
    });

    it("should handle 3-character encodings", () => {
      equal(encoder.encode(1021), "wf");
      equal(encoder.encode(1021, 3), "wfB");
      equal(encoder.encode(65520, 3), "Dzx");
      equal(encoder.decode("wf"), 1021);
      equal(encoder.decode("wfB"), 1021);
      equal(encoder.decode("Dzx"), 65520);
    });

    it("should handle 4-character encodings", () => {
      equal(encoder.encode(65521), "Fzx");
      equal(encoder.encode(65521, 4), "FzxB");
      equal(encoder.encode(2097142, 4), "rcWn");
      equal(encoder.decode("Fzx"), 65521);
      equal(encoder.decode("FzxB"), 65521);
      equal(encoder.decode("rcWn"), 2097142);
    });

    it("should handle 5-character encodings", () => {
      equal(encoder.encode(2097143), "scWn");
      equal(encoder.encode(2097143, 5), "scWnB");
      equal(encoder.encode(67108858, 5), "Wzknd");
      equal(encoder.decode("scWn"), 2097143);
      equal(encoder.decode("scWnB"), 2097143);
      equal(encoder.decode("Wzknd"), 67108858);
    });

    it("should handle 6-character encodings", () => {
      equal(encoder.encode(67108859), "Xzknd");
      equal(encoder.encode(67108859, 6), "XzkndB");
      equal(encoder.encode(4294967290, 6), "pQNxDw");
      equal(encoder.decode("Xzknd"), 67108859);
      equal(encoder.decode("XzkndB"), 67108859);
      equal(encoder.decode("pQNxDw"), 4294967290);
    });

    it("should handle 7-character encodings", () => {
      equal(encoder.encode(4294967291), "qQNxDw");
      equal(encoder.encode(4294967291, 7), "qQNxDwB");
      equal(encoder.encode(137438953446, 7), "NDDtPxk");
      equal(encoder.decode("qQNxDw"), 4294967291);
      equal(encoder.decode("qQNxDwB"), 4294967291);
      equal(encoder.decode("NDDtPxk"), 137438953446);
    });

    it("should handle 8-character encodings", () => {
      equal(encoder.encode(137438953447), "PDDtPxk");
      equal(encoder.encode(137438953447, 8), "PDDtPxkB");
      equal(encoder.encode(4398046511092, 8), "rMgSNvdc");
      equal(encoder.decode("PDDtPxk"), 137438953447);
      equal(encoder.decode("PDDtPxkB"), 137438953447);
      equal(encoder.decode("rMgSNvdc"), 4398046511092);
    });

    it("should handle 9-character encodings", () => {
      equal(encoder.encode(4398046511093), "sMgSNvdc");
      equal(encoder.encode(4398046511093, 9), "sMgSNvdcB");
      equal(encoder.encode(281474976710596, 9), "qmVrJfPNt");
      equal(encoder.decode("sMgSNvdc"), 4398046511093);
      equal(encoder.decode("sMgSNvdcB"), 4398046511093);
      equal(encoder.decode("qmVrJfPNt"), 281474976710596);
    });

    it("should handle 10-character encodings", () => {
      equal(encoder.encode(281474976710597), "rmVrJfPNt");
      equal(encoder.encode(281474976710597, 10), "rmVrJfPNtB");
      equal(encoder.encode(9007199254740880, 10), "FRFFRtCCbj");
      equal(encoder.decode("rmVrJfPNt"), 281474976710597);
      equal(encoder.decode("rmVrJfPNtB"), 281474976710597);
      equal(encoder.decode("FRFFRtCCbj"), 9007199254740880);
    });

    it("should handle 11-character encodings", () => {
      equal(encoder.encode(9007199254740881n), "GRFFRtCCbj");
      equal(encoder.encode(9007199254740881n, 11), "GRFFRtCCbjB");
      equal(encoder.encode(288230376151711716n, 11), "FRhVLdXrVYb");
      equal(encoder.decode("GRFFRtCCbj"), 9007199254740881);
      equal(encoder.decode("GRFFRtCCbj", true), 9007199254740881n);
      equal(encoder.decode("GRFFRtCCbjB"), 9007199254740881n);
      equal(encoder.decode("FRhVLdXrVYb"), 288230376151711716n);
    });

    it("should handle 12-character encodings", () => {
      equal(encoder.encode(288230376151711717n), "GRhVLdXrVYb");
      equal(encoder.encode(288230376151711717n, 12), "GRhVLdXrVYbB");
      equal(encoder.encode(18446744073709551556n, 12), "xWGzGMzLNQbr");
      equal(encoder.decode("GRhVLdXrVYb"), 288230376151711717n);
      equal(encoder.decode("GRhVLdXrVYbB"), 288230376151711717n);
      equal(encoder.decode("xWGzGMzLNQbr"), 18446744073709551556n);
    });

    it("should handle larger than 64-bit bigints", () => {
      equal(encoder.encode(18446744073709551616n), "BBBBBBBBBBBBC");
      equal(encoder.encode(18446744073709551616n, 6), "BBBBBBBBBBBBCBBBBB");
      equal(encoder.encode(987654321098765432109876543210n), "kYWgYxchnnYrKmnVHPP");
      equal(encoder.encode(987654321098765432109876543210n, 12), "kYWgYxchnnYrKmnVHPPBBBBB");

      equal(encoder.decode("BBBBBBBBBBBBC", true), 18446744073709551616n);
      equal(encoder.decode("BBBBBBBBBBBBCBBBBB", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("BBBBBBBBBBBBC"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("BBBBBBBBBBBBCBBBBB"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("kYWgYxchnnYrKmnVHPP", true), 987654321098765432109876543210n);
      equal(encoder.decode("kYWgYxchnnYrKmnVHPPBBBBB", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("kYWgYxchnnYrKmnVHPP"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("kYWgYxchnnYrKmnVHPPBBBBB"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
    });

    it("should handle binary values", () => {
      equal(
        encoder.encode(
          new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer
        ),
        "BBBBBBBBBBBBC"
      );
      equal(
        encoder.encode(
          new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]).buffer,
          6
        ),
        "BBBBBBBBBBBBCBBBBB"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
          ]).buffer
        ),
        "kYWgYxchnnYrKmnVHPP"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0
          ]).buffer,
          12
        ),
        "kYWgYxchnnYrKmnVHPPBBBBB"
      );

      equal(encoder.decode("BBBBBBBBBBBBC", true), 18446744073709551616n);
      equal(encoder.decode("BBBBBBBBBBBBCBBBBB", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("BBBBBBBBBBBBC"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("BBBBBBBBBBBBCBBBBB"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("kYWgYxchnnYrKmnVHPP", true), 987654321098765432109876543210n);
      equal(encoder.decode("kYWgYxchnnYrKmnVHPPBBBBB", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("kYWgYxchnnYrKmnVHPP"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("kYWgYxchnnYrKmnVHPPBBBBB"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
    });
  });

  describe("Seeded", () => {
    const encoder = new KeymaskEncoder(new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8,
      9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24
    ]).buffer);

    it("should handle null character encodings", () => {
      equal(encoder.encode(0), "");
      equal(encoder.encode(0, 1), "q");
      equal(encoder.decode("q"), 0);
    });

    it("should handle 1-character encodings", () => {
      equal(encoder.encode(1), "d");
      equal(encoder.encode(1, 1), "d");
      equal(encoder.encode(1, 2), "dq");
      equal(encoder.encode(1, 3), "dqq");
      equal(encoder.encode(40, 1), "n");
      equal(encoder.encode(40, 2), "nq");
      equal(encoder.encode(40, 3), "nqq");
      equal(encoder.decode("d"), 1);
      equal(encoder.decode("dq"), 1);
      equal(encoder.decode("dqq"), 1);
      equal(encoder.decode("n"), 40);
      equal(encoder.decode("nq"), 40);
      equal(encoder.decode("nqq"), 40);
    });

    it("should handle 2-character encodings", () => {
      equal(encoder.encode(41), "qd");
      equal(encoder.encode(41, 2), "qd");
      equal(encoder.encode(1020, 2), "gr");
      equal(encoder.decode("qd"), 41);
      equal(encoder.decode("gr"), 1020);
    });

    it("should handle 3-character encodings", () => {
      equal(encoder.encode(1021), "Zr");
      equal(encoder.encode(1021, 3), "Zrq");
      equal(encoder.encode(65520, 3), "ynW");
      equal(encoder.decode("Zr"), 1021);
      equal(encoder.decode("Zrq"), 1021);
      equal(encoder.decode("ynW"), 65520);
    });

    it("should handle 4-character encodings", () => {
      equal(encoder.encode(65521), "SnW");
      equal(encoder.encode(65521, 4), "SnWq");
      equal(encoder.encode(2097142, 4), "DxwP");
      equal(encoder.decode("SnW"), 65521);
      equal(encoder.decode("SnWq"), 65521);
      equal(encoder.decode("DxwP"), 2097142);
    });

    it("should handle 5-character encodings", () => {
      equal(encoder.encode(2097143), "JxwP");
      equal(encoder.encode(2097143, 5), "JxwPq");
      equal(encoder.encode(67108858, 5), "wnRPY");
      equal(encoder.decode("JxwP"), 2097143);
      equal(encoder.decode("JxwPq"), 2097143);
      equal(encoder.decode("wnRPY"), 67108858);
    });

    it("should handle 6-character encodings", () => {
      equal(encoder.encode(67108859), "snRPY");
      equal(encoder.encode(67108859, 6), "snRPYq");
      equal(encoder.encode(4294967290, 6), "HhvWyZ");
      equal(encoder.decode("snRPY"), 67108859);
      equal(encoder.decode("snRPYq"), 67108859);
      equal(encoder.decode("HhvWyZ"), 4294967290);
    });

    it("should handle 7-character encodings", () => {
      equal(encoder.encode(4294967291), "BhvWyZ");
      equal(encoder.encode(4294967291, 7), "BhvWyZq");
      equal(encoder.encode(137438953446, 7), "vyytNWR");
      equal(encoder.decode("BhvWyZ"), 4294967291);
      equal(encoder.decode("BhvWyZq"), 4294967291);
      equal(encoder.decode("vyytNWR"), 137438953446);
    });

    it("should handle 8-character encodings", () => {
      equal(encoder.encode(137438953447), "NyytNWR");
      equal(encoder.encode(137438953447, 8), "NyytNWRq");
      equal(encoder.encode(4398046511092, 8), "DcCQvgYx");
      equal(encoder.decode("NyytNWR"), 137438953447);
      equal(encoder.decode("NyytNWRq"), 137438953447);
      equal(encoder.decode("DcCQvgYx"), 4398046511092);
    });

    it("should handle 9-character encodings", () => {
      equal(encoder.encode(4398046511093), "JcCQvgYx");
      equal(encoder.encode(4398046511093, 9), "JcCQvgYxq");
      equal(encoder.encode(281474976710596, 9), "BfMDGrNvt");
      equal(encoder.decode("JcCQvgYx"), 4398046511093);
      equal(encoder.decode("JcCQvgYxq"), 4398046511093);
      equal(encoder.decode("BfMDGrNvt"), 281474976710596);
    });

    it("should handle 10-character encodings", () => {
      equal(encoder.encode(281474976710597), "DfMDGrNvt");
      equal(encoder.encode(281474976710597, 10), "DfMDGrNvtq");
      equal(encoder.encode(9007199254740880, 10), "SmSSmtddpL");
      equal(encoder.decode("DfMDGrNvt"), 281474976710597);
      equal(encoder.decode("DfMDGrNvtq"), 281474976710597);
      equal(encoder.decode("SmSSmtddpL"), 9007199254740880);
    });

    it("should handle 11-character encodings", () => {
      equal(encoder.encode(9007199254740881n), "zmSSmtddpL");
      equal(encoder.encode(9007199254740881n, 11), "zmSSmtddpLq");
      equal(encoder.encode(288230376151711716n, 11), "SmVMXYsDMkp");
      equal(encoder.decode("zmSSmtddpL"), 9007199254740881);
      equal(encoder.decode("zmSSmtddpL", true), 9007199254740881n);
      equal(encoder.decode("zmSSmtddpLq"), 9007199254740881n);
      equal(encoder.decode("SmVMXYsDMkp"), 288230376151711716n);
    });

    it("should handle 12-character encodings", () => {
      equal(encoder.encode(288230376151711717n), "zmVMXYsDMkp");
      equal(encoder.encode(288230376151711717n, 12), "zmVMXYsDMkpq");
      equal(encoder.encode(18446744073709551556n, 12), "WwznzcnXvhpD");
      equal(encoder.decode("zmVMXYsDMkp"), 288230376151711717n);
      equal(encoder.decode("zmVMXYsDMkpq"), 288230376151711717n);
      equal(encoder.decode("WwznzcnXvhpD"), 18446744073709551556n);
    });

    it("should handle larger than 64-bit bigints", () => {
      equal(encoder.encode(18446744073709551616n), "qqqqqqqqqqqqd");
      equal(encoder.encode(18446744073709551616n, 6), "qqqqqqqqqqqqdqqqqq");
      equal(encoder.encode(987654321098765432109876543210n), "RkwCkWxVPPkDTfPMbNN");
      equal(encoder.encode(987654321098765432109876543210n, 12), "RkwCkWxVPPkDTfPMbNNqqqqq");

      equal(encoder.decode("qqqqqqqqqqqqd", true), 18446744073709551616n);
      equal(encoder.decode("qqqqqqqqqqqqdqqqqq", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("qqqqqqqqqqqqd"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("qqqqqqqqqqqqdqqqqq"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("RkwCkWxVPPkDTfPMbNN", true), 987654321098765432109876543210n);
      equal(encoder.decode("RkwCkWxVPPkDTfPMbNNqqqqq", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("RkwCkWxVPPkDTfPMbNN"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("RkwCkWxVPPkDTfPMbNNqqqqq"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
    });

    it("should handle binary values", () => {
      equal(
        encoder.encode(
          new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer
        ),
        "qqqqqqqqqqqqd"
      );
      equal(
        encoder.encode(
          new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]).buffer,
          6
        ),
        "qqqqqqqqqqqqdqqqqq"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
          ]).buffer
        ),
        "RkwCkWxVPPkDTfPMbNN"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0
          ]).buffer,
          12
        ),
        "RkwCkWxVPPkDTfPMbNNqqqqq"
      );

      equal(encoder.decode("qqqqqqqqqqqqd", true), 18446744073709551616n);
      equal(encoder.decode("qqqqqqqqqqqqdqqqqq", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("qqqqqqqqqqqqd"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("qqqqqqqqqqqqdqqqqq"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("RkwCkWxVPPkDTfPMbNN", true), 987654321098765432109876543210n);
      equal(encoder.decode("RkwCkWxVPPkDTfPMbNNqqqqq", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("RkwCkWxVPPkDTfPMbNN"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("RkwCkWxVPPkDTfPMbNNqqqqq"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
    });
  });
});