import { equal } from "node:assert/strict";
import { Keymask } from "../src/";

describe("Keymask", () => {
  describe("Default options", () => {
    const keymask = new Keymask();
    
    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "h");
      equal(keymask.mask(40), "T");
      equal(keymask.unmask("h"), 1);
      equal(keymask.unmask("T"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "PK");
      equal(keymask.mask(1020), "sV");
      equal(keymask.unmask("PK"), 41);
      equal(keymask.unmask("sV"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "SYX");
      equal(keymask.mask(65520), "tZw");
      equal(keymask.unmask("SYX"), 1021);
      equal(keymask.unmask("tZw"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "QypN");
      equal(keymask.mask(2097142), "YfPD");
      equal(keymask.unmask("QypN"), 65521);
      equal(keymask.unmask("YfPD"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "skXsC");
      equal(keymask.mask(67108858), "mmdSb");
      equal(keymask.unmask("skXsC"), 2097143);
      equal(keymask.unmask("mmdSb"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "xqDwpg");
      equal(keymask.mask(4294967290), "jwQCjs");
      equal(keymask.unmask("xqDwpg"), 67108859);
      equal(keymask.unmask("jwQCjs"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "zdHBJmj");
      equal(keymask.mask(137438953446), "DrzNDtN");
      equal(keymask.unmask("zdHBJmj"), 4294967291);
      equal(keymask.unmask("DrzNDtN"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "vgGDgzNB");
      equal(keymask.mask(4398046511092), "snXrfTGc");
      equal(keymask.unmask("vgGDgzNB"), 137438953447);
      equal(keymask.unmask("snXrfTGc"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "gqFHjWmxF");
      equal(keymask.mask(281474976710596), "wZVHVzvrj");
      equal(keymask.unmask("gqFHjWmxF"), 4398046511093);
      equal(keymask.unmask("wZVHVzvrj"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "xvVjKJyWQV");
      equal(keymask.mask(9007199254740880), "QpqdqHYQLN");
      equal(keymask.unmask("xvVjKJyWQV"), 281474976710597);
      equal(keymask.unmask("QpqdqHYQLN"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "KGpzSWMTjhZ");
      equal(keymask.mask(288230376151711716n), "MSXFmgJtWTY");
      equal(keymask.unmask("KGpzSWMTjhZ"), 9007199254740881n);
      equal(keymask.unmask("MSXFmgJtWTY"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "fWSwhXhtTTVD");
      equal(keymask.mask(18446744073709551556n), "bRVQxsYYfsCq");
      equal(keymask.unmask("fWSwhXhtTTVD"), 288230376151711717n);
      equal(keymask.unmask("bRVQxsYYfsCq"), 18446744073709551556n);
    });
  });

  describe("Bigint output", () => {
    const keymask = new Keymask({ bigint: true });
    
    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1n), "h");
      equal(keymask.mask(40n), "T");
      equal(keymask.unmask("h"), 1n);
      equal(keymask.unmask("T"), 40n);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41n), "PK");
      equal(keymask.mask(1020n), "sV");
      equal(keymask.unmask("PK"), 41n);
      equal(keymask.unmask("sV"), 1020n);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021n), "SYX");
      equal(keymask.mask(65520n), "tZw");
      equal(keymask.unmask("SYX"), 1021n);
      equal(keymask.unmask("tZw"), 65520n);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521n), "QypN");
      equal(keymask.mask(2097142n), "YfPD");
      equal(keymask.unmask("QypN"), 65521n);
      equal(keymask.unmask("YfPD"), 2097142n);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143n), "skXsC");
      equal(keymask.mask(67108858n), "mmdSb");
      equal(keymask.unmask("skXsC"), 2097143n);
      equal(keymask.unmask("mmdSb"), 67108858n);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859n), "xqDwpg");
      equal(keymask.mask(4294967290n), "jwQCjs");
      equal(keymask.unmask("xqDwpg"), 67108859n);
      equal(keymask.unmask("jwQCjs"), 4294967290n);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291n), "zdHBJmj");
      equal(keymask.mask(137438953446n), "DrzNDtN");
      equal(keymask.unmask("zdHBJmj"), 4294967291n);
      equal(keymask.unmask("DrzNDtN"), 137438953446n);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447n), "vgGDgzNB");
      equal(keymask.mask(4398046511092n), "snXrfTGc");
      equal(keymask.unmask("vgGDgzNB"), 137438953447n);
      equal(keymask.unmask("snXrfTGc"), 4398046511092n);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093n), "gqFHjWmxF");
      equal(keymask.mask(281474976710596n), "wZVHVzvrj");
      equal(keymask.unmask("gqFHjWmxF"), 4398046511093n);
      equal(keymask.unmask("wZVHVzvrj"), 281474976710596n);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597n), "xvVjKJyWQV");
      equal(keymask.mask(9007199254740880n), "QpqdqHYQLN");
      equal(keymask.unmask("xvVjKJyWQV"), 281474976710597n);
      equal(keymask.unmask("QpqdqHYQLN"), 9007199254740880n);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "KGpzSWMTjhZ");
      equal(keymask.mask(288230376151711716n), "MSXFmgJtWTY");
      equal(keymask.unmask("KGpzSWMTjhZ"), 9007199254740881n);
      equal(keymask.unmask("MSXFmgJtWTY"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "fWSwhXhtTTVD");
      equal(keymask.mask(18446744073709551556n), "bRVQxsYYfsCq");
      equal(keymask.unmask("fWSwhXhtTTVD"), 288230376151711717n);
      equal(keymask.unmask("bRVQxsYYfsCq"), 18446744073709551556n);
    });
  });

  describe("Defined output lengths", () => {
    const keymask = new Keymask({
      outputs: [5, 7, 9]
    });
    
    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "nNHVD");
      equal(keymask.mask(40), "bbQnB");
      equal(keymask.unmask("nNHVD"), 1);
      equal(keymask.unmask("bbQnB"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "NqWHF");
      equal(keymask.mask(1020), "dTqsX");
      equal(keymask.unmask("NqWHF"), 41);
      equal(keymask.unmask("dTqsX"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "QhwMb");
      equal(keymask.mask(65520), "CHCQd");
      equal(keymask.unmask("QhwMb"), 1021);
      equal(keymask.unmask("CHCQd"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "RVXxC");
      equal(keymask.mask(2097142), "cWCLd");
      equal(keymask.unmask("RVXxC"), 65521);
      equal(keymask.unmask("cWCLd"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "skXsC");
      equal(keymask.mask(67108858), "mmdSb");
      equal(keymask.unmask("skXsC"), 2097143);
      equal(keymask.unmask("mmdSb"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "cDzSRqV");
      equal(keymask.mask(4294967290), "pRFWwgM");
      equal(keymask.unmask("cDzSRqV"), 67108859);
      equal(keymask.unmask("pRFWwgM"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "zdHBJmj");
      equal(keymask.mask(137438953446), "DrzNDtN");
      equal(keymask.unmask("zdHBJmj"), 4294967291);
      equal(keymask.unmask("DrzNDtN"), 137438953446);
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
      equal(keymask.mask(281474976710597), "xvVjKJyWQV");
      equal(keymask.mask(9007199254740880), "QpqdqHYQLN");
      equal(keymask.unmask("xvVjKJyWQV"), 281474976710597);
      equal(keymask.unmask("QpqdqHYQLN"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "KGpzSWMTjhZ");
      equal(keymask.mask(288230376151711716n), "MSXFmgJtWTY");
      equal(keymask.unmask("KGpzSWMTjhZ"), 9007199254740881n);
      equal(keymask.unmask("MSXFmgJtWTY"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "fWSwhXhtTTVD");
      equal(keymask.mask(18446744073709551556n), "bRVQxsYYfsCq");
      equal(keymask.unmask("fWSwhXhtTTVD"), 288230376151711717n);
      equal(keymask.unmask("bRVQxsYYfsCq"), 18446744073709551556n);
    });
  });

  describe("Invalid seed", () => {
    it("should create default instance if seed is empty", () => {
      const keymask = new Keymask({ seed: new Uint8Array(0) });
      equal(typeof keymask, "object");

      equal(keymask.mask(288230376151711717n), "fWSwhXhtTTVD");
      equal(keymask.mask(18446744073709551556n), "bRVQxsYYfsCq");
      equal(keymask.unmask("fWSwhXhtTTVD"), 288230376151711717n);
      equal(keymask.unmask("bRVQxsYYfsCq"), 18446744073709551556n);
    });

    it("should create default instance if seed is too short", () => {
      const keymask = new Keymask({ seed: new Uint8Array(7) });
      equal(typeof keymask, "object");

      equal(keymask.mask(288230376151711717n), "fWSwhXhtTTVD");
      equal(keymask.mask(18446744073709551556n), "bRVQxsYYfsCq");
      equal(keymask.unmask("fWSwhXhtTTVD"), 288230376151711717n);
      equal(keymask.unmask("bRVQxsYYfsCq"), 18446744073709551556n);
    });
  });

  describe("Seed generator only", () => {
    const keymask = new Keymask({ seed: new Uint8Array([10, 20, 30, 40, 50, 60, 70, 80]) });

    it("should mask and unmask in range 1", () => {
      equal(keymask.mask(1), "v");
      equal(keymask.mask(40), "g");
      equal(keymask.unmask("v"), 1);
      equal(keymask.unmask("g"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "Jc");
      equal(keymask.mask(1020), "sJ");
      equal(keymask.unmask("Jc"), 41);
      equal(keymask.unmask("sJ"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "HSD");
      equal(keymask.mask(65520), "hTb");
      equal(keymask.unmask("HSD"), 1021);
      equal(keymask.unmask("hTb"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "sxzL");
      equal(keymask.mask(2097142), "BfZB");
      equal(keymask.unmask("sxzL"), 65521);
      equal(keymask.unmask("BfZB"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "fTDcD");
      equal(keymask.mask(67108858), "YVKDc");
      equal(keymask.unmask("fTDcD"), 2097143);
      equal(keymask.unmask("YVKDc"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "JkqtKj");
      equal(keymask.mask(4294967290), "vqCBFv");
      equal(keymask.unmask("JkqtKj"), 67108859);
      equal(keymask.unmask("vqCBFv"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "ZsPTVWT");
      equal(keymask.mask(137438953446), "rGLZfZj");
      equal(keymask.unmask("ZsPTVWT"), 4294967291);
      equal(keymask.unmask("rGLZfZj"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "vkSYHSTC");
      equal(keymask.mask(4398046511092), "CfFvtsgB");
      equal(keymask.unmask("vkSYHSTC"), 137438953447);
      equal(keymask.unmask("CfFvtsgB"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "PNYnsCdMQ");
      equal(keymask.mask(281474976710596), "qMTxVBYtB");
      equal(keymask.unmask("PNYnsCdMQ"), 4398046511093);
      equal(keymask.unmask("qMTxVBYtB"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "hLVpSQZMjb");
      equal(keymask.mask(9007199254740880), "BFqjyPBGdT");
      equal(keymask.unmask("hLVpSQZMjb"), 281474976710597);
      equal(keymask.unmask("BFqjyPBGdT"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "RWMrymVVhhB");
      equal(keymask.mask(288230376151711716n), "XzcQbZqkrsZ");
      equal(keymask.unmask("RWMrymVVhhB"), 9007199254740881n);
      equal(keymask.unmask("XzcQbZqkrsZ"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "PXQNdhRCzQwQ");
      equal(keymask.mask(18446744073709551556n), "PwMjmrKWxYCM");
      equal(keymask.unmask("PXQNdhRCzQwQ"), 288230376151711717n);
      equal(keymask.unmask("PwMjmrKWxYCM"), 18446744073709551556n);
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
      equal(keymask.mask(1), "J");
      equal(keymask.mask(40), "b");
      equal(keymask.unmask("J"), 1);
      equal(keymask.unmask("b"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "Cr");
      equal(keymask.mask(1020), "Lv");
      equal(keymask.unmask("Cr"), 41);
      equal(keymask.unmask("Lv"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "pMR");
      equal(keymask.mask(65520), "wfy");
      equal(keymask.unmask("pMR"), 1021);
      equal(keymask.unmask("wfy"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "jTdt");
      equal(keymask.mask(2097142), "MVCF");
      equal(keymask.unmask("jTdt"), 65521);
      equal(keymask.unmask("MVCF"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "LqRLB");
      equal(keymask.mask(67108858), "hhHpZ");
      equal(keymask.unmask("LqRLB"), 2097143);
      equal(keymask.unmask("hhHpZ"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "NxFydQ");
      equal(keymask.mask(4294967290), "YyjBYL");
      equal(keymask.unmask("NxFydQ"), 67108859);
      equal(keymask.unmask("YyjBYL"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "kHcsnhY");
      equal(keymask.mask(137438953446), "FXktFwt");
      equal(keymask.unmask("kHcsnhY"), 4294967291);
      equal(keymask.unmask("FXktFwt"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "GQPFQkts");
      equal(keymask.mask(4398046511092), "LgRXVbPm");
      equal(keymask.unmask("GQPFQkts"), 137438953447);
      equal(keymask.unmask("LgRXVbPm"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "QxScYDhNS");
      equal(keymask.mask(281474976710596), "yfvcvkGXY");
      equal(keymask.unmask("QxScYDhNS"), 4398046511093);
      equal(keymask.unmask("yfvcvkGXY"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "NGvYrnTDjv");
      equal(keymask.mask(9007199254740880), "jdxHxcMjWt");
      equal(keymask.unmask("NGvYrnTDjv"), 281474976710597);
      equal(keymask.unmask("jdxHxcMjWt"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "rPdkpDKbYJf");
      equal(keymask.mask(288230376151711716n), "KpRShQnwDbM");
      equal(keymask.unmask("rPdkpDKbYJf"), 9007199254740881n);
      equal(keymask.unmask("KpRShQnwDbM"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "VDpyJRJwbbvF");
      equal(keymask.mask(18446744073709551556n), "ZzvjNLMMVLBx");
      equal(keymask.unmask("VDpyJRJwbbvF"), 288230376151711717n);
      equal(keymask.unmask("ZzvjNLMMVLBx"), 18446744073709551556n);
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
      equal(keymask.mask(1), "B");
      equal(keymask.mask(40), "X");
      equal(keymask.unmask("B"), 1);
      equal(keymask.unmask("X"), 40);
    });

    it("should mask and unmask in range 2", () => {
      equal(keymask.mask(41), "Yy");
      equal(keymask.mask(1020), "TY");
      equal(keymask.unmask("Yy"), 41);
      equal(keymask.unmask("TY"), 1020);
    });

    it("should mask and unmask in range 3", () => {
      equal(keymask.mask(1021), "Hnt");
      equal(keymask.mask(65520), "sfw");
      equal(keymask.unmask("Hnt"), 1021);
      equal(keymask.unmask("sfw"), 65520);
    });

    it("should mask and unmask in range 4", () => {
      equal(keymask.mask(65521), "TMrz");
      equal(keymask.mask(2097142), "hmNh");
      equal(keymask.unmask("TMrz"), 65521);
      equal(keymask.unmask("hmNh"), 2097142);
    });

    it("should mask and unmask in range 5", () => {
      equal(keymask.mask(2097143), "mftyt");
      equal(keymask.mask(67108858), "xQZty");
      equal(keymask.unmask("mftyt"), 2097143);
      equal(keymask.unmask("xQZty"), 67108858);
    });

    it("should mask and unmask in range 6", () => {
      equal(keymask.mask(67108859), "YcLVZS");
      equal(keymask.mask(4294967290), "BLbhpB");
      equal(keymask.unmask("YcLVZS"), 67108859);
      equal(keymask.unmask("BLbhpB"), 4294967290);
    });

    it("should mask and unmask in range 7", () => {
      equal(keymask.mask(4294967291), "NTvfQdf");
      equal(keymask.mask(137438953446), "FqzNmNS");
      equal(keymask.unmask("NTvfQdf"), 4294967291);
      equal(keymask.unmask("FqzNmNS"), 137438953446);
    });

    it("should mask and unmask in range 8", () => {
      equal(keymask.mask(137438953447), "BcnxHnfb");
      equal(keymask.mask(4398046511092), "bmpBVTXh");
      equal(keymask.unmask("BcnxHnfb"), 137438953447);
      equal(keymask.unmask("bmpBVTXh"), 4398046511092);
    });

    it("should mask and unmask in range 9", () => {
      equal(keymask.mask(4398046511093), "vDxPTbGkK");
      equal(keymask.mask(281474976710596), "LkfMQhxVh");
      equal(keymask.unmask("vDxPTbGkK"), 4398046511093);
      equal(keymask.unmask("LkfMQhxVh"), 281474976710596);
    });

    it("should mask and unmask in range 10", () => {
      equal(keymask.mask(281474976710597), "szQjnKNkSw");
      equal(keymask.mask(9007199254740880), "hpLSCvhqGf");
      equal(keymask.unmask("szQjnKNkSw"), 281474976710597);
      equal(keymask.unmask("hpLSCvhqGf"), 9007199254740880);
    });

    it("should mask and unmask in range 11", () => {
      equal(keymask.mask(9007199254740881n), "RdkFCWQQssh");
      equal(keymask.mask(288230376151711716n), "gryKwNLcFTN");
      equal(keymask.unmask("RdkFCWQQssh"), 9007199254740881n);
      equal(keymask.unmask("gryKwNLcFTN"), 288230376151711716n);
    });

    it("should mask and unmask in range 12", () => {
      equal(keymask.mask(288230376151711717n), "vgKDGsRbrKJK");
      equal(keymask.mask(18446744073709551556n), "vJkSWFZdMxbk");
      equal(keymask.unmask("vgKDGsRbrKJK"), 288230376151711717n);
      equal(keymask.unmask("vJkSWFZdMxbk"), 18446744073709551556n);
    });
  });
});