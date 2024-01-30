import { equal, deepEqual } from "node:assert/strict";
import { KeymaskEncoder, Keymask } from "../src/";

describe("Keymask", () => {
  describe("Default options", () => {
    const keymask = new Keymask();

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "c");
      equal(keymask.mask(40), "Y");
      equal(keymask.unmask("c"), 1);
      equal(keymask.unmask("Y"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "LT");
      equal(keymask.mask(1020), "Rd");
      equal(keymask.unmask("LT"), 41);
      equal(keymask.unmask("Rd"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "Lfc");
      equal(keymask.mask(65520), "dhk");
      equal(keymask.unmask("Lfc"), 1021);
      equal(keymask.unmask("dhk"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "NcPL");
      equal(keymask.mask(2097142), "NzPT");
      equal(keymask.unmask("NcPL"), 65521);
      equal(keymask.unmask("NzPT"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "bWGJC");
      equal(keymask.mask(67108858), "dnBsV");
      equal(keymask.unmask("bWGJC"), 2097143);
      equal(keymask.unmask("dnBsV"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "WkCBvr");
      equal(keymask.mask(4294967290), "mSJnSd");
      equal(keymask.unmask("WkCBvr"), 67108859);
      equal(keymask.unmask("mSJnSd"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "ncbyPTV");
      equal(keymask.mask(137438953446), "mGJFsQc");
      equal(keymask.unmask("ncbyPTV"), 4294967291);
      equal(keymask.unmask("mGJFsQc"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "vwmKZxKZ");
      equal(keymask.mask(4398046511092), "GwdjRScK");
      equal(keymask.unmask("vwmKZxKZ"), 137438953447);
      equal(keymask.unmask("GwdjRScK"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "gqFHjWmxF");
      equal(keymask.mask(281474976710596), "wZVHVzvrj");
      equal(keymask.unmask("gqFHjWmxF"), 4398046511093);
      equal(keymask.unmask("wZVHVzvrj"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "nWRWYwnkhD");
      equal(keymask.mask(9007199254740880), "KdCvLBSKJb");
      equal(keymask.unmask("nWRWYwnkhD"), 281474976710597);
      equal(keymask.unmask("KdCvLBSKJb"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "NjQkwmfKKVP");
      equal(keymask.mask(288230376151711716n), "TQmxMJKgrNW");
      equal(keymask.unmask("NjQkwmfKKVP"), 9007199254740881n);
      equal(keymask.unmask("TQmxMJKgrNW"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "DjfkCZLtcBLn");
      equal(keymask.mask(18446744073709551556n), "YcWfgzxKYXFW");
      equal(keymask.unmask("DjfkCZLtcBLn"), 288230376151711717n);
      equal(keymask.unmask("YcWfgzxKYXFW"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "NpRcJcFtscDkjdfXLfFWGtqR");
      equal(keymask.mask(buffer2), "HXmKjxGXGXBKcK");
      deepEqual(keymask.unmask("NpRcJcFtscDkjdfXLfFWGtqR"), buffer1);
      deepEqual(keymask.unmask("HXmKjxGXGXBKcK"), buffer2);
    });
  });

  describe("Integer output", () => {
    const keymask = new Keymask({ type: "integer" });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "c");
      equal(keymask.mask(40), "Y");
      equal(keymask.unmask("c"), 1);
      equal(keymask.unmask("Y"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "LT");
      equal(keymask.mask(1020), "Rd");
      equal(keymask.unmask("LT"), 41);
      equal(keymask.unmask("Rd"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "Lfc");
      equal(keymask.mask(65520), "dhk");
      equal(keymask.unmask("Lfc"), 1021);
      equal(keymask.unmask("dhk"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "NcPL");
      equal(keymask.mask(2097142), "NzPT");
      equal(keymask.unmask("NcPL"), 65521);
      equal(keymask.unmask("NzPT"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "bWGJC");
      equal(keymask.mask(67108858), "dnBsV");
      equal(keymask.unmask("bWGJC"), 2097143);
      equal(keymask.unmask("dnBsV"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "WkCBvr");
      equal(keymask.mask(4294967290), "mSJnSd");
      equal(keymask.unmask("WkCBvr"), 67108859);
      equal(keymask.unmask("mSJnSd"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "ncbyPTV");
      equal(keymask.mask(137438953446), "mGJFsQc");
      equal(keymask.unmask("ncbyPTV"), 4294967291);
      equal(keymask.unmask("mGJFsQc"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "vwmKZxKZ");
      equal(keymask.mask(4398046511092), "GwdjRScK");
      equal(keymask.unmask("vwmKZxKZ"), 137438953447);
      equal(keymask.unmask("GwdjRScK"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "gqFHjWmxF");
      equal(keymask.mask(281474976710596), "wZVHVzvrj");
      equal(keymask.unmask("gqFHjWmxF"), 4398046511093);
      equal(keymask.unmask("wZVHVzvrj"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "nWRWYwnkhD");
      equal(keymask.mask(9007199254740880), "KdCvLBSKJb");
      equal(keymask.unmask("nWRWYwnkhD"), 281474976710597);
      equal(keymask.unmask("KdCvLBSKJb"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "NjQkwmfKKVP");
      equal(keymask.mask(288230376151711716n), "TQmxMJKgrNW");
      equal(keymask.unmask("NjQkwmfKKVP"), 9007199254740881n);
      equal(keymask.unmask("TQmxMJKgrNW"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "DjfkCZLtcBLn");
      equal(keymask.mask(18446744073709551556n), "YcWfgzxKYXFW");
      equal(keymask.unmask("DjfkCZLtcBLn"), 288230376151711717n);
      equal(keymask.unmask("YcWfgzxKYXFW"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "NpRcJcFtscDkjdfXLfFWGtqR");
      equal(keymask.mask(buffer2), "HXmKjxGXGXBKcK");
      deepEqual(keymask.unmask("NpRcJcFtscDkjdfXLfFWGtqR"), 21345817372864405881847059188222722561n);
      deepEqual(keymask.unmask("HXmKjxGXGXBKcK"), 1832590477950520989195n);
    });
  });

  describe("Bigint output", () => {
    const keymask = new Keymask({ type: "bigint" });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1n), "c");
      equal(keymask.mask(40n), "Y");
      equal(keymask.unmask("c"), 1n);
      equal(keymask.unmask("Y"), 40n);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41n), "LT");
      equal(keymask.mask(1020n), "Rd");
      equal(keymask.unmask("LT"), 41n);
      equal(keymask.unmask("Rd"), 1020n);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021n), "Lfc");
      equal(keymask.mask(65520n), "dhk");
      equal(keymask.unmask("Lfc"), 1021n);
      equal(keymask.unmask("dhk"), 65520n);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521n), "NcPL");
      equal(keymask.mask(2097142n), "NzPT");
      equal(keymask.unmask("NcPL"), 65521n);
      equal(keymask.unmask("NzPT"), 2097142n);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143n), "bWGJC");
      equal(keymask.mask(67108858n), "dnBsV");
      equal(keymask.unmask("bWGJC"), 2097143n);
      equal(keymask.unmask("dnBsV"), 67108858n);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859n), "WkCBvr");
      equal(keymask.mask(4294967290n), "mSJnSd");
      equal(keymask.unmask("WkCBvr"), 67108859n);
      equal(keymask.unmask("mSJnSd"), 4294967290n);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291n), "ncbyPTV");
      equal(keymask.mask(137438953446n), "mGJFsQc");
      equal(keymask.unmask("ncbyPTV"), 4294967291n);
      equal(keymask.unmask("mGJFsQc"), 137438953446n);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447n), "vwmKZxKZ");
      equal(keymask.mask(4398046511092n), "GwdjRScK");
      equal(keymask.unmask("vwmKZxKZ"), 137438953447n);
      equal(keymask.unmask("GwdjRScK"), 4398046511092n);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093n), "gqFHjWmxF");
      equal(keymask.mask(281474976710596n), "wZVHVzvrj");
      equal(keymask.unmask("gqFHjWmxF"), 4398046511093n);
      equal(keymask.unmask("wZVHVzvrj"), 281474976710596n);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597n), "nWRWYwnkhD");
      equal(keymask.mask(9007199254740880n), "KdCvLBSKJb");
      equal(keymask.unmask("nWRWYwnkhD"), 281474976710597n);
      equal(keymask.unmask("KdCvLBSKJb"), 9007199254740880n);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "NjQkwmfKKVP");
      equal(keymask.mask(288230376151711716n), "TQmxMJKgrNW");
      equal(keymask.unmask("NjQkwmfKKVP"), 9007199254740881n);
      equal(keymask.unmask("TQmxMJKgrNW"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "DjfkCZLtcBLn");
      equal(keymask.mask(18446744073709551556n), "YcWfgzxKYXFW");
      equal(keymask.unmask("DjfkCZLtcBLn"), 288230376151711717n);
      equal(keymask.unmask("YcWfgzxKYXFW"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "NpRcJcFtscDkjdfXLfFWGtqR");
      equal(keymask.mask(buffer2), "HXmKjxGXGXBKcK");
      deepEqual(keymask.unmask("NpRcJcFtscDkjdfXLfFWGtqR"), 21345817372864405881847059188222722561n);
      deepEqual(keymask.unmask("HXmKjxGXGXBKcK"), 1832590477950520989195n);
    });
  });

  describe("String output", () => {
    const keymask = new Keymask({ type: "string" });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask("1"), "c");
      equal(keymask.mask("40"), "Y");
      equal(keymask.unmask("c"), "1");
      equal(keymask.unmask("Y"), "40");
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask("41"), "LT");
      equal(keymask.mask("1020"), "Rd");
      equal(keymask.unmask("LT"), "41");
      equal(keymask.unmask("Rd"), "1020");
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask("1021"), "Lfc");
      equal(keymask.mask("65520"), "dhk");
      equal(keymask.unmask("Lfc"), "1021");
      equal(keymask.unmask("dhk"), "65520");
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask("65521"), "NcPL");
      equal(keymask.mask("2097142"), "NzPT");
      equal(keymask.unmask("NcPL"), "65521");
      equal(keymask.unmask("NzPT"), "2097142");
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask("2097143"), "bWGJC");
      equal(keymask.mask("67108858"), "dnBsV");
      equal(keymask.unmask("bWGJC"), "2097143");
      equal(keymask.unmask("dnBsV"), "67108858");
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask("67108859"), "WkCBvr");
      equal(keymask.mask("4294967290"), "mSJnSd");
      equal(keymask.unmask("WkCBvr"), "67108859");
      equal(keymask.unmask("mSJnSd"), "4294967290");
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask("4294967291"), "ncbyPTV");
      equal(keymask.mask("137438953446"), "mGJFsQc");
      equal(keymask.unmask("ncbyPTV"), "4294967291");
      equal(keymask.unmask("mGJFsQc"), "137438953446");
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask("137438953447"), "vwmKZxKZ");
      equal(keymask.mask("4398046511092"), "GwdjRScK");
      equal(keymask.unmask("vwmKZxKZ"), "137438953447");
      equal(keymask.unmask("GwdjRScK"), "4398046511092");
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask("4398046511093"), "gqFHjWmxF");
      equal(keymask.mask("281474976710596"), "wZVHVzvrj");
      equal(keymask.unmask("gqFHjWmxF"), "4398046511093");
      equal(keymask.unmask("wZVHVzvrj"), "281474976710596");
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask("281474976710597"), "nWRWYwnkhD");
      equal(keymask.mask("9007199254740880"), "KdCvLBSKJb");
      equal(keymask.unmask("nWRWYwnkhD"), "281474976710597");
      equal(keymask.unmask("KdCvLBSKJb"), "9007199254740880");
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask("9007199254740881"), "NjQkwmfKKVP");
      equal(keymask.mask("288230376151711716"), "TQmxMJKgrNW");
      equal(keymask.unmask("NjQkwmfKKVP"), "9007199254740881");
      equal(keymask.unmask("TQmxMJKgrNW"), "288230376151711716");
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask("288230376151711717"), "DjfkCZLtcBLn");
      equal(keymask.mask("18446744073709551556"), "YcWfgzxKYXFW");
      equal(keymask.unmask("DjfkCZLtcBLn"), "288230376151711717");
      equal(keymask.unmask("YcWfgzxKYXFW"), "18446744073709551556");
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "NpRcJcFtscDkjdfXLfFWGtqR");
      equal(keymask.mask(buffer2), "HXmKjxGXGXBKcK");
      deepEqual(keymask.unmask("NpRcJcFtscDkjdfXLfFWGtqR"), "21345817372864405881847059188222722561");
      deepEqual(keymask.unmask("HXmKjxGXGXBKcK"), "1832590477950520989195");
    });
  });

  describe("ArrayBuffer output", () => {
    const keymask = new Keymask({type: "buffer"});

    it("should mask and unmask in range 1", () => {
      const buffer1 = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0]).buffer;
      const buffer2 = new Uint8Array([40, 0, 0, 0, 0, 0, 0, 0]).buffer;
      equal(keymask.mask(1n), "c");
      equal(keymask.mask(40n), "Y");
      equal(keymask.mask(buffer1), "c");
      equal(keymask.mask(buffer2), "Y");
      deepEqual(keymask.unmask("c"), buffer1);
      deepEqual(keymask.unmask("Y"), buffer2);
    });

    it("should mask and unmask in range 2", () => {
      const buffer1 = new Uint8Array([41, 0, 0, 0, 0, 0, 0, 0]).buffer;
      const buffer2 = new Uint8Array([252, 3, 0, 0, 0, 0, 0, 0]).buffer;
      equal(keymask.mask(41n), "LT");
      equal(keymask.mask(1020n), "Rd");
      equal(keymask.mask(buffer1), "LT");
      equal(keymask.mask(buffer2), "Rd");
      deepEqual(keymask.unmask("LT"), buffer1);
      deepEqual(keymask.unmask("Rd"), buffer2);
    });

    it("should mask and unmask in range 3", () => {
      const buffer1 = new Uint8Array([253, 3, 0, 0, 0, 0, 0, 0]).buffer;
      const buffer2 = new Uint8Array([240, 255, 0, 0, 0, 0, 0, 0]).buffer;
      equal(keymask.mask(1021n), "Lfc");
      equal(keymask.mask(65520n), "dhk");
      equal(keymask.mask(buffer1), "Lfc");
      equal(keymask.mask(buffer2), "dhk");
      deepEqual(keymask.unmask("Lfc"), buffer1);
      deepEqual(keymask.unmask("dhk"), buffer2);
    });

    it("should mask and unmask in range 4", () => {
      const buffer1 = new Uint8Array([241, 255, 0, 0, 0, 0, 0, 0]).buffer;
      const buffer2 = new Uint8Array([246, 255, 31, 0, 0, 0, 0, 0]).buffer;
      equal(keymask.mask(65521n), "NcPL");
      equal(keymask.mask(2097142n), "NzPT");
      equal(keymask.mask(buffer1), "NcPL");
      equal(keymask.mask(buffer2), "NzPT");
      deepEqual(keymask.unmask("NcPL"), buffer1);
      deepEqual(keymask.unmask("NzPT"), buffer2);
    });

    it("should mask and unmask in range 5", () => {
      const buffer1 = new Uint8Array([247, 255, 31, 0, 0, 0, 0, 0]).buffer;
      const buffer2 = new Uint8Array([250, 255, 255, 3, 0, 0, 0, 0]).buffer;
      equal(keymask.mask(2097143n), "bWGJC");
      equal(keymask.mask(67108858n), "dnBsV");
      equal(keymask.mask(buffer1), "bWGJC");
      equal(keymask.mask(buffer2), "dnBsV");
      deepEqual(keymask.unmask("bWGJC"), buffer1);
      deepEqual(keymask.unmask("dnBsV"), buffer2);
    });

    it("should mask and unmask in range 6", () => {
      const buffer1 = new Uint8Array([251, 255, 255, 3, 0, 0, 0, 0]).buffer;
      const buffer2 = new Uint8Array([250, 255, 255, 255, 0, 0, 0, 0]).buffer;
      equal(keymask.mask(67108859n), "WkCBvr");
      equal(keymask.mask(4294967290n), "mSJnSd");
      equal(keymask.mask(buffer1), "WkCBvr");
      equal(keymask.mask(buffer2), "mSJnSd");
      deepEqual(keymask.unmask("WkCBvr"), buffer1);
      deepEqual(keymask.unmask("mSJnSd"), buffer2);
    });

    it("should mask and unmask in range 7", () => {
      const buffer1 = new Uint8Array([251, 255, 255, 255, 0, 0, 0, 0]).buffer;
      const buffer2 = new Uint8Array([230, 255, 255, 255, 31, 0, 0, 0]).buffer;
      equal(keymask.mask(4294967291n), "ncbyPTV");
      equal(keymask.mask(137438953446n), "mGJFsQc");
      equal(keymask.mask(buffer1), "ncbyPTV");
      equal(keymask.mask(buffer2), "mGJFsQc");
      deepEqual(keymask.unmask("ncbyPTV"), buffer1);
      deepEqual(keymask.unmask("mGJFsQc"), buffer2);
    });

    it("should mask and unmask in range 8", () => {
      const buffer1 = new Uint8Array([231, 255, 255, 255, 31, 0, 0, 0]).buffer;
      const buffer2 = new Uint8Array([244, 255, 255, 255, 255, 3, 0, 0]).buffer;
      equal(keymask.mask(137438953447n), "vwmKZxKZ");
      equal(keymask.mask(4398046511092n), "GwdjRScK");
      equal(keymask.mask(buffer1), "vwmKZxKZ");
      equal(keymask.mask(buffer2), "GwdjRScK");
      deepEqual(keymask.unmask("vwmKZxKZ"), buffer1);
      deepEqual(keymask.unmask("GwdjRScK"), buffer2);
    });

    it("should mask and unmask in range 9", () => {
      const buffer1 = new Uint8Array([245, 255, 255, 255, 255, 3, 0, 0]).buffer;
      const buffer2 = new Uint8Array([196, 255, 255, 255, 255, 255, 0, 0]).buffer;
      equal(keymask.mask(4398046511093n), "gqFHjWmxF");
      equal(keymask.mask(281474976710596n), "wZVHVzvrj");
      equal(keymask.mask(buffer1), "gqFHjWmxF");
      equal(keymask.mask(buffer2), "wZVHVzvrj");
      deepEqual(keymask.unmask("gqFHjWmxF"), buffer1);
      deepEqual(keymask.unmask("wZVHVzvrj"), buffer2);
    });

    it("should mask and unmask in range 10", () => {
      const buffer1 = new Uint8Array([197, 255, 255, 255, 255, 255, 0, 0]).buffer;
      const buffer2 = new Uint8Array([144, 255, 255, 255, 255, 255, 31, 0]).buffer;
      equal(keymask.mask(281474976710597n), "nWRWYwnkhD");
      equal(keymask.mask(9007199254740880n), "KdCvLBSKJb");
      equal(keymask.mask(buffer1), "nWRWYwnkhD");
      equal(keymask.mask(buffer2), "KdCvLBSKJb");
      deepEqual(keymask.unmask("nWRWYwnkhD"), buffer1);
      deepEqual(keymask.unmask("KdCvLBSKJb"), buffer2);
    });

    it("should mask and unmask in range 11", () => {
      const buffer1 = new Uint8Array([145, 255, 255, 255, 255, 255, 31, 0]).buffer;
      const buffer2 = new Uint8Array([228, 255, 255, 255, 255, 255, 255, 3]).buffer;
      equal(keymask.mask(9007199254740881n), "NjQkwmfKKVP");
      equal(keymask.mask(288230376151711716n), "TQmxMJKgrNW");
      equal(keymask.mask(buffer1), "NjQkwmfKKVP");
      equal(keymask.mask(buffer2), "TQmxMJKgrNW");
      deepEqual(keymask.unmask("NjQkwmfKKVP"), buffer1);
      deepEqual(keymask.unmask("TQmxMJKgrNW"), buffer2);
    });

    it("should mask and unmask in range 12", () => {
      const buffer1 = new Uint8Array([229, 255, 255, 255, 255, 255, 255, 3]).buffer;
      const buffer2 = new Uint8Array([196, 255, 255, 255, 255, 255, 255, 255]).buffer;
      equal(keymask.mask(288230376151711717n), "DjfkCZLtcBLn");
      equal(keymask.mask(18446744073709551556n), "YcWfgzxKYXFW");
      equal(keymask.mask(buffer1), "DjfkCZLtcBLn");
      equal(keymask.mask(buffer2), "YcWfgzxKYXFW");
      deepEqual(keymask.unmask("DjfkCZLtcBLn"), buffer1);
      deepEqual(keymask.unmask("YcWfgzxKYXFW"), buffer2);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "NpRcJcFtscDkjdfXLfFWGtqR");
      equal(keymask.mask(buffer2), "HXmKjxGXGXBKcK");
      deepEqual(keymask.unmask("NpRcJcFtscDkjdfXLfFWGtqR"), buffer1);
      deepEqual(keymask.unmask("HXmKjxGXGXBKcK"), buffer2);
    });
  });

  describe("Defined size (single)", () => {
    const keymask = new Keymask({
      size: 7
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "dxvpXgJ");
      equal(keymask.mask(40), "CHfWmWG");
      equal(keymask.unmask("dxvpXgJ"), 1);
      equal(keymask.unmask("CHfWmWG"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "fDZLKDP");
      equal(keymask.mask(1020), "kWRXqnP");
      equal(keymask.unmask("fDZLKDP"), 41);
      equal(keymask.unmask("kWRXqnP"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "NTMMNTX");
      equal(keymask.mask(65520), "vvKyWTh");
      equal(keymask.unmask("NTMMNTX"), 1021);
      equal(keymask.unmask("vvKyWTh"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "KqCvfDG");
      equal(keymask.mask(2097142), "FyMFQPC");
      equal(keymask.unmask("KqCvfDG"), 65521);
      equal(keymask.unmask("FyMFQPC"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "hvHtnvK");
      equal(keymask.mask(67108858), "wpBXHgK");
      equal(keymask.unmask("hvHtnvK"), 2097143);
      equal(keymask.unmask("wpBXHgK"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "YmwLfMS");
      equal(keymask.mask(4294967290), "KggKsnM");
      equal(keymask.unmask("YmwLfMS"), 67108859);
      equal(keymask.unmask("KggKsnM"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "ncbyPTV");
      equal(keymask.mask(137438953446), "mGJFsQc");
      equal(keymask.unmask("ncbyPTV"), 4294967291);
      equal(keymask.unmask("mGJFsQc"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "vwmKZxKZ");
      equal(keymask.mask(4398046511092), "GwdjRScK");
      equal(keymask.unmask("vwmKZxKZ"), 137438953447);
      equal(keymask.unmask("GwdjRScK"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "gqFHjWmxF");
      equal(keymask.mask(281474976710596), "wZVHVzvrj");
      equal(keymask.unmask("gqFHjWmxF"), 4398046511093);
      equal(keymask.unmask("wZVHVzvrj"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "nWRWYwnkhD");
      equal(keymask.mask(9007199254740880), "KdCvLBSKJb");
      equal(keymask.unmask("nWRWYwnkhD"), 281474976710597);
      equal(keymask.unmask("KdCvLBSKJb"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "NjQkwmfKKVP");
      equal(keymask.mask(288230376151711716n), "TQmxMJKgrNW");
      equal(keymask.unmask("NjQkwmfKKVP"), 9007199254740881n);
      equal(keymask.unmask("TQmxMJKgrNW"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "DjfkCZLtcBLn");
      equal(keymask.mask(18446744073709551556n), "YcWfgzxKYXFW");
      equal(keymask.unmask("DjfkCZLtcBLn"), 288230376151711717n);
      equal(keymask.unmask("YcWfgzxKYXFW"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "NpRcJcFtscDkjdfXLfFWGtqR");
      equal(keymask.mask(buffer2), "HXmKjxGXGXBKhvFMzwX");
      deepEqual(keymask.unmask("NpRcJcFtscDkjdfXLfFWGtqR"), buffer1);
      deepEqual(keymask.unmask("HXmKjxGXGXBKhvFMzwX"), buffer2);
    });
  });

  describe("Defined size (full length)", () => {
    const keymask = new Keymask({
      size: 12
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "ZvjTZMCCqsWV");
      equal(keymask.mask(40), "XPJmdCdsZNcZ");
      equal(keymask.unmask("ZvjTZMCCqsWV"), 1n);
      equal(keymask.unmask("XPJmdCdsZNcZ"), 40n);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "zmmGyCghCrXF");
      equal(keymask.mask(1020), "yrmySCHGGwPG");
      equal(keymask.unmask("zmmGyCghCrXF"), 41n);
      equal(keymask.unmask("yrmySCHGGwPG"), 1020n);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "XmVStNJHvnmZ");
      equal(keymask.mask(65520), "DtPbZwWFmJHm");
      equal(keymask.unmask("XmVStNJHvnmZ"), 1021n);
      equal(keymask.unmask("DtPbZwWFmJHm"), 65520n);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "fQtwtwYvMmCQ");
      equal(keymask.mask(2097142), "pdKcWrMZpbnp");
      equal(keymask.unmask("fQtwtwYvMmCQ"), 65521n);
      equal(keymask.unmask("pdKcWrMZpbnp"), 2097142n);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "QCpxqrPQQFjS");
      equal(keymask.mask(67108858), "SWfVXvdTzTxL");
      equal(keymask.unmask("QCpxqrPQQFjS"), 2097143n);
      equal(keymask.unmask("SWfVXvdTzTxL"), 67108858n);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "sQPqxGgVpMTg");
      equal(keymask.mask(4294967290), "GCVtGbYdxNcR");
      equal(keymask.unmask("sQPqxGgVpMTg"), 67108859n);
      equal(keymask.unmask("GCVtGbYdxNcR"), 4294967290n);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "fwDNgnZfmGzm");
      equal(keymask.mask(137438953446), "kWNJwBBwRPrN");
      equal(keymask.unmask("fwDNgnZfmGzm"), 4294967291n);
      equal(keymask.unmask("kWNJwBBwRPrN"), 137438953446n);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "KRxbVNCxGHNj");
      equal(keymask.mask(4398046511092), "yJSXgzXMjTwQ");
      equal(keymask.unmask("KRxbVNCxGHNj"), 137438953447n);
      equal(keymask.unmask("yJSXgzXMjTwQ"), 4398046511092n);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "XDCsGMZNXMSm");
      equal(keymask.mask(281474976710596), "SZdYhtxPDMsh");
      equal(keymask.unmask("XDCsGMZNXMSm"), 4398046511093n);
      equal(keymask.unmask("SZdYhtxPDMsh"), 281474976710596n);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "vxHvBvzFfpnM");
      equal(keymask.mask(9007199254740880), "TfZdnmxykSBG");
      equal(keymask.unmask("vxHvBvzFfpnM"), 281474976710597n);
      equal(keymask.unmask("TfZdnmxykSBG"), 9007199254740880n);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "tYKyMyyzYLXZ");
      equal(keymask.mask(288230376151711716n), "dpwQcNKspJpR");
      equal(keymask.unmask("tYKyMyyzYLXZ"), 9007199254740881n);
      equal(keymask.unmask("dpwQcNKspJpR"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "DjfkCZLtcBLn");
      equal(keymask.mask(18446744073709551556n), "YcWfgzxKYXFW");
      equal(keymask.unmask("DjfkCZLtcBLn"), 288230376151711717n);
      equal(keymask.unmask("YcWfgzxKYXFW"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "NpRcJcFtscDkjdfXLfFWGtqR");
      equal(keymask.mask(buffer2), "HXmKjxGXGXBKhFJwTNvyShJX");
      deepEqual(keymask.unmask("NpRcJcFtscDkjdfXLfFWGtqR"), buffer1);
      deepEqual(keymask.unmask("HXmKjxGXGXBKhFJwTNvyShJX"), new Uint8Array([
        11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 0, 0, 0, 0, 0, 0
      ]).buffer);
    });
  });

  describe("Defined sizes (multiple)", () => {
    const keymask = new Keymask({
      size: [5, 7, 9]
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "vMkwJ");
      equal(keymask.mask(40), "QqpbT");
      equal(keymask.unmask("vMkwJ"), 1);
      equal(keymask.unmask("QqpbT"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "KCYXc");
      equal(keymask.mask(1020), "MrfKG");
      equal(keymask.unmask("KCYXc"), 41);
      equal(keymask.unmask("MrfKG"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "GDQGP");
      equal(keymask.mask(65520), "MqprG");
      equal(keymask.unmask("GDQGP"), 1021);
      equal(keymask.unmask("MqprG"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "GCYnP");
      equal(keymask.mask(2097142), "FKHzW");
      equal(keymask.unmask("GCYnP"), 65521);
      equal(keymask.unmask("FKHzW"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "bWGJC");
      equal(keymask.mask(67108858), "dnBsV");
      equal(keymask.unmask("bWGJC"), 2097143);
      equal(keymask.unmask("dnBsV"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "YmwLfMS");
      equal(keymask.mask(4294967290), "KggKsnM");
      equal(keymask.unmask("YmwLfMS"), 67108859);
      equal(keymask.unmask("KggKsnM"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "ncbyPTV");
      equal(keymask.mask(137438953446), "mGJFsQc");
      equal(keymask.unmask("ncbyPTV"), 4294967291);
      equal(keymask.unmask("mGJFsQc"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "JGHMQScpY");
      equal(keymask.mask(4398046511092), "bQZNDWgpp");
      equal(keymask.unmask("JGHMQScpY"), 137438953447);
      equal(keymask.unmask("bQZNDWgpp"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "gqFHjWmxF");
      equal(keymask.mask(281474976710596), "wZVHVzvrj");
      equal(keymask.unmask("gqFHjWmxF"), 4398046511093);
      equal(keymask.unmask("wZVHVzvrj"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "nWRWYwnkhD");
      equal(keymask.mask(9007199254740880), "KdCvLBSKJb");
      equal(keymask.unmask("nWRWYwnkhD"), 281474976710597);
      equal(keymask.unmask("KdCvLBSKJb"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "NjQkwmfKKVP");
      equal(keymask.mask(288230376151711716n), "TQmxMJKgrNW");
      equal(keymask.unmask("NjQkwmfKKVP"), 9007199254740881n);
      equal(keymask.unmask("TQmxMJKgrNW"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "DjfkCZLtcBLn");
      equal(keymask.mask(18446744073709551556n), "YcWfgzxKYXFW");
      equal(keymask.unmask("DjfkCZLtcBLn"), 288230376151711717n);
      equal(keymask.unmask("YcWfgzxKYXFW"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "NpRcJcFtscDkjdfXLfFWGtqR");
      equal(keymask.mask(buffer2), "HXmKjxGXGXBKhMVCZ");
      deepEqual(keymask.unmask("NpRcJcFtscDkjdfXLfFWGtqR"), buffer1);
      deepEqual(keymask.unmask("HXmKjxGXGXBKhMVCZ"), buffer2);
    });
  });

  describe("Empty seed", () => {
    it("should create default instance if seed is empty", () => {
      const keymask = new Keymask({ seed: new Uint8Array(0) });
      equal(typeof keymask, "object");

      equal(keymask.mask(288230376151711717n), "FkgmDbMvdCMp");
      equal(keymask.mask(18446744073709551556n), "ZdXghByLZYGX");
      equal(keymask.unmask("FkgmDbMvdCMp"), 288230376151711717n);
      equal(keymask.unmask("ZdXghByLZYGX"), 18446744073709551556n);
    });
  });

  describe("Given encoder instance", () => {
    const keymask = new Keymask({
      encoder: new KeymaskEncoder(new Uint8Array([
        10, 20, 30, 40, 50, 60, 70, 80,
        11, 21, 31, 41, 51, 61, 71, 81,
        12, 22, 32, 42, 52, 62, 72, 82
      ]).buffer),
      seed: new Uint8Array([
        13, 23, 33, 43, 53, 63, 73, 83
      ]).buffer
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "m");
      equal(keymask.mask(40), "r");
      equal(keymask.unmask("m"), 1);
      equal(keymask.unmask("r"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "yv");
      equal(keymask.mask(1020), "Jh");
      equal(keymask.unmask("yv"), 41);
      equal(keymask.unmask("Jh"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "ZQJ");
      equal(keymask.mask(65520), "PGR");
      equal(keymask.unmask("ZQJ"), 1021);
      equal(keymask.unmask("PGR"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "XQPR");
      equal(keymask.mask(2097142), "XNPv");
      equal(keymask.unmask("XQPR"), 65521);
      equal(keymask.unmask("XNPv"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "LphvK");
      equal(keymask.mask(67108858), "MmDJr");
      equal(keymask.unmask("LphvK"), 2097143);
      equal(keymask.unmask("MmDJr"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "QXFspG");
      equal(keymask.mask(4294967290), "vThLNK");
      equal(keymask.unmask("QXFspG"), 67108859);
      equal(keymask.unmask("vThLNK"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "nHJmmZh");
      equal(keymask.mask(137438953446), "WKkwKXc");
      equal(keymask.unmask("nHJmmZh"), 4294967291);
      equal(keymask.unmask("WKkwKXc"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "cmDdGmNq");
      equal(keymask.mask(4398046511092), "HHVtfsDK");
      equal(keymask.unmask("cmDdGmNq"), 137438953447);
      equal(keymask.unmask("HHVtfsDK"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "wcJsTPvwc");
      equal(keymask.mask(281474976710596), "hchhyhrQF");
      equal(keymask.unmask("wcJsTPvwc"), 4398046511093);
      equal(keymask.unmask("hchhyhrQF"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "ZhLhMstdWJ");
      equal(keymask.mask(9007199254740880), "PYcmhfLbWF");
      equal(keymask.unmask("ZhLhMstdWJ"), 281474976710597);
      equal(keymask.unmask("PYcmhfLbWF"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "HDbsJnNYFvP");
      equal(keymask.mask(288230376151711716n), "wLxfWFcTLTB");
      equal(keymask.unmask("HDbsJnNYFvP"), 9007199254740881n);
      equal(keymask.unmask("wLxfWFcTLTB"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "zcXxvFjvCZvP");
      equal(keymask.mask(18446744073709551556n), "QwLqQXvtsmYd");
      equal(keymask.unmask("zcXxvFjvCZvP"), 288230376151711717n);
      equal(keymask.unmask("QwLqQXvtsmYd"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "tTxGLKMvKqStrdjpjGNGWsLW");
      equal(keymask.mask(buffer2), "zHYscNMqWmVTGq");
      deepEqual(keymask.unmask("tTxGLKMvKqStrdjpjGNGWsLW"), buffer1);
      deepEqual(keymask.unmask("zHYscNMqWmVTGq"), buffer2);
    });
  });

  describe("Seed encoder only", () => {
    const keymask = new Keymask({
      seed: new Uint8Array([
        10, 20, 30, 40, 50, 60, 70, 80,
        11, 21, 31, 41, 51, 61, 71, 81,
        12, 22, 32, 42, 52, 62, 72, 82
      ]).buffer
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "m");
      equal(keymask.mask(40), "r");
      equal(keymask.unmask("m"), 1);
      equal(keymask.unmask("r"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "fq");
      equal(keymask.mask(1020), "Bv");
      equal(keymask.unmask("fq"), 41);
      equal(keymask.unmask("Bv"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "fWm");
      equal(keymask.mask(65520), "vwL");
      equal(keymask.unmask("fWm"), 1021);
      equal(keymask.unmask("vwL"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "JmQf");
      equal(keymask.mask(2097142), "JYQq");
      equal(keymask.unmask("JmQf"), 65521);
      equal(keymask.unmask("JYQq"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "HTbhF");
      equal(keymask.mask(67108858), "vMygR");
      equal(keymask.unmask("HTbhF"), 2097143);
      equal(keymask.unmask("vMygR"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "TLFykZ");
      equal(keymask.mask(4294967290), "NGhMGv");
      equal(keymask.unmask("TLFykZ"), 67108859);
      equal(keymask.unmask("NGhMGv"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "MmHsQqR");
      equal(keymask.mask(137438953446), "NbhKgcm");
      equal(keymask.unmask("MmHsQqR"), 4294967291);
      equal(keymask.unmask("NbhKgcm"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "kVNPxzPx");
      equal(keymask.mask(4398046511092), "bVvdBGmP");
      equal(keymask.unmask("kVNPxzPx"), 137438953447);
      equal(keymask.unmask("bVvdBGmP"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "nCKtdTNzK");
      equal(keymask.mask(281474976710596), "VxRtRYkZd");
      equal(keymask.unmask("nCKtdTNzK"), 4398046511093);
      equal(keymask.unmask("VxRtRYkZd"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "MTBTrVMLwD");
      equal(keymask.mask(9007199254740880), "PvFkfyGPhH");
      equal(keymask.unmask("MTBTrVMLwD"), 281474976710597);
      equal(keymask.unmask("PvFkfyGPhH"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "JdcLVNWPPRQ");
      equal(keymask.mask(288230376151711716n), "qcNzphPnZJT");
      equal(keymask.unmask("JdcLVNWPPRQ"), 9007199254740881n);
      equal(keymask.unmask("qcNzphPnZJT"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "DdWLFxfjmyfM");
      equal(keymask.mask(18446744073709551556n), "rmTWnYzPrSKT");
      equal(keymask.unmask("DdWLFxfjmyfM"), 288230376151711717n);
      equal(keymask.unmask("rmTWnYzPrSKT"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "JXBmhmKjgmDLdvWSfWKTbjCB");
      equal(keymask.mask(buffer2), "tSNPdzbSbSyPmP");
      deepEqual(keymask.unmask("JXBmhmKjgmDLdvWSfWKTbjCB"), buffer1);
      deepEqual(keymask.unmask("tSNPdzbSbSyPmP"), buffer2);
    });
  });

  describe("Seed generator and encoder", () => {
    const keymask = new Keymask({
      seed: new Uint8Array([
        10, 20, 30, 40, 50, 60, 70, 80,
        11, 21, 31, 41, 51, 61, 71, 81,
        12, 22, 32, 42, 52, 62, 72, 82,
        13, 23, 33, 43, 53, 63, 73, 83
      ]).buffer
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "m");
      equal(keymask.mask(40), "r");
      equal(keymask.unmask("m"), 1);
      equal(keymask.unmask("r"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "yv");
      equal(keymask.mask(1020), "Jh");
      equal(keymask.unmask("yv"), 41);
      equal(keymask.unmask("Jh"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "ZQJ");
      equal(keymask.mask(65520), "PGR");
      equal(keymask.unmask("ZQJ"), 1021);
      equal(keymask.unmask("PGR"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "XQPR");
      equal(keymask.mask(2097142), "XNPv");
      equal(keymask.unmask("XQPR"), 65521);
      equal(keymask.unmask("XNPv"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "LphvK");
      equal(keymask.mask(67108858), "MmDJr");
      equal(keymask.unmask("LphvK"), 2097143);
      equal(keymask.unmask("MmDJr"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "QXFspG");
      equal(keymask.mask(4294967290), "vThLNK");
      equal(keymask.unmask("QXFspG"), 67108859);
      equal(keymask.unmask("vThLNK"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "nHJmmZh");
      equal(keymask.mask(137438953446), "WKkwKXc");
      equal(keymask.unmask("nHJmmZh"), 4294967291);
      equal(keymask.unmask("WKkwKXc"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "cmDdGmNq");
      equal(keymask.mask(4398046511092), "HHVtfsDK");
      equal(keymask.unmask("cmDdGmNq"), 137438953447);
      equal(keymask.unmask("HHVtfsDK"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "wcJsTPvwc");
      equal(keymask.mask(281474976710596), "hchhyhrQF");
      equal(keymask.unmask("wcJsTPvwc"), 4398046511093);
      equal(keymask.unmask("hchhyhrQF"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "ZhLhMstdWJ");
      equal(keymask.mask(9007199254740880), "PYcmhfLbWF");
      equal(keymask.unmask("ZhLhMstdWJ"), 281474976710597);
      equal(keymask.unmask("PYcmhfLbWF"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "HDbsJnNYFvP");
      equal(keymask.mask(288230376151711716n), "wLxfWFcTLTB");
      equal(keymask.unmask("HDbsJnNYFvP"), 9007199254740881n);
      equal(keymask.unmask("wLxfWFcTLTB"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "zcXxvFjvCZvP");
      equal(keymask.mask(18446744073709551556n), "QwLqQXvtsmYd");
      equal(keymask.unmask("zcXxvFjvCZvP"), 288230376151711717n);
      equal(keymask.unmask("QwLqQXvtsmYd"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "tTxGLKMvKqStrdjpjGNGWsLW");
      equal(keymask.mask(buffer2), "zHYscNMqWmVTGq");
      deepEqual(keymask.unmask("tTxGLKMvKqStrdjpjGNGWsLW"), buffer1);
      deepEqual(keymask.unmask("zHYscNMqWmVTGq"), buffer2);
    });
  });
});