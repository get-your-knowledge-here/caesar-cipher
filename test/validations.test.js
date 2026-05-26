const {
  encrypt,
  decrypt,
  encryptString,
  decryptString,
  EncryptTransform,
  DecryptTransform,
} = require("..");
const fs = require("fs");
const { readFile } = require("fs/promises");
const path = require("path");
const assert = require("assert");
const { pipeline } = require("stream/promises");
const { after, describe, it } = require("node:test");

const emptyFile = path.join(__dirname, "./empty.txt");
const outputFile = path.join(__dirname, "./output1.txt");

describe("@gykh/caesar-cipher", function () {
  describe("Validation", function () {
    it("should throw error for empty file", async function () {
      const data = await readFile(emptyFile);
      assert.throws(() => encrypt(data, 3));
      assert.throws(() => decrypt(data, 3));
    });
    it("should throw error for invalid data", function () {
      const data = undefined;
      assert.throws(() => encrypt(data, 3));
      assert.throws(() => decrypt(data, 3));
    });
    it("should throw error for empty string", function () {
      const data = "";
      assert.throws(() => encryptString(data, 3));
      assert.throws(() => decryptString(data, 3));
    });
    it("should throw error for long string", function () {
      const data = makeString(1001);
      assert.throws(() => encryptString(data, 3));
      assert.throws(() => decryptString(data, 3));
    });
    it("should throw error for no/invalid string key", function () {
      const data = "test";
      const invalidKeys = [undefined, null, "sa", 1.5, -1, 26, NaN];

      invalidKeys.forEach((key) => {
        assert.throws(() => encryptString(data, key));
        assert.throws(() => decryptString(data, key));
      });
    });
    it("should throw error for no/invalid buffer key", function () {
      const data = Buffer.from("test");
      const invalidKeys = [undefined, null, "sa", 1.5, -1, 26, NaN];

      invalidKeys.forEach((key) => {
        assert.throws(() => encrypt(data, key));
        assert.throws(() => decrypt(data, key));
      });
    });
    it("should throw error for non-buffer input", function () {
      assert.throws(() => encrypt("test", 3));
      assert.throws(() => decrypt("test", 3));
    });
    it("should throw error for invalid transform key", function () {
      const invalidKeys = [undefined, null, "as", 1.5, -1, 26, NaN];

      invalidKeys.forEach((key) => {
        assert.throws(() => new EncryptTransform(key));
        assert.throws(() => new DecryptTransform(key));
      });
    });
    it("should handle an empty stream", async function () {
      await pipeline(
        fs.createReadStream(emptyFile),
        new EncryptTransform(3),
        new DecryptTransform(3),
        fs.createWriteStream(outputFile)
      );
    });

    after(() => {
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
      }
    });
  });
});

function makeString(/** @type {number} */ minLength) {
  var result = "a";
  while (result.length < minLength) {
    result += result;
  }
  return result;
}
