import { equal } from "node:assert/strict";
import { Base41, Keymask } from "../src/";

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
      encoder: new Base41(new Uint8Array([
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
      equal(keymask.mask(40), "M");
      equal(keymask.unmask("m"), 1);
      equal(keymask.unmask("M"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "Sb");
      equal(keymask.mask(1020), "JV");
      equal(keymask.unmask("Sb"), 41);
      equal(keymask.unmask("JV"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "XCt");
      equal(keymask.mask(65520), "rpv");
      equal(keymask.unmask("XCt"), 1021);
      equal(keymask.unmask("rpv"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "dCrv");
      equal(keymask.mask(2097142), "dhrH");
      equal(keymask.unmask("dCrv"), 65521);
      equal(keymask.unmask("dhrH"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "qKnHS");
      equal(keymask.mask(67108858), "gmFtM");
      equal(keymask.unmask("qKnHS"), 2097143);
      equal(keymask.unmask("gmFtM"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "CdBTKp");
      equal(keymask.mask(4294967290), "HDnqhS");
      equal(keymask.unmask("CdBTKp"), 67108859);
      equal(keymask.unmask("HDnqhS"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "QZtmmXn");
      equal(keymask.mask(137438953446), "VSGJSdj");
      equal(keymask.unmask("QZtmmXn"), 4294967291);
      equal(keymask.unmask("VSGJSdj"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "jmFYpmhb");
      equal(keymask.mask(4398046511092), "ZZycWTFS");
      equal(keymask.unmask("jmFYpmhb"), 137438953447);
      equal(keymask.unmask("ZZycWTFS"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "JjtTDrHJj");
      equal(keymask.mask(281474976710596), "njnnsnMCB");
      equal(keymask.unmask("JjtTDrHJj"), 4398046511093);
      equal(keymask.unmask("njnnsnMCB"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "XnqngTcYVt");
      equal(keymask.mask(9007199254740880), "rkjmnWqPVB");
      equal(keymask.unmask("XnqngTcYVt"), 281474976710597);
      equal(keymask.unmask("rkjmnWqPVB"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "ZFPTtQhkBHr");
      equal(keymask.mask(288230376151711716n), "JqfWVBjDqDz");
      equal(keymask.unmask("ZFPTtQhkBHr"), 9007199254740881n);
      equal(keymask.unmask("JqfWVBjDqDz"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "NjdfHBwHxXHr");
      equal(keymask.mask(18446744073709551556n), "CJqbCdHcTmkY");
      equal(keymask.unmask("NjdfHBwHxXHr"), 288230376151711717n);
      equal(keymask.unmask("CJqbCdHcTmkY"), 18446744073709551556n);
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
      equal(keymask.mask(40), "M");
      equal(keymask.unmask("m"), 1);
      equal(keymask.unmask("M"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "Cr");
      equal(keymask.mask(1020), "Lv");
      equal(keymask.unmask("Cr"), 41);
      equal(keymask.unmask("Lv"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "WVm");
      equal(keymask.mask(65520), "HJq");
      equal(keymask.unmask("WVm"), 1021);
      equal(keymask.unmask("HJq"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "tmCW");
      equal(keymask.mask(2097142), "tkCb");
      equal(keymask.unmask("tmCW"), 65521);
      equal(keymask.unmask("tkCb"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "ZDPnB");
      equal(keymask.mask(67108858), "HgsLv");
      equal(keymask.unmask("ZDPnB"), 2097143);
      equal(keymask.unmask("HgsLv"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "DqBsGX");
      equal(keymask.mask(4294967290), "hpngpH");
      equal(keymask.unmask("DqBsGX"), 67108859);
      equal(keymask.unmask("hpngpH"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "gmZTCbv");
      equal(keymask.mask(137438953446), "hPnSLjm");
      equal(keymask.unmask("gmZTCbv"), 4294967291);
      equal(keymask.unmask("hPnSLjm"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "GyhrfNrf");
      equal(keymask.mask(4398046511092), "PyHYzpmr");
      equal(keymask.unmask("GyhrfNrf"), 137438953447);
      equal(keymask.unmask("PyHYzpmr"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "QxScYDhNS");
      equal(keymask.mask(281474976710596), "yfvcvkGXY");
      equal(keymask.unmask("QxScYDhNS"), 4398046511093);
      equal(keymask.unmask("yfvcvkGXY"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "gDzDMygqJF");
      equal(keymask.mask(9007199254740880), "rHBGWsprnZ");
      equal(keymask.unmask("gDzDMygqJF"), 281474976710597);
      equal(keymask.unmask("rHBGWsprnZ"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "tYjqyhVrrvC");
      equal(keymask.mask(288230376151711716n), "bjhNKnrQXtD");
      equal(keymask.unmask("tYjqyhVrrvC"), 9007199254740881n);
      equal(keymask.unmask("bjhNKnrQXtD"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "FYVqBfWwmsWg");
      equal(keymask.mask(18446744073709551556n), "MmDVQkNrMRSD");
      equal(keymask.unmask("FYVqBfWwmsWg"), 288230376151711717n);
      equal(keymask.unmask("MmDVQkNrMRSD"), 18446744073709551556n);
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
      equal(keymask.mask(40), "M");
      equal(keymask.unmask("m"), 1);
      equal(keymask.unmask("M"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "Sb");
      equal(keymask.mask(1020), "JV");
      equal(keymask.unmask("Sb"), 41);
      equal(keymask.unmask("JV"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "XCt");
      equal(keymask.mask(65520), "rpv");
      equal(keymask.unmask("XCt"), 1021);
      equal(keymask.unmask("rpv"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "dCrv");
      equal(keymask.mask(2097142), "dhrH");
      equal(keymask.unmask("dCrv"), 65521);
      equal(keymask.unmask("dhrH"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "qKnHS");
      equal(keymask.mask(67108858), "gmFtM");
      equal(keymask.unmask("qKnHS"), 2097143);
      equal(keymask.unmask("gmFtM"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "CdBTKp");
      equal(keymask.mask(4294967290), "HDnqhS");
      equal(keymask.unmask("CdBTKp"), 67108859);
      equal(keymask.unmask("HDnqhS"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "QZtmmXn");
      equal(keymask.mask(137438953446), "VSGJSdj");
      equal(keymask.unmask("QZtmmXn"), 4294967291);
      equal(keymask.unmask("VSGJSdj"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "jmFYpmhb");
      equal(keymask.mask(4398046511092), "ZZycWTFS");
      equal(keymask.unmask("jmFYpmhb"), 137438953447);
      equal(keymask.unmask("ZZycWTFS"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "JjtTDrHJj");
      equal(keymask.mask(281474976710596), "njnnsnMCB");
      equal(keymask.unmask("JjtTDrHJj"), 4398046511093);
      equal(keymask.unmask("njnnsnMCB"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "XnqngTcYVt");
      equal(keymask.mask(9007199254740880), "rkjmnWqPVB");
      equal(keymask.unmask("XnqngTcYVt"), 281474976710597);
      equal(keymask.unmask("rkjmnWqPVB"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "ZFPTtQhkBHr");
      equal(keymask.mask(288230376151711716n), "JqfWVBjDqDz");
      equal(keymask.unmask("ZFPTtQhkBHr"), 9007199254740881n);
      equal(keymask.unmask("JqfWVBjDqDz"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "NjdfHBwHxXHr");
      equal(keymask.mask(18446744073709551556n), "CJqbCdHcTmkY");
      equal(keymask.unmask("NjdfHBwHxXHr"), 288230376151711717n);
      equal(keymask.unmask("CJqbCdHcTmkY"), 18446744073709551556n);
    });
  });
});