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
    describe("Non-prime", () => {
      describe("Adaptive", () => {
        describe("Padded", () => {
          const base41 = new Base41();

          describe("Single value", () => {
            it("should handle null character encodings", () => {
              equal(base41.encode(0), "B");
              equal(base41.decode("B"), 0);
            });

            it("should handle 1-character encodings", () => {
              equal(base41.encode(1), "C");
              equal(base41.encode(31), "p");
              equal(base41.decode("C"), 1);
              equal(base41.decode("p"), 31);
            });
        
            it("should handle 2-character encodings", () => {
              equal(base41.encode(32), "qB");
              equal(base41.encode(1023), "yf");
              equal(base41.decode("qB"), 32);
              equal(base41.decode("yf"), 1023);
            });
        
            it("should handle 3-character encodings", () => {
              equal(base41.encode(1024), "zfB");
              equal(base41.encode(65535), "Wzx");
              equal(base41.decode("zfB"), 1024);
              equal(base41.decode("Wzx"), 65535);
            });
        
            it("should handle 4-character encodings", () => {
              equal(base41.encode(65536), "XzxB");
              equal(base41.encode(2097151), "CdWn");
              equal(base41.decode("XzxB"), 65536);
              equal(base41.decode("CdWn"), 2097151);
            });
        
            it("should handle 5-character encodings", () => {
              equal(base41.encode(2097152), "DdWnB");
              equal(base41.encode(67108863), "czknd");
              equal(base41.decode("DdWnB"), 2097152);
              equal(base41.decode("czknd"), 67108863);
            });
        
            it("should handle 6-character encodings", () => {
              equal(base41.encode(67108864), "dzkndB");
              equal(base41.encode(4294967295), "vQNxDw");
              equal(base41.decode("dzkndB"), 67108864);
              equal(base41.decode("vQNxDw"), 4294967295);
            });
        
            it("should handle 7-character encodings", () => {
              equal(base41.encode(4294967296), "wQNxDwB");
              equal(base41.encode(137438953471), "tDDtPxk");
              equal(base41.decode("wQNxDwB"), 4294967296);
              equal(base41.decode("tDDtPxk"), 137438953471);
            });
        
            it("should handle 8-character encodings", () => {
              equal(base41.encode(137438953472), "vDDtPxkB");
              equal(base41.encode(4398046511103), "FNgSNvdc");
              equal(base41.decode("vDDtPxkB"), 137438953472);
              equal(base41.decode("FNgSNvdc"), 4398046511103);
            });
        
            it("should handle 9-character encodings", () => {
              equal(base41.encode(4398046511104), "GNgSNvdcB");
              equal(base41.encode(281474976710655), "MpVrJfPNt");
              equal(base41.decode("GNgSNvdcB"), 4398046511104);
              equal(base41.decode("MpVrJfPNt"), 281474976710655);
            });
        
            it("should handle 10-character encodings", () => {
              equal(base41.encode(281474976710656), "NpVrJfPNtB");
              equal(base41.encode(9007199254740991), "qTFFRtCCbj");
              equal(base41.decode("NpVrJfPNtB"), 281474976710656);
              equal(base41.decode("qTFFRtCCbj"), 9007199254740991);
            });
        
            it("should handle 11-character encodings", () => {
              equal(base41.encode(9007199254740992n), "rTFFRtCCbjB");
              equal(base41.encode(288230376151711739n), "hRhVLdXrVYb");
              equal(base41.decode("rTFFRtCCbjB"), 9007199254740992n);
              equal(base41.decode("hRhVLdXrVYb"), 288230376151711739n);
            });
        
            it("should handle 12-character encodings", () => {
              equal(base41.encode(288230376151711740n), "jRhVLdXrVYbB");
              equal(base41.encode(18446744073709551615n), "TYGzGMzLNQbr");
              equal(base41.decode("jRhVLdXrVYbB"), 288230376151711740n);
              equal(base41.decode("TYGzGMzLNQbr"), 18446744073709551615n);
            });
          });
      
          describe("Multiple values", () => {
            it("should handle 1-character encodings", () => {
              equal(base41.encode(new BigUint64Array([1n, 1n])), "CBBBBBBBBBBBC");
              equal(base41.encode(new BigUint64Array([31n, 31n])), "pBBBBBBBBBBBp");
              deepEqual(base41.decode("CBBBBBBBBBBBC"), new BigUint64Array([1n, 1n]).buffer);
              deepEqual(base41.decode("pBBBBBBBBBBBp"), new BigUint64Array([31n, 31n]).buffer);
            });
        
            it("should handle 2-character encodings", () => {
              equal(base41.encode(new BigUint64Array([32n, 32n])), "qBBBBBBBBBBBqB");
              equal(base41.encode(new BigUint64Array([1023n, 1023n])), "yfBBBBBBBBBByf");
              deepEqual(base41.decode("qBBBBBBBBBBBqB"), new BigUint64Array([32n, 32n]).buffer);
              deepEqual(base41.decode("yfBBBBBBBBBByf"), new BigUint64Array([1023n, 1023n]).buffer);
            });
        
            it("should handle 3-character encodings", () => {
              equal(base41.encode(new BigUint64Array([1024n, 1024n])), "zfBBBBBBBBBBzfB");
              equal(base41.encode(new BigUint64Array([65535n, 65535n])), "WzxBBBBBBBBBWzx");
              deepEqual(base41.decode("zfBBBBBBBBBBzfB"), new BigUint64Array([1024n, 1024n]).buffer);
              deepEqual(base41.decode("WzxBBBBBBBBBWzx"), new BigUint64Array([65535n, 65535n]).buffer);
            });
        
            it("should handle 10-character encodings", () => {
              equal(base41.encode(new BigUint64Array([281474976710656n, 281474976710656n])), "NpVrJfPNtBBBNpVrJfPNtB");
              equal(base41.encode(new BigUint64Array([9007199254740991n, 9007199254740991n])), "qTFFRtCCbjBBqTFFRtCCbj");
              deepEqual(base41.decode("NpVrJfPNtBBBNpVrJfPNtB"), new BigUint64Array([281474976710656n, 281474976710656n]).buffer);
              deepEqual(base41.decode("qTFFRtCCbjBBqTFFRtCCbj"), new BigUint64Array([9007199254740991n, 9007199254740991n]).buffer);
            });
        
            it("should handle 11-character encodings", () => {
              equal(base41.encode(new BigUint64Array([9007199254740992n, 9007199254740992n])), "rTFFRtCCbjBBrTFFRtCCbjB");
              equal(base41.encode(new BigUint64Array([288230376151711739n, 288230376151711739n])), "hRhVLdXrVYbBhRhVLdXrVYb");
              deepEqual(base41.decode("rTFFRtCCbjBBrTFFRtCCbjB"), new BigUint64Array([9007199254740992n, 9007199254740992n]).buffer);
              deepEqual(base41.decode("hRhVLdXrVYbBhRhVLdXrVYb"), new BigUint64Array([288230376151711739n, 288230376151711739n]).buffer);
            });
        
            it("should handle 12-character encodings", () => {
              equal(base41.encode(new BigUint64Array([288230376151711740n, 288230376151711740n])), "jRhVLdXrVYbBjRhVLdXrVYbB");
              equal(base41.encode(new BigUint64Array([18446744073709551615n, 18446744073709551615n])), "TYGzGMzLNQbrTYGzGMzLNQbr");
              deepEqual(base41.decode("jRhVLdXrVYbBjRhVLdXrVYbB"), new BigUint64Array([288230376151711740n, 288230376151711740n]).buffer);
              deepEqual(base41.decode("TYGzGMzLNQbrTYGzGMzLNQbr"), new BigUint64Array([18446744073709551615n, 18446744073709551615n]).buffer);
            });
          });
        });

        describe("Unpadded", () => {
          const base41 = new Base41({
            pad: false
          });
      
          it("should handle 1-character encodings", () => {
            equal(base41.encode(1), "C");
            equal(base41.encode(31), "p");
            equal(base41.decode("C"), 1);
            equal(base41.decode("p"), 31);
          });
      
          it("should handle 2-character encodings", () => {
            equal(base41.encode(32), "q");
            equal(base41.encode(1023), "yf");
            equal(base41.decode("q"), 32);
            equal(base41.decode("yf"), 1023);
          });
      
          it("should handle 3-character encodings", () => {
            equal(base41.encode(1024), "zf");
            equal(base41.encode(65535), "Wzx");
            equal(base41.decode("zf"), 1024);
            equal(base41.decode("Wzx"), 65535);
          });
      
          it("should handle 4-character encodings", () => {
            equal(base41.encode(65536), "Xzx");
            equal(base41.encode(2097151), "CdWn");
            equal(base41.decode("Xzx"), 65536);
            equal(base41.decode("CdWn"), 2097151);
          });
      
          it("should handle 5-character encodings", () => {
            equal(base41.encode(2097152), "DdWn");
            equal(base41.encode(67108863), "czknd");
            equal(base41.decode("DdWn"), 2097152);
            equal(base41.decode("czknd"), 67108863);
          });
      
          it("should handle 6-character encodings", () => {
            equal(base41.encode(67108864), "dzknd");
            equal(base41.encode(4294967295), "vQNxDw");
            equal(base41.decode("dzknd"), 67108864);
            equal(base41.decode("vQNxDw"), 4294967295);
          });
      
          it("should handle 7-character encodings", () => {
            equal(base41.encode(4294967296), "wQNxDw");
            equal(base41.encode(137438953471), "tDDtPxk");
            equal(base41.decode("wQNxDw"), 4294967296);
            equal(base41.decode("tDDtPxk"), 137438953471);
          });
      
          it("should handle 8-character encodings", () => {
            equal(base41.encode(137438953472), "vDDtPxk");
            equal(base41.encode(4398046511103), "FNgSNvdc");
            equal(base41.decode("vDDtPxk"), 137438953472);
            equal(base41.decode("FNgSNvdc"), 4398046511103);
          });
      
          it("should handle 9-character encodings", () => {
            equal(base41.encode(4398046511104), "GNgSNvdc");
            equal(base41.encode(281474976710655), "MpVrJfPNt");
            equal(base41.decode("GNgSNvdc"), 4398046511104);
            equal(base41.decode("MpVrJfPNt"), 281474976710655);
          });
      
          it("should handle 10-character encodings", () => {
            equal(base41.encode(281474976710656), "NpVrJfPNt");
            equal(base41.encode(9007199254740991), "qTFFRtCCbj");
            equal(base41.decode("NpVrJfPNt"), 281474976710656);
            equal(base41.decode("qTFFRtCCbj"), 9007199254740991);
          });
      
          it("should handle 11-character encodings", () => {
            equal(base41.encode(9007199254740992), "rTFFRtCCbj");
            equal(base41.encode(288230376151711739n), "hRhVLdXrVYb");
            equal(base41.decode("rTFFRtCCbj"), 9007199254740992);
            equal(base41.decode("hRhVLdXrVYb"), 288230376151711739n);
          });
      
          it("should handle 12-character encodings", () => {
            equal(base41.encode(288230376151711740n), "jRhVLdXrVYb");
            equal(base41.encode(18446744073709551615n), "TYGzGMzLNQbr");
            equal(base41.decode("jRhVLdXrVYb"), 288230376151711740n);
            equal(base41.decode("TYGzGMzLNQbr"), 18446744073709551615n);
          });
        });
      });

      describe("Fluid (single output length)", () => {
        describe("Padded", () => {
          const base41 = new Base41({
            outputs: 7
          });
      
          it("should handle 1-character encodings", () => {
            equal(base41.encode(1), "CBBBBBB");
            equal(base41.encode(31), "pBBBBBB");
            equal(base41.decode("CBBBBBB"), 1);
            equal(base41.decode("pBBBBBB"), 31);
          });
      
          it("should handle 2-character encodings", () => {
            equal(base41.encode(32), "qBBBBBB");
            equal(base41.encode(1023), "yfBBBBB");
            equal(base41.decode("qBBBBBB"), 32);
            equal(base41.decode("yfBBBBB"), 1023);
          });
      
          it("should handle 3-character encodings", () => {
            equal(base41.encode(1024), "zfBBBBB");
            equal(base41.encode(65535), "WzxBBBB");
            equal(base41.decode("zfBBBBB"), 1024);
            equal(base41.decode("WzxBBBB"), 65535);
          });
      
          it("should handle 4-character encodings", () => {
            equal(base41.encode(65536), "XzxBBBB");
            equal(base41.encode(2097151), "CdWnBBB");
            equal(base41.decode("XzxBBBB"), 65536);
            equal(base41.decode("CdWnBBB"), 2097151);
          });
      
          it("should handle 5-character encodings", () => {
            equal(base41.encode(2097152), "DdWnBBB");
            equal(base41.encode(67108863), "czkndBB");
            equal(base41.decode("DdWnBBB"), 2097152);
            equal(base41.decode("czkndBB"), 67108863);
          });
      
          it("should handle 6-character encodings", () => {
            equal(base41.encode(67108864), "dzkndBB");
            equal(base41.encode(4294967295), "vQNxDwB");
            equal(base41.decode("dzkndBB"), 67108864);
            equal(base41.decode("vQNxDwB"), 4294967295);
          });
      
          it("should handle 7-character encodings", () => {
            equal(base41.encode(4294967296), "wQNxDwB");
            equal(base41.encode(137438953471), "tDDtPxk");
            equal(base41.decode("wQNxDwB"), 4294967296);
            equal(base41.decode("tDDtPxk"), 137438953471);
          });
      
          it("should handle 8-character encodings", () => {
            equal(base41.encode(137438953472), "vDDtPxkB");
            equal(base41.encode(4398046511103), "FNgSNvdc");
            equal(base41.decode("vDDtPxkB"), 137438953472);
            equal(base41.decode("FNgSNvdc"), 4398046511103);
          });
      
          it("should handle 9-character encodings", () => {
            equal(base41.encode(4398046511104), "GNgSNvdcB");
            equal(base41.encode(281474976710655), "MpVrJfPNt");
            equal(base41.decode("GNgSNvdcB"), 4398046511104);
            equal(base41.decode("MpVrJfPNt"), 281474976710655);
          });
      
          it("should handle 10-character encodings", () => {
            equal(base41.encode(281474976710656), "NpVrJfPNtB");
            equal(base41.encode(9007199254740991), "qTFFRtCCbj");
            equal(base41.decode("NpVrJfPNtB"), 281474976710656);
            equal(base41.decode("qTFFRtCCbj"), 9007199254740991);
          });
      
          it("should handle 11-character encodings", () => {
            equal(base41.encode(9007199254740992n), "rTFFRtCCbjB");
            equal(base41.encode(288230376151711739n), "hRhVLdXrVYb");
            equal(base41.decode("rTFFRtCCbjB"), 9007199254740992n);
            equal(base41.decode("hRhVLdXrVYb"), 288230376151711739n);
          });
      
          it("should handle 12-character encodings", () => {
            equal(base41.encode(288230376151711740n), "jRhVLdXrVYbB");
            equal(base41.encode(18446744073709551615n), "TYGzGMzLNQbr");
            equal(base41.decode("jRhVLdXrVYbB"), 288230376151711740n);
            equal(base41.decode("TYGzGMzLNQbr"), 18446744073709551615n);
          });
        });

        describe("Unpadded", () => {
          const base41 = new Base41({
            outputs: 7,
            pad: false
          });
      
          it("should handle 1-character encodings", () => {
            equal(base41.encode(1), "CBBBBBB");
            equal(base41.encode(31), "pBBBBBB");
            equal(base41.decode("CBBBBBB"), 1);
            equal(base41.decode("pBBBBBB"), 31);
          });
      
          it("should handle 2-character encodings", () => {
            equal(base41.encode(32), "qBBBBBB");
            equal(base41.encode(1023), "yfBBBBB");
            equal(base41.decode("qBBBBBB"), 32);
            equal(base41.decode("yfBBBBB"), 1023);
          });
      
          it("should handle 3-character encodings", () => {
            equal(base41.encode(1024), "zfBBBBB");
            equal(base41.encode(65535), "WzxBBBB");
            equal(base41.decode("zfBBBBB"), 1024);
            equal(base41.decode("WzxBBBB"), 65535);
          });
      
          it("should handle 4-character encodings", () => {
            equal(base41.encode(65536), "XzxBBBB");
            equal(base41.encode(2097151), "CdWnBBB");
            equal(base41.decode("XzxBBBB"), 65536);
            equal(base41.decode("CdWnBBB"), 2097151);
          });
      
          it("should handle 5-character encodings", () => {
            equal(base41.encode(2097152), "DdWnBBB");
            equal(base41.encode(67108863), "czkndBB");
            equal(base41.decode("DdWnBBB"), 2097152);
            equal(base41.decode("czkndBB"), 67108863);
          });
      
          it("should handle 6-character encodings", () => {
            equal(base41.encode(67108864), "dzkndBB");
            equal(base41.encode(4294967295), "vQNxDwB");
            equal(base41.decode("dzkndBB"), 67108864);
            equal(base41.decode("vQNxDwB"), 4294967295);
          });
      
          it("should handle 7-character encodings", () => {
            equal(base41.encode(4294967296), "wQNxDwB");
            equal(base41.encode(137438953471), "tDDtPxk");
            equal(base41.decode("wQNxDwB"), 4294967296);
            equal(base41.decode("tDDtPxk"), 137438953471);
          });
      
          it("should handle 8-character encodings", () => {
            equal(base41.encode(137438953472), "vDDtPxk");
            equal(base41.encode(4398046511103), "FNgSNvdc");
            equal(base41.decode("vDDtPxk"), 137438953472);
            equal(base41.decode("FNgSNvdc"), 4398046511103);
          });
      
          it("should handle 9-character encodings", () => {
            equal(base41.encode(4398046511104), "GNgSNvdc");
            equal(base41.encode(281474976710655), "MpVrJfPNt");
            equal(base41.decode("GNgSNvdc"), 4398046511104);
            equal(base41.decode("MpVrJfPNt"), 281474976710655);
          });
      
          it("should handle 10-character encodings", () => {
            equal(base41.encode(281474976710656), "NpVrJfPNt");
            equal(base41.encode(9007199254740991), "qTFFRtCCbj");
            equal(base41.decode("NpVrJfPNt"), 281474976710656);
            equal(base41.decode("qTFFRtCCbj"), 9007199254740991);
          });
      
          it("should handle 11-character encodings", () => {
            equal(base41.encode(9007199254740992), "rTFFRtCCbj");
            equal(base41.encode(288230376151711739n), "hRhVLdXrVYb");
            equal(base41.decode("rTFFRtCCbj"), 9007199254740992);
            equal(base41.decode("hRhVLdXrVYb"), 288230376151711739n);
          });
      
          it("should handle 12-character encodings", () => {
            equal(base41.encode(288230376151711740n), "jRhVLdXrVYb");
            equal(base41.encode(18446744073709551615n), "TYGzGMzLNQbr");
            equal(base41.decode("jRhVLdXrVYb"), 288230376151711740n);
            equal(base41.decode("TYGzGMzLNQbr"), 18446744073709551615n);
          });
        });
      });

      describe("Explicit (multiple output lengths)", () => {
        describe("Padded", () => {
          const base41 = new Base41({
            outputs: [5, 7]
          });
      
          it("should handle 1-character encodings", () => {
            equal(base41.encode(1), "CBBBB");
            equal(base41.encode(31), "pBBBB");
            equal(base41.decode("CBBBB"), 1);
            equal(base41.decode("pBBBB"), 31);
          });
      
          it("should handle 2-character encodings", () => {
            equal(base41.encode(32), "qBBBB");
            equal(base41.encode(1023), "yfBBB");
            equal(base41.decode("qBBBB"), 32);
            equal(base41.decode("yfBBB"), 1023);
          });
      
          it("should handle 3-character encodings", () => {
            equal(base41.encode(1024), "zfBBB");
            equal(base41.encode(65535), "WzxBB");
            equal(base41.decode("zfBBB"), 1024);
            equal(base41.decode("WzxBB"), 65535);
          });
      
          it("should handle 4-character encodings", () => {
            equal(base41.encode(65536), "XzxBB");
            equal(base41.encode(2097151), "CdWnB");
            equal(base41.decode("XzxBB"), 65536);
            equal(base41.decode("CdWnB"), 2097151);
          });
      
          it("should handle 5-character encodings", () => {
            equal(base41.encode(2097152), "DdWnB");
            equal(base41.encode(67108863), "czknd");
            equal(base41.decode("DdWnB"), 2097152);
            equal(base41.decode("czknd"), 67108863);
          });
      
          it("should handle 6-character encodings", () => {
            equal(base41.encode(67108864), "dzkndBB");
            equal(base41.encode(4294967295), "vQNxDwB");
            equal(base41.decode("dzkndBB"), 67108864);
            equal(base41.decode("vQNxDwB"), 4294967295);
          });
      
          it("should handle 7-character encodings", () => {
            equal(base41.encode(4294967296), "wQNxDwB");
            equal(base41.encode(137438953471), "tDDtPxk");
            equal(base41.decode("wQNxDwB"), 4294967296);
            equal(base41.decode("tDDtPxk"), 137438953471);
          });
      
          it("should handle 8-character encodings", () => {
            equal(base41.encode(137438953472), "vDDtPxkB");
            equal(base41.encode(4398046511103), "FNgSNvdc");
            equal(base41.decode("vDDtPxkB"), 137438953472);
            equal(base41.decode("FNgSNvdc"), 4398046511103);
          });
      
          it("should handle 9-character encodings", () => {
            equal(base41.encode(4398046511104), "GNgSNvdcB");
            equal(base41.encode(281474976710655), "MpVrJfPNt");
            equal(base41.decode("GNgSNvdcB"), 4398046511104);
            equal(base41.decode("MpVrJfPNt"), 281474976710655);
          });
      
          it("should handle 10-character encodings", () => {
            equal(base41.encode(281474976710656), "NpVrJfPNtB");
            equal(base41.encode(9007199254740991), "qTFFRtCCbj");
            equal(base41.decode("NpVrJfPNtB"), 281474976710656);
            equal(base41.decode("qTFFRtCCbj"), 9007199254740991);
          });
      
          it("should handle 11-character encodings", () => {
            equal(base41.encode(9007199254740992n), "rTFFRtCCbjB");
            equal(base41.encode(288230376151711739n), "hRhVLdXrVYb");
            equal(base41.decode("rTFFRtCCbjB"), 9007199254740992n);
            equal(base41.decode("hRhVLdXrVYb"), 288230376151711739n);
          });
      
          it("should handle 12-character encodings", () => {
            equal(base41.encode(288230376151711740n), "jRhVLdXrVYbB");
            equal(base41.encode(18446744073709551615n), "TYGzGMzLNQbr");
            equal(base41.decode("jRhVLdXrVYbB"), 288230376151711740n);
            equal(base41.decode("TYGzGMzLNQbr"), 18446744073709551615n);
          });
        });

        describe("Unpadded", () => {
          const base41 = new Base41({
            outputs: [5, 7],
            pad: false
          });
      
          it("should handle 1-character encodings", () => {
            equal(base41.encode(1), "CBBBB");
            equal(base41.encode(31), "pBBBB");
            equal(base41.decode("CBBBB"), 1);
            equal(base41.decode("pBBBB"), 31);
          });
      
          it("should handle 2-character encodings", () => {
            equal(base41.encode(32), "qBBBB");
            equal(base41.encode(1023), "yfBBB");
            equal(base41.decode("qBBBB"), 32);
            equal(base41.decode("yfBBB"), 1023);
          });
      
          it("should handle 3-character encodings", () => {
            equal(base41.encode(1024), "zfBBB");
            equal(base41.encode(65535), "WzxBB");
            equal(base41.decode("zfBBB"), 1024);
            equal(base41.decode("WzxBB"), 65535);
          });
      
          it("should handle 4-character encodings", () => {
            equal(base41.encode(65536), "XzxBB");
            equal(base41.encode(2097151), "CdWnB");
            equal(base41.decode("XzxBB"), 65536);
            equal(base41.decode("CdWnB"), 2097151);
          });
      
          it("should handle 5-character encodings", () => {
            equal(base41.encode(2097152), "DdWnB");
            equal(base41.encode(67108863), "czknd");
            equal(base41.decode("DdWnB"), 2097152);
            equal(base41.decode("czknd"), 67108863);
          });
      
          it("should handle 6-character encodings", () => {
            equal(base41.encode(67108864), "dzkndBB");
            equal(base41.encode(4294967295), "vQNxDwB");
            equal(base41.decode("dzkndBB"), 67108864);
            equal(base41.decode("vQNxDwB"), 4294967295);
          });
      
          it("should handle 7-character encodings", () => {
            equal(base41.encode(4294967296), "wQNxDwB");
            equal(base41.encode(137438953471), "tDDtPxk");
            equal(base41.decode("wQNxDwB"), 4294967296);
            equal(base41.decode("tDDtPxk"), 137438953471);
          });
      
          it("should handle 8-character encodings", () => {
            equal(base41.encode(137438953472), "vDDtPxk");
            equal(base41.encode(4398046511103), "FNgSNvdc");
            equal(base41.decode("vDDtPxk"), 137438953472);
            equal(base41.decode("FNgSNvdc"), 4398046511103);
          });
      
          it("should handle 9-character encodings", () => {
            equal(base41.encode(4398046511104), "GNgSNvdc");
            equal(base41.encode(281474976710655), "MpVrJfPNt");
            equal(base41.decode("GNgSNvdc"), 4398046511104);
            equal(base41.decode("MpVrJfPNt"), 281474976710655);
          });
      
          it("should handle 10-character encodings", () => {
            equal(base41.encode(281474976710656), "NpVrJfPNt");
            equal(base41.encode(9007199254740991), "qTFFRtCCbj");
            equal(base41.decode("NpVrJfPNt"), 281474976710656);
            equal(base41.decode("qTFFRtCCbj"), 9007199254740991);
          });
      
          it("should handle 11-character encodings", () => {
            equal(base41.encode(9007199254740992), "rTFFRtCCbj");
            equal(base41.encode(288230376151711739n), "hRhVLdXrVYb");
            equal(base41.decode("rTFFRtCCbj"), 9007199254740992);
            equal(base41.decode("hRhVLdXrVYb"), 288230376151711739n);
          });
      
          it("should handle 12-character encodings", () => {
            equal(base41.encode(288230376151711740n), "jRhVLdXrVYb");
            equal(base41.encode(18446744073709551615n), "TYGzGMzLNQbr");
            equal(base41.decode("jRhVLdXrVYb"), 288230376151711740n);
            equal(base41.decode("TYGzGMzLNQbr"), 18446744073709551615n);
          });
        });
      });
    });

    describe("Prime", () => {
      describe("Adaptive", () => {
        describe("Padded", () => {
          const base41 = new Base41({
            prime: true
          });

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
      equal(base41.encode(31), "T");
      equal(base41.decode("F"), 1);
      equal(base41.decode("T"), 31);
    });

    it("should handle 2-character encodings", () => {
      equal(base41.encode(32), "ft");
      equal(base41.encode(1023), "GD");
      equal(base41.decode("ft"), 32);
      equal(base41.decode("GD"), 1023);
    });

    it("should handle 3-character encodings", () => {
      equal(base41.encode(1024), "CDt");
      equal(base41.encode(65535), "WCH");
      equal(base41.decode("CDt"), 1024);
      equal(base41.decode("WCH"), 65535);
    });

    it("should handle 4-character encodings", () => {
      equal(base41.encode(65536), "wCHt");
      equal(base41.encode(2097151), "FpWK");
      equal(base41.decode("wCHt"), 65536);
      equal(base41.decode("FpWK"), 2097151);
    });

    it("should handle 5-character encodings", () => {
      equal(base41.encode(2097152), "VpWKt");
      equal(base41.encode(67108863), "BCjKp");
      equal(base41.decode("VpWKt"), 2097152);
      equal(base41.decode("BCjKp"), 67108863);
    });

    it("should handle 6-character encodings", () => {
      equal(base41.encode(67108864), "pCjKpt");
      equal(base41.encode(4294967295), "MnxHVv");
      equal(base41.decode("pCjKpt"), 67108864);
      equal(base41.decode("MnxHVv"), 4294967295);
    });

    it("should handle 7-character encodings", () => {
      equal(base41.encode(4294967296), "vnxHVvt");
      equal(base41.encode(137438953471), "NVVNrHj");
      equal(base41.decode("vnxHVvt"), 4294967296);
      equal(base41.decode("NVVNrHj"), 137438953471);
    });

    it("should handle 8-character encodings", () => {
      equal(base41.encode(137438953472), "MVVNrHjt");
      equal(base41.encode(4398046511103), "XxzkxMpB");
      equal(base41.decode("MVVNrHjt"), 137438953472);
      equal(base41.decode("XxzkxMpB"), 4398046511103);
    });

    it("should handle 9-character encodings", () => {
      equal(base41.encode(4398046511104), "cxzkxMpBt");
      equal(base41.encode(281474976710655), "hTJgbDrxN");
      equal(base41.decode("cxzkxMpBt"), 4398046511104);
      equal(base41.decode("hTJgbDrxN"), 281474976710655);
    });

    it("should handle 10-character encodings", () => {
      equal(base41.encode(281474976710656), "xTJgbDrxNt");
      equal(base41.encode(9007199254740991), "fRXXPNFFds");
      equal(base41.decode("xTJgbDrxNt"), 281474976710656);
      equal(base41.decode("fRXXPNFFds"), 9007199254740991);
    });

    it("should handle 11-character encodings", () => {
      equal(base41.encode(9007199254740992n), "gRXXPNFFdst");
      equal(base41.encode(288230376151711739n), "YPYJypwgJqd");
      equal(base41.decode("gRXXPNFFdst"), 9007199254740992n);
      equal(base41.decode("YPYJypwgJqd"), 288230376151711739n);
    });

    it("should handle 12-character encodings", () => {
      equal(base41.encode(288230376151711740n), "sPYJypwgJqdt");
      equal(base41.encode(18446744073709551615n), "RqcCchCyxndg");
      equal(base41.decode("sPYJypwgJqdt"), 288230376151711740n);
      equal(base41.decode("RqcCchCyxndg"), 18446744073709551615n);
    });
  });
});