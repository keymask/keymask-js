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

  describe("Unseeded, safe mode", () => {
    const encoder = new KeymaskEncoder(void 0, true);

    it("should handle null character encodings", () => {
      equal(encoder.encode(0), "");
      equal(encoder.encode(0, 1), "b");
      equal(encoder.decode("b"), 0);
    });

    it("should handle 1-character encodings", () => {
      equal(encoder.encode(1), "c");
      equal(encoder.encode(1, 1), "c");
      equal(encoder.encode(1, 2), "cb");
      equal(encoder.encode(1, 3), "cbb");
      equal(encoder.encode(22, 1), "7");
      equal(encoder.encode(22, 2), "7b");
      equal(encoder.encode(22, 3), "7bb");
      equal(encoder.decode("c"), 1);
      equal(encoder.decode("cb"), 1);
      equal(encoder.decode("cbb"), 1);
      equal(encoder.decode("7"), 22);
      equal(encoder.decode("7b"), 22);
      equal(encoder.decode("7bb"), 22);
    });

    it("should handle 2-character encodings", () => {
      equal(encoder.encode(23), "9");
      equal(encoder.encode(23, 2), "9b");
      equal(encoder.encode(508, 2), "g5");
      equal(encoder.decode("9"), 23);
      equal(encoder.decode("9b"), 23);
      equal(encoder.decode("g5"), 508);
    });

    it("should handle 3-character encodings", () => {
      equal(encoder.encode(509), "h5");
      equal(encoder.encode(509, 3), "h5b");
      equal(encoder.encode(8190, 3), "jht");
      equal(encoder.decode("h5"), 509);
      equal(encoder.decode("h5b"), 509);
      equal(encoder.decode("jht"), 8190);
    });

    it("should handle 4-character encodings", () => {
      equal(encoder.encode(8191), "kht");
      equal(encoder.encode(8191, 4), "khtb");
      equal(encoder.encode(262138, 4), "pd9y");
      equal(encoder.decode("kht"), 8191);
      equal(encoder.decode("khtb"), 8191);
      equal(encoder.decode("pd9y"), 262138);
    });

    it("should handle 5-character encodings", () => {
      equal(encoder.encode(262139), "qd9y");
      equal(encoder.encode(262139, 5), "qd9yb");
      equal(encoder.encode(4194300, 5), "rynvr");
      equal(encoder.decode("qd9y"), 262139);
      equal(encoder.decode("qd9yb"), 262139);
      equal(encoder.decode("rynvr"), 4194300);
    });

    it("should handle 6-character encodings", () => {
      equal(encoder.encode(4194301), "synvr");
      equal(encoder.encode(4194301, 6), "synvrb");
      equal(encoder.encode(134217688, 6), "wzbs2w");
      equal(encoder.decode("synvr"), 4194301);
      equal(encoder.decode("synvrb"), 4194301);
      equal(encoder.decode("wzbs2w"), 134217688);
    });

    it("should handle 7-character encodings", () => {
      equal(encoder.encode(134217689), "xzbs2w");
      equal(encoder.encode(134217689, 7), "xzbs2wb");
      equal(encoder.encode(4294967290, 7), "ppgnnq7");
      equal(encoder.decode("xzbs2w"), 134217689);
      equal(encoder.decode("xzbs2wb"), 134217689);
      equal(encoder.decode("ppgnnq7"), 4294967290);
    });

    it("should handle 8-character encodings", () => {
      equal(encoder.encode(4294967291), "qpgnnq7");
      equal(encoder.encode(4294967291, 8), "qpgnnq7b");
      equal(encoder.encode(68719476730, 8), "pd9djt9t");
      equal(encoder.decode("qpgnnq7"), 4294967291);
      equal(encoder.decode("qpgnnq7b"), 4294967291);
      equal(encoder.decode("pd9djt9t"), 68719476730);
    });

    it("should handle 9-character encodings", () => {
      equal(encoder.encode(68719476731), "qd9djt9t");
      equal(encoder.encode(68719476731, 9), "qd9djt9tb");
      equal(encoder.encode(2199023255530, 9), "prz7fbq9z");
      equal(encoder.decode("qd9djt9t"), 68719476731);
      equal(encoder.decode("qd9djt9tb"), 68719476731);
      equal(encoder.decode("prz7fbq9z"), 2199023255530);
    });

    it("should handle 10-character encodings", () => {
      equal(encoder.encode(2199023255531), "qrz7fbq9z");
      equal(encoder.encode(2199023255531, 10), "qrz7fbq9zb");
      equal(encoder.encode(35184372088776, 10), "bzbhvdmvks");
      equal(encoder.decode("qrz7fbq9z"), 2199023255531);
      equal(encoder.decode("qrz7fbq9zb"), 2199023255531);
      equal(encoder.decode("bzbhvdmvks"), 35184372088776);
    });

    it("should handle 11-character encodings", () => {
      equal(encoder.encode(35184372088777), "czbhvdmvks");
      equal(encoder.encode(35184372088777, 11), "czbhvdmvksb");
      equal(encoder.encode(1125899906842596, 11), "rngxjrzpgyx");
      equal(encoder.decode("czbhvdmvks"), 35184372088777);
      equal(encoder.decode("czbhvdmvksb"), 35184372088777);
      equal(encoder.decode("rngxjrzpgyx"), 1125899906842596);
    });

    it("should handle 12-character encodings", () => {
      equal(encoder.encode(1125899906842597n), "sngxjrzpgyx");
      equal(encoder.encode(1125899906842597n, 12), "sngxjrzpgyxb");
      equal(encoder.encode(36028797018963912n, 12), "bf757mbp7hw9");
      equal(encoder.decode("sngxjrzpgyx"), 1125899906842597);
      equal(encoder.decode("sngxjrzpgyx", true), 1125899906842597n);
      equal(encoder.decode("sngxjrzpgyxb"), 1125899906842597n);
      equal(encoder.decode("bf757mbp7hw9"), 36028797018963912n);
    });

    it("should handle 13-character encodings", () => {
      equal(encoder.encode(36028797018963913n), "cf757mbp7hw9");
      equal(encoder.encode(36028797018963913n, 13), "cf757mbp7hw9b");
      equal(encoder.encode(576460752303423432n, 13), "bqztj9hw77zyv");
      equal(encoder.decode("cf757mbp7hw9"), 36028797018963913n);
      equal(encoder.decode("cf757mbp7hw9b"), 36028797018963913n);
      equal(encoder.decode("bqztj9hw77zyv"), 576460752303423432n);
    });

    it("should handle 14-character encodings", () => {
      equal(encoder.encode(576460752303423433n), "cqztj9hw77zyv");
      equal(encoder.encode(576460752303423433n, 14), "cqztj9hw77zyvb");
      equal(encoder.encode(18446744073709551556n, 14), "gwcyzb9vhttdc5");
      equal(encoder.decode("cqztj9hw77zyv"), 576460752303423433n);
      equal(encoder.decode("cqztj9hw77zyvb"), 576460752303423433n);
      equal(encoder.decode("gwcyzb9vhttdc5"), 18446744073709551556n);
    });

    it("should handle larger than 64-bit bigints", () => {
      equal(encoder.encode(18446744073709551616n), "bbbbbbbbbbbbbbc");
      equal(encoder.encode(18446744073709551616n, 7), "bbbbbbbbbbbbbbcbbbbbb");
      equal(encoder.encode(987654321098765432109876543210n), "ycz7qgnf5w7rb55f5qbgwq");
      equal(encoder.encode(987654321098765432109876543210n, 14), "ycz7qgnf5w7rb55f5qbgwqbbbbbb");

      equal(encoder.decode("bbbbbbbbbbbbbbc", true), 18446744073709551616n);
      equal(encoder.decode("bbbbbbbbbbbbbbcbbbbbb", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("bbbbbbbbbbbbbbc"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("bbbbbbbbbbbbbbcbbbbbb"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("ycz7qgnf5w7rb55f5qbgwq", true), 987654321098765432109876543210n);
      equal(encoder.decode("ycz7qgnf5w7rb55f5qbgwqbbbb", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("ycz7qgnf5w7rb55f5qbgwq"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("ycz7qgnf5w7rb55f5qbgwqbbbbbb"),
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
        "bbbbbbbbbbbbbbc"
      );
      equal(
        encoder.encode(
          new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]).buffer,
          6
        ),
        "bbbbbbbbbbbbbbcbbbbb"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
          ]).buffer
        ),
        "ycz7qgnf5w7rb55f5qbgwq"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0
          ]).buffer,
          12
        ),
        "ycz7qgnf5w7rb55f5qbgwqbbbb"
      );

      equal(encoder.decode("bbbbbbbbbbbbbbc", true), 18446744073709551616n);
      equal(encoder.decode("bbbbbbbbbbbbbbcbbbbb", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("bbbbbbbbbbbbbbc"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("bbbbbbbbbbbbbbcbbbbb"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("ycz7qgnf5w7rb55f5qbgwq", true), 987654321098765432109876543210n);
      equal(encoder.decode("ycz7qgnf5w7rb55f5qbgwqbbbb", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("ycz7qgnf5w7rb55f5qbgwq"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("ycz7qgnf5w7rb55f5qbgwqbbbb"),
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
      equal(encoder.encode(0, 1), "r");
      equal(encoder.decode("r"), 0);
    });

    it("should handle 1-character encodings", () => {
      equal(encoder.encode(1), "q");
      equal(encoder.encode(1, 1), "q");
      equal(encoder.encode(1, 2), "qr");
      equal(encoder.encode(1, 3), "qrr");
      equal(encoder.encode(40, 1), "n");
      equal(encoder.encode(40, 2), "nr");
      equal(encoder.encode(40, 3), "nrr");
      equal(encoder.decode("q"), 1);
      equal(encoder.decode("qr"), 1);
      equal(encoder.decode("qrr"), 1);
      equal(encoder.decode("n"), 40);
      equal(encoder.decode("nr"), 40);
      equal(encoder.decode("nrr"), 40);
    });

    it("should handle 2-character encodings", () => {
      equal(encoder.encode(41), "rq");
      equal(encoder.encode(41, 2), "rq");
      equal(encoder.encode(1020, 2), "gK");
      equal(encoder.decode("rq"), 41);
      equal(encoder.decode("gK"), 1020);
    });

    it("should handle 3-character encodings", () => {
      equal(encoder.encode(1021), "ZK");
      equal(encoder.encode(1021, 3), "ZKr");
      equal(encoder.encode(65520, 3), "TnW");
      equal(encoder.decode("ZK"), 1021);
      equal(encoder.decode("ZKr"), 1021);
      equal(encoder.decode("TnW"), 65520);
    });

    it("should handle 4-character encodings", () => {
      equal(encoder.encode(65521), "QnW");
      equal(encoder.encode(65521, 4), "QnWr");
      equal(encoder.encode(2097142, 4), "BsCM");
      equal(encoder.decode("QnW"), 65521);
      equal(encoder.decode("QnWr"), 65521);
      equal(encoder.decode("BsCM"), 2097142);
    });

    it("should handle 5-character encodings", () => {
      equal(encoder.encode(2097143), "VsCM");
      equal(encoder.encode(2097143, 5), "VsCMr");
      equal(encoder.encode(67108858, 5), "CnHMX");
      equal(encoder.decode("VsCM"), 2097143);
      equal(encoder.decode("VsCMr"), 2097143);
      equal(encoder.decode("CnHMX"), 67108858);
    });

    it("should handle 6-character encodings", () => {
      equal(encoder.encode(67108859), "wnHMX");
      equal(encoder.encode(67108859, 6), "wnHMXr");
      equal(encoder.encode(4294967290, 6), "GbxWTZ");
      equal(encoder.decode("wnHMX"), 67108859);
      equal(encoder.decode("wnHMXr"), 67108859);
      equal(encoder.decode("GbxWTZ"), 4294967290);
    });

    it("should handle 7-character encodings", () => {
      equal(encoder.encode(4294967291), "DbxWTZ");
      equal(encoder.encode(4294967291, 7), "DbxWTZr");
      equal(encoder.encode(137438953446, 7), "xTTFkWH");
      equal(encoder.decode("DbxWTZ"), 4294967291);
      equal(encoder.decode("DbxWTZr"), 4294967291);
      equal(encoder.decode("xTTFkWH"), 137438953446);
    });

    it("should handle 8-character encodings", () => {
      equal(encoder.encode(137438953447), "kTTFkWH");
      equal(encoder.encode(137438953447, 8), "kTTFkWHr");
      equal(encoder.encode(4398046511092, 8), "BdJzxgXs");
      equal(encoder.decode("kTTFkWH"), 137438953447);
      equal(encoder.decode("kTTFkWHr"), 137438953447);
      equal(encoder.decode("BdJzxgXs"), 4398046511092);
    });

    it("should handle 9-character encodings", () => {
      equal(encoder.encode(4398046511093), "VdJzxgXs");
      equal(encoder.encode(4398046511093, 9), "VdJzxgXsr");
      equal(encoder.encode(281474976710596, 9), "DSRByKkxF");
      equal(encoder.decode("VdJzxgXs"), 4398046511093);
      equal(encoder.decode("VdJzxgXsr"), 4398046511093);
      equal(encoder.decode("DSRByKkxF"), 281474976710596);
    });

    it("should handle 10-character encodings", () => {
      equal(encoder.encode(281474976710597), "BSRByKkxF");
      equal(encoder.encode(281474976710597, 10), "BSRByKkxFr");
      equal(encoder.encode(9007199254740880, 10), "QYQQYFqqmp");
      equal(encoder.decode("BSRByKkxF"), 281474976710597);
      equal(encoder.decode("BSRByKkxFr"), 281474976710597);
      equal(encoder.decode("QYQQYFqqmp"), 9007199254740880);
    });

    it("should handle 11-character encodings", () => {
      equal(encoder.encode(9007199254740881n), "hYQQYFqqmp");
      equal(encoder.encode(9007199254740881n, 11), "hYQQYFqqmpr");
      equal(encoder.encode(288230376151711716n, 11), "QYcRvXwBRNm");
      equal(encoder.decode("hYQQYFqqmp"), 9007199254740881);
      equal(encoder.decode("hYQQYFqqmp", true), 9007199254740881n);
      equal(encoder.decode("hYQQYFqqmpr"), 9007199254740881n);
      equal(encoder.decode("QYcRvXwBRNm"), 288230376151711716n);
    });

    it("should handle 12-character encodings", () => {
      equal(encoder.encode(288230376151711717n), "hYcRvXwBRNm");
      equal(encoder.encode(288230376151711717n, 12), "hYcRvXwBRNmr");
      equal(encoder.encode(18446744073709551556n, 12), "WChnhdnvxbmB");
      equal(encoder.decode("hYcRvXwBRNm"), 288230376151711717n);
      equal(encoder.decode("hYcRvXwBRNmr"), 288230376151711717n);
      equal(encoder.decode("WChnhdnvxbmB"), 18446744073709551556n);
    });

    it("should handle larger than 64-bit bigints", () => {
      equal(encoder.encode(18446744073709551616n), "rrrrrrrrrrrrq");
      equal(encoder.encode(18446744073709551616n, 6), "rrrrrrrrrrrrqrrrrr");
      equal(encoder.encode(987654321098765432109876543210n), "HNCJNWscMMNBfSMRPkk");
      equal(encoder.encode(987654321098765432109876543210n, 12), "HNCJNWscMMNBfSMRPkkrrrrr");

      equal(encoder.decode("rrrrrrrrrrrrq", true), 18446744073709551616n);
      equal(encoder.decode("rrrrrrrrrrrrqrrrrr", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("rrrrrrrrrrrrq"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("rrrrrrrrrrrrqrrrrr"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("HNCJNWscMMNBfSMRPkk", true), 987654321098765432109876543210n);
      equal(encoder.decode("HNCJNWscMMNBfSMRPkkrrrrr", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("HNCJNWscMMNBfSMRPkk"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("HNCJNWscMMNBfSMRPkkrrrrr"),
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
        "rrrrrrrrrrrrq"
      );
      equal(
        encoder.encode(
          new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]).buffer,
          6
        ),
        "rrrrrrrrrrrrqrrrrr"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
          ]).buffer
        ),
        "HNCJNWscMMNBfSMRPkk"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0
          ]).buffer,
          12
        ),
        "HNCJNWscMMNBfSMRPkkrrrrr"
      );

      equal(encoder.decode("rrrrrrrrrrrrq", true), 18446744073709551616n);
      equal(encoder.decode("rrrrrrrrrrrrqrrrrr", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("rrrrrrrrrrrrq"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("rrrrrrrrrrrrqrrrrr"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("HNCJNWscMMNBfSMRPkk", true), 987654321098765432109876543210n);
      equal(encoder.decode("HNCJNWscMMNBfSMRPkkrrrrr", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("HNCJNWscMMNBfSMRPkk"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("HNCJNWscMMNBfSMRPkkrrrrr"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
    });
  });

  describe("Seeded, safe mode", () => {
    const encoder = new KeymaskEncoder(new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8,
      9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24
    ]).buffer, true);

    it("should handle null character encodings", () => {
      equal(encoder.encode(0), "");
      equal(encoder.encode(0, 1), "q");
      equal(encoder.decode("q"), 0);
    });

    it("should handle 1-character encodings", () => {
      equal(encoder.encode(1), "g");
      equal(encoder.encode(1, 1), "g");
      equal(encoder.encode(1, 2), "gq");
      equal(encoder.encode(1, 3), "gqq");
      equal(encoder.encode(22, 1), "v");
      equal(encoder.encode(22, 2), "vq");
      equal(encoder.encode(22, 3), "vqq");
      equal(encoder.decode("g"), 1);
      equal(encoder.decode("gq"), 1);
      equal(encoder.decode("gqq"), 1);
      equal(encoder.decode("v"), 22);
      equal(encoder.decode("vq"), 22);
      equal(encoder.decode("vqq"), 22);
    });

    it("should handle 2-character encodings", () => {
      equal(encoder.encode(23), "w");
      equal(encoder.encode(23, 2), "wq");
      equal(encoder.encode(508, 2), "nm");
      equal(encoder.decode("w"), 23);
      equal(encoder.decode("wq"), 23);
      equal(encoder.decode("nm"), 508);
    });

    it("should handle 3-character encodings", () => {
      equal(encoder.encode(509), "sm");
      equal(encoder.encode(509, 3), "smq");
      equal(encoder.encode(8190, 3), "dsz");
      equal(encoder.decode("sm"), 509);
      equal(encoder.decode("smq"), 509);
      equal(encoder.decode("dsz"), 8190);
    });

    it("should handle 4-character encodings", () => {
      equal(encoder.encode(8191), "9sz");
      equal(encoder.encode(8191, 4), "9szq");
      equal(encoder.encode(262138, 4), "tfwh");
      equal(encoder.decode("9sz"), 8191);
      equal(encoder.decode("9szq"), 8191);
      equal(encoder.decode("tfwh"), 262138);
    });

    it("should handle 5-character encodings", () => {
      equal(encoder.encode(262139), "yfwh");
      equal(encoder.encode(262139, 5), "yfwhq");
      equal(encoder.encode(4194300, 5), "5hjx5");
      equal(encoder.decode("yfwh"), 262139);
      equal(encoder.decode("yfwhq"), 262139);
      equal(encoder.decode("5hjx5"), 4194300);
    });

    it("should handle 6-character encodings", () => {
      equal(encoder.encode(4194301), "phjx5");
      equal(encoder.encode(4194301, 6), "phjx5q");
      equal(encoder.encode(134217688, 6), "cbqpkc");
      equal(encoder.decode("phjx5"), 4194301);
      equal(encoder.decode("phjx5q"), 4194301);
      equal(encoder.decode("cbqpkc"), 134217688);
    });

    it("should handle 7-character encodings", () => {
      equal(encoder.encode(134217689), "7bqpkc");
      equal(encoder.encode(134217689, 7), "7bqpkcq");
      equal(encoder.encode(4294967290, 7), "ttnjjyv");
      equal(encoder.decode("7bqpkc"), 134217689);
      equal(encoder.decode("7bqpkcq"), 134217689);
      equal(encoder.decode("ttnjjyv"), 4294967290);
    });

    it("should handle 8-character encodings", () => {
      equal(encoder.encode(4294967291), "ytnjjyv");
      equal(encoder.encode(4294967291, 8), "ytnjjyvq");
      equal(encoder.encode(68719476730, 8), "tfwfdzwz");
      equal(encoder.decode("ytnjjyv"), 4294967291);
      equal(encoder.decode("ytnjjyvq"), 4294967291);
      equal(encoder.decode("tfwfdzwz"), 68719476730);
    });

    it("should handle 9-character encodings", () => {
      equal(encoder.encode(68719476731), "yfwfdzwz");
      equal(encoder.encode(68719476731, 9), "yfwfdzwzq");
      equal(encoder.encode(2199023255530, 9), "t5bvrqywb");
      equal(encoder.decode("yfwfdzwz"), 68719476731);
      equal(encoder.decode("yfwfdzwzq"), 68719476731);
      equal(encoder.decode("t5bvrqywb"), 2199023255530);
    });

    it("should handle 10-character encodings", () => {
      equal(encoder.encode(2199023255531), "y5bvrqywb");
      equal(encoder.encode(2199023255531, 10), "y5bvrqywbq");
      equal(encoder.encode(35184372088776, 10), "qbqsxf2x9p");
      equal(encoder.decode("y5bvrqywb"), 2199023255531);
      equal(encoder.decode("y5bvrqywbq"), 2199023255531);
      equal(encoder.decode("qbqsxf2x9p"), 35184372088776);
    });

    it("should handle 11-character encodings", () => {
      equal(encoder.encode(35184372088777), "gbqsxf2x9p");
      equal(encoder.encode(35184372088777, 11), "gbqsxf2x9pq");
      equal(encoder.encode(1125899906842596, 11), "5jn7d5btnh7");
      equal(encoder.decode("gbqsxf2x9p"), 35184372088777);
      equal(encoder.decode("gbqsxf2x9pq"), 35184372088777);
      equal(encoder.decode("5jn7d5btnh7"), 1125899906842596);
    });

    it("should handle 12-character encodings", () => {
      equal(encoder.encode(1125899906842597), "pjn7d5btnh7");
      equal(encoder.encode(1125899906842597n, 12), "pjn7d5btnh7q");
      equal(encoder.encode(36028797018963912n, 12), "qrvmv2qtvscw");
      equal(encoder.decode("pjn7d5btnh7"), 1125899906842597);
      equal(encoder.decode("pjn7d5btnh7", true), 1125899906842597n);
      equal(encoder.decode("pjn7d5btnh7q"), 1125899906842597n);
      equal(encoder.decode("qrvmv2qtvscw"), 36028797018963912n);
    });

    it("should handle 13-character encodings", () => {
      equal(encoder.encode(36028797018963913n), "grvmv2qtvscw");
      equal(encoder.encode(36028797018963913n, 13), "grvmv2qtvscwq");
      equal(encoder.encode(576460752303423432n, 13), "qybzdwscvvbhx");
      equal(encoder.decode("grvmv2qtvscw"), 36028797018963913n);
      equal(encoder.decode("grvmv2qtvscwq"), 36028797018963913n);
      equal(encoder.decode("qybzdwscvvbhx"), 576460752303423432n);
    });

    it("should handle 14-character encodings", () => {
      equal(encoder.encode(576460752303423433n), "gybzdwscvvbhx");
      equal(encoder.encode(576460752303423433n, 14), "gybzdwscvvbhxq");
      equal(encoder.encode(18446744073709551556n, 14), "ncghbqwxszzfgm");
      equal(encoder.decode("gybzdwscvvbhx"), 576460752303423433n);
      equal(encoder.decode("gybzdwscvvbhxq"), 576460752303423433n);
      equal(encoder.decode("ncghbqwxszzfgm"), 18446744073709551556n);
    });

    it("should handle larger than 64-bit bigints", () => {
      equal(encoder.encode(18446744073709551616n), "qqqqqqqqqqqqqqg");
      equal(encoder.encode(18446744073709551616n, 6), "qqqqqqqqqqqqqqgqqqqq");
      equal(encoder.encode(987654321098765432109876543210n), "hgbvynjrmcv5qmmrmyqncy");
      equal(encoder.encode(987654321098765432109876543210n, 12), "hgbvynjrmcv5qmmrmyqncyqqqq");

      equal(encoder.decode("qqqqqqqqqqqqqqg", true), 18446744073709551616n);
      equal(encoder.decode("qqqqqqqqqqqqqqgqqqqq", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("qqqqqqqqqqqqqqg"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("qqqqqqqqqqqqqqgqqqqq"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("hgbvynjrmcv5qmmrmyqncy", true), 987654321098765432109876543210n);
      equal(encoder.decode("hgbvynjrmcv5qmmrmyqncyqqqq", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("hgbvynjrmcv5qmmrmyqncy"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("hgbvynjrmcv5qmmrmyqncyqqqq"),
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
        "qqqqqqqqqqqqqqg"
      );
      equal(
        encoder.encode(
          new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]).buffer,
          6
        ),
        "qqqqqqqqqqqqqqgqqqqq"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
          ]).buffer
        ),
        "hgbvynjrmcv5qmmrmyqncy"
      );
      equal(
        encoder.encode(
          new Uint8Array([
            0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
            0x9d, 0x81, 0x48, 0x77, 0x0c, 0
          ]).buffer,
          12
        ),
        "hgbvynjrmcv5qmmrmyqncyqqqq"
      );

      equal(encoder.decode("qqqqqqqqqqqqqqg", true), 18446744073709551616n);
      equal(encoder.decode("qqqqqqqqqqqqqqgqqqqq", true), 18446744073709551616n);

      deepEqual(
        encoder.decode("qqqqqqqqqqqqqqg"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);
      deepEqual(
        encoder.decode("qqqqqqqqqqqqqqgqqqqq"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).buffer);

      equal(encoder.decode("hgbvynjrmcv5qmmrmyqncy", true), 987654321098765432109876543210n);
      equal(encoder.decode("hgbvynjrmcv5qmmrmyqncyqqqq", true), 987654321098765432109876543210n);

      deepEqual(
        encoder.decode("hgbvynjrmcv5qmmrmyqncy"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
      deepEqual(
        encoder.decode("hgbvynjrmcv5qmmrmyqncyqqqq"),
        new Uint8Array([
          0xea, 0x7e, 0xc6, 0xd1, 0x38, 0x24, 0xb6, 0xff,
          0x9d, 0x81, 0x48, 0x77, 0x0c, 0, 0, 0
        ]).buffer
      );
    });
  });
});