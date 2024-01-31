import { equal, deepEqual } from "node:assert/strict";
import { KeymaskEncoder, Keymask, StrictKeymask } from "../src/";

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

  describe("Safe mode", () => {
    const keymask = new Keymask({ safe: true });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "k");
      equal(keymask.mask(22), "w");
      equal(keymask.unmask("k"), 1);
      equal(keymask.unmask("w"), 22);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(23), "t2");
      equal(keymask.mask(508), "vw");
      equal(keymask.unmask("t2"), 23);
      equal(keymask.unmask("vw"), 508);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(509), "tbn");
      equal(keymask.mask(8190), "zhq");
      equal(keymask.unmask("tbn"), 509);
      equal(keymask.unmask("zhq"), 8190);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(8191), "wccd");
      equal(keymask.mask(262138), "jfjr");
      equal(keymask.unmask("wccd"), 8191);
      equal(keymask.unmask("jfjr"), 262138);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(262139), "tm2wh");
      equal(keymask.mask(4194300), "tcgpk");
      equal(keymask.unmask("tm2wh"), 262139);
      equal(keymask.unmask("tcgpk"), 4194300);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(4194301), "9zn2vj");
      equal(keymask.mask(134217688), "n7dgfq");
      equal(keymask.unmask("9zn2vj"), 4194301);
      equal(keymask.unmask("n7dgfq"), 134217688);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(134217689), "jjc2rjd");
      equal(keymask.mask(4294967290), "rmrd5ft");
      equal(keymask.unmask("jjc2rjd"), 134217689);
      equal(keymask.unmask("rmrd5ft"), 4294967290);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(4294967291), "7hwj72gt");
      equal(keymask.mask(68719476730), "wghjnphj");
      equal(keymask.unmask("7hwj72gt"), 4294967291);
      equal(keymask.unmask("wghjnphj"), 68719476730);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(68719476731), "xhkztn29v");
      equal(keymask.mask(2199023255530), "2tfrbg7ps");
      equal(keymask.unmask("xhkztn29v"), 68719476731);
      equal(keymask.unmask("2tfrbg7ps"), 2199023255530);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(2199023255531), "wyjnjyf5pn");
      equal(keymask.mask(35184372088776), "k5tvhvs9zm");
      equal(keymask.unmask("wyjnjyf5pn"), 2199023255531);
      equal(keymask.unmask("k5tvhvs9zm"), 35184372088776);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(35184372088777), "5yqxcwjgcfv");
      equal(keymask.mask(1125899906842596), "s5xtjhkjzgm");
      equal(keymask.unmask("5yqxcwjgcfv"), 35184372088777);
      equal(keymask.unmask("s5xtjhkjzgm"), 1125899906842596);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(1125899906842597n), "kzd2kmfzbksd");
      equal(keymask.mask(36028797018963912n), "zxdhgvqmsnxp");
      equal(keymask.unmask("kzd2kmfzbksd"), 1125899906842597n);
      equal(keymask.unmask("zxdhgvqmsnxp"), 36028797018963912n);
    });

    it("should mask and unmask in range 13", () => {
      equal(keymask.mask(36028797018963913n), "fm7mspv5nt2mq");
      equal(keymask.mask(576460752303423432n), "dgwh9ks2mj55k");
      equal(keymask.unmask("fm7mspv5nt2mq"), 36028797018963913n);
      equal(keymask.unmask("dgwh9ks2mj55k"), 576460752303423432n);
    });

    it("should mask and unmask in range 14", () => {
      equal(keymask.mask(576460752303423433n), "cfkgghxwykkjsj");
      equal(keymask.mask(18446744073709551556n), "xfhpdkrn9fvpxp");
      equal(keymask.unmask("cfkgghxwykkjsj"), 576460752303423433n);
      equal(keymask.unmask("xfhpdkrn9fvpxp"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "gjph95tz2792txgrfmn9dvvhn9vm");
      equal(keymask.mask(buffer2), "9xcxhygbpfrvngnm");
      deepEqual(keymask.unmask("gjph95tz2792txgrfmn9dvvhn9vm"), buffer1);
      deepEqual(keymask.unmask("9xcxhygbpfrvngnm"), buffer2);
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
      equal(keymask.mask(1), "w");
      equal(keymask.mask(40), "F");
      equal(keymask.unmask("w"), 1);
      equal(keymask.unmask("F"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "fC");
      equal(keymask.mask(1020), "Sn");
      equal(keymask.unmask("fC"), 41);
      equal(keymask.unmask("Sn"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "BgS");
      equal(keymask.mask(65520), "pqH");
      equal(keymask.unmask("BgS"), 1021);
      equal(keymask.unmask("pqH"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "NgpH");
      equal(keymask.mask(2097142), "NXpC");
      equal(keymask.unmask("NgpH"), 65521);
      equal(keymask.unmask("NXpC"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "PGnCW");
      equal(keymask.mask(67108858), "vwmSF");
      equal(keymask.unmask("PGnCW"), 2097143);
      equal(keymask.unmask("vwmSF"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "gNQsGq");
      equal(keymask.mask(4294967290), "CKnPXW");
      equal(keymask.unmask("gNQsGq"), 67108859);
      equal(keymask.unmask("CKnPXW"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "rJSwwBn");
      equal(keymask.mask(137438953446), "MWkxWNj");
      equal(keymask.unmask("rJSwwBn"), 4294967291);
      equal(keymask.unmask("MWkxWNj"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "jwmhqwXc");
      equal(keymask.mask(4398046511092), "JJVRdsmW");
      equal(keymask.unmask("jwmhqwXc"), 137438953447);
      equal(keymask.unmask("JJVRdsmW"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "xjSsKpCxj");
      equal(keymask.mask(281474976710596), "njnnfnFgQ");
      equal(keymask.unmask("xjSsKpCxj"), 4398046511093);
      equal(keymask.unmask("njnnfnFgQ"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "BnPnvsRhMS");
      equal(keymask.mask(9007199254740880), "pYjwndPTMQ");
      equal(keymask.unmask("BnPnvsRhMS"), 281474976710597);
      equal(keymask.unmask("pYjwndPTMQ"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "JmTsSrXYQCp");
      equal(keymask.mask(288230376151711716n), "xPDdMQjKPKL");
      equal(keymask.unmask("JmTsSrXYQCp"), 9007199254740881n);
      equal(keymask.unmask("xPDdMQjKPKL"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "zjNDCQyCbBCp");
      equal(keymask.mask(18446744073709551556n), "gxPcgNCRswYh");
      equal(keymask.unmask("zjNDCQyCbBCp"), 288230376151711717n);
      equal(keymask.unmask("gxPcgNCRswYh"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "RKDqPWvCWctRFhyGyqXqMsPM");
      equal(keymask.mask(buffer2), "zJYsjXvcMwVKqc");
      deepEqual(keymask.unmask("RKDqPWvCWctRFhyGyqXqMsPM"), buffer1);
      deepEqual(keymask.unmask("zJYsjXvcMwVKqc"), buffer2);
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
      equal(keymask.mask(1), "w");
      equal(keymask.mask(40), "F");
      equal(keymask.unmask("w"), 1);
      equal(keymask.unmask("F"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "dc");
      equal(keymask.mask(1020), "LC");
      equal(keymask.unmask("dc"), 41);
      equal(keymask.unmask("LC"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "dMw");
      equal(keymask.mask(65520), "CxP");
      equal(keymask.unmask("dMw"), 1021);
      equal(keymask.unmask("CxP"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "Swgd");
      equal(keymask.mask(2097142), "SYgc");
      equal(keymask.unmask("Swgd"), 65521);
      equal(keymask.unmask("SYgc"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "JKTnQ");
      equal(keymask.mask(67108858), "CvfZH");
      equal(keymask.unmask("JKTnQ"), 2097143);
      equal(keymask.unmask("CvfZH"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "KPQfkB");
      equal(keymask.mask(4294967290), "XqnvqC");
      equal(keymask.unmask("KPQfkB"), 67108859);
      equal(keymask.unmask("XqnvqC"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "vwJsgcH");
      equal(keymask.mask(137438953446), "XTnWZjw");
      equal(keymask.unmask("vwJsgcH"), 4294967291);
      equal(keymask.unmask("XTnWZjw"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "kVXpDzpD");
      equal(keymask.mask(4398046511092), "TVChLqwp");
      equal(keymask.unmask("kVXpDzpD"), 137438953447);
      equal(keymask.unmask("TVChLqwp"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "rbWRhKXzW");
      equal(keymask.mask(281474976710596), "VDHRHYkBh");
      equal(keymask.unmask("rbWRhKXzW"), 4398046511093);
      equal(keymask.unmask("VDHRHYkBh"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "vKLKFVvPxm");
      equal(keymask.mask(9007199254740880), "pCQkdfqpnJ");
      equal(keymask.unmask("vKLKFVvPxm"), 281474976710597);
      equal(keymask.unmask("pCQkdfqpnJ"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "ShjPVXMppHg");
      equal(keymask.mask(288230376151711716n), "cjXzGnprBSK");
      equal(keymask.unmask("ShjPVXMppHg"), 9007199254740881n);
      equal(keymask.unmask("cjXzGnprBSK"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "mhMPQDdywfdv");
      equal(keymask.mask(18446744073709551556n), "FwKMrYzpFtWK");
      equal(keymask.unmask("mhMPQDdywfdv"), 288230376151711717n);
      equal(keymask.unmask("FwKMrYzpFtWK"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "SNLwnwWyZwmPhCMtdMWKTybL");
      equal(keymask.mask(buffer2), "RtXphzTtTtfpwp");
      deepEqual(keymask.unmask("SNLwnwWyZwmPhCMtdMWKTybL"), buffer1);
      deepEqual(keymask.unmask("RtXphzTtTtfpwp"), buffer2);
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
      equal(keymask.mask(1), "w");
      equal(keymask.mask(40), "F");
      equal(keymask.unmask("w"), 1);
      equal(keymask.unmask("F"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "fC");
      equal(keymask.mask(1020), "Sn");
      equal(keymask.unmask("fC"), 41);
      equal(keymask.unmask("Sn"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "BgS");
      equal(keymask.mask(65520), "pqH");
      equal(keymask.unmask("BgS"), 1021);
      equal(keymask.unmask("pqH"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "NgpH");
      equal(keymask.mask(2097142), "NXpC");
      equal(keymask.unmask("NgpH"), 65521);
      equal(keymask.unmask("NXpC"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "PGnCW");
      equal(keymask.mask(67108858), "vwmSF");
      equal(keymask.unmask("PGnCW"), 2097143);
      equal(keymask.unmask("vwmSF"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "gNQsGq");
      equal(keymask.mask(4294967290), "CKnPXW");
      equal(keymask.unmask("gNQsGq"), 67108859);
      equal(keymask.unmask("CKnPXW"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "rJSwwBn");
      equal(keymask.mask(137438953446), "MWkxWNj");
      equal(keymask.unmask("rJSwwBn"), 4294967291);
      equal(keymask.unmask("MWkxWNj"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "jwmhqwXc");
      equal(keymask.mask(4398046511092), "JJVRdsmW");
      equal(keymask.unmask("jwmhqwXc"), 137438953447);
      equal(keymask.unmask("JJVRdsmW"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "xjSsKpCxj");
      equal(keymask.mask(281474976710596), "njnnfnFgQ");
      equal(keymask.unmask("xjSsKpCxj"), 4398046511093);
      equal(keymask.unmask("njnnfnFgQ"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "BnPnvsRhMS");
      equal(keymask.mask(9007199254740880), "pYjwndPTMQ");
      equal(keymask.unmask("BnPnvsRhMS"), 281474976710597);
      equal(keymask.unmask("pYjwndPTMQ"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "JmTsSrXYQCp");
      equal(keymask.mask(288230376151711716n), "xPDdMQjKPKL");
      equal(keymask.unmask("JmTsSrXYQCp"), 9007199254740881n);
      equal(keymask.unmask("xPDdMQjKPKL"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "zjNDCQyCbBCp");
      equal(keymask.mask(18446744073709551556n), "gxPcgNCRswYh");
      equal(keymask.unmask("zjNDCQyCbBCp"), 288230376151711717n);
      equal(keymask.unmask("gxPcgNCRswYh"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "RKDqPWvCWctRFhyGyqXqMsPM");
      equal(keymask.mask(buffer2), "zJYsjXvcMwVKqc");
      deepEqual(keymask.unmask("RKDqPWvCWctRFhyGyqXqMsPM"), buffer1);
      deepEqual(keymask.unmask("zJYsjXvcMwVKqc"), buffer2);
    });
  });

  describe("Seed generator and encoder, safe mode", () => {
    const keymask = new Keymask({
      seed: new Uint8Array([
        1, 2, 3, 4, 5, 6, 7, 8,
        10, 20, 30, 40, 50, 60, 70, 80,
        11, 21, 31, 41
      ]).buffer,
      safe: true
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "k");
      equal(keymask.mask(22), "2");
      equal(keymask.unmask("k"), 1);
      equal(keymask.unmask("2"), 22);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(23), "y2");
      equal(keymask.mask(508), "59");
      equal(keymask.unmask("y2"), 23);
      equal(keymask.unmask("59"), 508);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(509), "bcj");
      equal(keymask.mask(8190), "fvn");
      equal(keymask.unmask("bcj"), 509);
      equal(keymask.unmask("fvn"), 8190);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(8191), "prvn");
      equal(keymask.mask(262138), "7ftq");
      equal(keymask.unmask("prvn"), 8191);
      equal(keymask.unmask("7ftq"), 262138);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(262139), "byscn");
      equal(keymask.mask(4194300), "btzg5");
      equal(keymask.unmask("byscn"), 262139);
      equal(keymask.unmask("btzg5"), 4194300);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(4194301), "c5hf5g");
      equal(keymask.mask(134217688), "qxyjwp");
      equal(keymask.unmask("c5hf5g"), 4194301);
      equal(keymask.unmask("qxyjwp"), 134217688);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(134217689), "wdv9dv5");
      equal(keymask.mask(4294967290), "bmtrtjq");
      equal(keymask.unmask("wdv9dv5"), 134217689);
      equal(keymask.unmask("bmtrtjq"), 4294967290);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(4294967291), "vzmnzmkg");
      equal(keymask.mask(68719476730), "cpnnrymr");
      equal(keymask.unmask("vzmnzmkg"), 4294967291);
      equal(keymask.unmask("cpnnrymr"), 68719476730);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(68719476731), "ptccc27ns");
      equal(keymask.mask(2199023255530), "cp5gqqbm9");
      equal(keymask.unmask("ptccc27ns"), 68719476731);
      equal(keymask.unmask("cp5gqqbm9"), 2199023255530);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(2199023255531), "qw2gg57nmt");
      equal(keymask.mask(35184372088776), "7rcxjg9pst");
      equal(keymask.unmask("qw2gg57nmt"), 2199023255531);
      equal(keymask.unmask("7rcxjg9pst"), 35184372088776);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(35184372088777), "2vnstxyssry");
      equal(keymask.mask(1125899906842596), "wf79gt5jf9t");
      equal(keymask.unmask("2vnstxyssry"), 35184372088777);
      equal(keymask.unmask("wf79gt5jf9t"), 1125899906842596);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(1125899906842597n), "75pmxgky7s2j");
      equal(keymask.mask(36028797018963912n), "dyps5ctrsgyc");
      equal(keymask.unmask("75pmxgky7s2j"), 1125899906842597n);
      equal(keymask.unmask("dyps5ctrsgyc"), 36028797018963912n);
    });

    it("should mask and unmask in range 13", () => {
      equal(keymask.mask(36028797018963913n), "pfvdbdgnwrwpp");
      equal(keymask.mask(576460752303423432n), "5kxqd92gv7wqn");
      equal(keymask.unmask("pfvdbdgnwrwpp"), 36028797018963913n);
      equal(keymask.unmask("5kxqd92gv7wqn"), 576460752303423432n);
    });

    it("should mask and unmask in range 14", () => {
      equal(keymask.mask(576460752303423433n), "yqj9bkczrzpgvg");
      equal(keymask.mask(18446744073709551556n), "99sg7vy2snmpqz");
      equal(keymask.unmask("yqj9bkczrzpgvg"), 576460752303423433n);
      equal(keymask.unmask("99sg7vy2snmpqz"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "zdytzpz79dsffmzyt2fxqpvyxqr5");
      equal(keymask.mask(buffer2), "g7qckgtvcghhh2nc");
      deepEqual(keymask.unmask("zdytzpz79dsffmzyt2fxqpvyxqr5"), buffer1);
      deepEqual(keymask.unmask("g7qckgtvcghhh2nc"), buffer2);
    });
  });
});

describe("StrictKeymask", () => {
  describe("Default options", () => {
    const keymask = new StrictKeymask();

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "k");
      equal(keymask.mask(22), "w");
      equal(keymask.unmask("k"), 1);
      equal(keymask.unmask("w"), 22);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(23), "t2");
      equal(keymask.mask(508), "vw");
      equal(keymask.unmask("t2"), 23);
      equal(keymask.unmask("vw"), 508);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(509), "tbn");
      equal(keymask.mask(8190), "zhq");
      equal(keymask.unmask("tbn"), 509);
      equal(keymask.unmask("zhq"), 8190);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(8191), "wccd");
      equal(keymask.mask(262138), "jfjr");
      equal(keymask.unmask("wccd"), 8191);
      equal(keymask.unmask("jfjr"), 262138);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(262139), "tm2wh");
      equal(keymask.mask(4194300), "tcgpk");
      equal(keymask.unmask("tm2wh"), 262139);
      equal(keymask.unmask("tcgpk"), 4194300);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(4194301), "izn2vj");
      equal(keymask.mask(134217688), "n7dgfq");
      equal(keymask.unmask("izn2vj"), 4194301);
      equal(keymask.unmask("n7dgfq"), 134217688);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(134217689), "jjc2rjd");
      equal(keymask.mask(4294967290), "rmrd5ft");
      equal(keymask.unmask("jjc2rjd"), 134217689);
      equal(keymask.unmask("rmrd5ft"), 4294967290);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(4294967291), "ohwj72gt");
      equal(keymask.mask(68719476730), "wghjnphj");
      equal(keymask.unmask("ohwj72gt"), 4294967291);
      equal(keymask.unmask("wghjnphj"), 68719476730);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(68719476731), "xhkztn29v");
      equal(keymask.mask(2199023255530), "utfrbg7ps");
      equal(keymask.unmask("xhkztn29v"), 68719476731);
      equal(keymask.unmask("utfrbg7ps"), 2199023255530);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(2199023255531), "wyjnjyf5pn");
      equal(keymask.mask(35184372088776), "k5tvhvs9zm");
      equal(keymask.unmask("wyjnjyf5pn"), 2199023255531);
      equal(keymask.unmask("k5tvhvs9zm"), 35184372088776);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(35184372088777), "eyqxcwjgcfv");
      equal(keymask.mask(1125899906842596), "s5xtjhkjzgm");
      equal(keymask.unmask("eyqxcwjgcfv"), 35184372088777);
      equal(keymask.unmask("s5xtjhkjzgm"), 1125899906842596);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(1125899906842597n), "kzd2kmfzbksd");
      equal(keymask.mask(36028797018963912n), "zxdhgvqmsnxp");
      equal(keymask.unmask("kzd2kmfzbksd"), 1125899906842597n);
      equal(keymask.unmask("zxdhgvqmsnxp"), 36028797018963912n);
    });

    it("should mask and unmask in range 13", () => {
      equal(keymask.mask(36028797018963913n), "fm7mspv5nt2mq");
      equal(keymask.mask(576460752303423432n), "dgwh9ks2mj55k");
      equal(keymask.unmask("fm7mspv5nt2mq"), 36028797018963913n);
      equal(keymask.unmask("dgwh9ks2mj55k"), 576460752303423432n);
    });

    it("should mask and unmask in range 14", () => {
      equal(keymask.mask(576460752303423433n), "cfkgghxwykkjsj");
      equal(keymask.mask(18446744073709551556n), "xfhpdkrn9fvpxp");
      equal(keymask.unmask("cfkgghxwykkjsj"), 576460752303423433n);
      equal(keymask.unmask("xfhpdkrn9fvpxp"), 18446744073709551556n);
    });

    it("should process binary data", () => {
      const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer;
      const buffer2 = new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88, 99]).buffer;
      equal(keymask.mask(buffer1), "gjph95tz2792txgrfmn9dvvhn9vm");
      equal(keymask.mask(buffer2), "ixcxhygbpfrvngnm");
      deepEqual(keymask.unmask("gjph95tz2792txgrfmn9dvvhn9vm"), buffer1);
      deepEqual(keymask.unmask("ixcxhygbpfrvngnm"), buffer2);
    });
  });
});