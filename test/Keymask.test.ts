import { equal } from "node:assert/strict";
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
      equal(keymask.mask(41), "PK");
      equal(keymask.mask(1020), "sV");
      equal(keymask.unmask("PK"), 41);
      equal(keymask.unmask("sV"), 1020);
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
  });

  describe("Bigint output", () => {
    const keymask = new Keymask({ bigint: true });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1n), "c");
      equal(keymask.mask(40n), "Y");
      equal(keymask.unmask("c"), 1n);
      equal(keymask.unmask("Y"), 40n);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41n), "PK");
      equal(keymask.mask(1020n), "sV");
      equal(keymask.unmask("PK"), 41n);
      equal(keymask.unmask("sV"), 1020n);
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
      ])),
      seed: new Uint8Array([
        13, 23, 33, 43, 53, 63, 73, 83
      ])
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "m");
      equal(keymask.mask(40), "r");
      equal(keymask.unmask("m"), 1);
      equal(keymask.unmask("r"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "Kq");
      equal(keymask.mask(1020), "wW");
      equal(keymask.unmask("Kq"), 41);
      equal(keymask.unmask("wW"), 1020);
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
  });

  describe("Seed encoder only", () => {
    const keymask = new Keymask({
      seed: new Uint8Array([
        10, 20, 30, 40, 50, 60, 70, 80,
        11, 21, 31, 41, 51, 61, 71, 81,
        12, 22, 32, 42, 52, 62, 72, 82
      ])
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "m");
      equal(keymask.mask(40), "r");
      equal(keymask.unmask("m"), 1);
      equal(keymask.unmask("r"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "QP");
      equal(keymask.mask(1020), "gR");
      equal(keymask.unmask("QP"), 41);
      equal(keymask.unmask("gR"), 1020);
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
  });

  describe("Seed generator and encoder", () => {
    const keymask = new Keymask({
      seed: new Uint8Array([
        10, 20, 30, 40, 50, 60, 70, 80,
        11, 21, 31, 41, 51, 61, 71, 81,
        12, 22, 32, 42, 52, 62, 72, 82,
        13, 23, 33, 43, 53, 63, 73, 83
      ])
    });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "m");
      equal(keymask.mask(40), "r");
      equal(keymask.unmask("m"), 1);
      equal(keymask.unmask("r"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "Kq");
      equal(keymask.mask(1020), "wW");
      equal(keymask.unmask("Kq"), 41);
      equal(keymask.unmask("wW"), 1020);
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
  });
});