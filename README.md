# GYKH - caesar-cipher

> One of the simplest forms of encryption

## Install

```sh
pnpm add @gykh/caesar-cipher
```

Requires Node.js 18 or newer.

## Usage

Version 3 implements a classic Caesar cipher for ASCII letters. `A-Z` and
`a-z` shift with wraparound, while punctuation, whitespace, digits, and
non-letter characters are preserved.

Encrypt and decrypt strings:

```js
const { encryptString, decryptString } = require("@gykh/caesar-cipher");

const str = "Hello, World! 123";

const encrypted = encryptString(str, 3);
console.log(encrypted); // Khoor, Zruog! 123

const decrypted = decryptString(encrypted, 3);
console.log(str === decrypted); // true
```

Encrypt and decrypt buffers:

```js
const { encrypt, decrypt } = require("@gykh/caesar-cipher");
const { readFile } = require("fs/promises");

const buffer = await readFile(inputFile);

const encrypted = encrypt(buffer, 3);

const decrypted = decrypt(encrypted, 3);
console.log(buffer.equals(decrypted)); // true
```

Encrypt and decrypt streams. Use this for large data or files:

```js
const { EncryptTransform, DecryptTransform } = require("@gykh/caesar-cipher");
const fs = require("fs");
const { pipeline } = require("stream/promises");

await pipeline(
  fs.createReadStream(inputFile),
  new EncryptTransform(3),
  new DecryptTransform(3),
  fs.createWriteStream(outputFile)
);
```

## API

### caesar-cipher

### .encryptString(input, key)

#### input

Type: `string`<br/>
Required

#### key

Type: `number`<br/>
Required

key should be an integer between 0-25

### .decryptString(input, key)

#### input

Type: `string`<br/>
Required

#### key

Type: `number`<br/>
Required

key should be an integer between 0-25

### .encrypt(input, key)

#### input

Type: `Buffer`<br/>
Required

#### key

Type: `number`<br/>
Required

key should be an integer between 0-25

### .decrypt(input, key)

#### input

Type: `Buffer`<br/>
Required

#### key

Type: `number`<br/>
Required

key should be an integer between 0-25

### new EncryptTransform(key)

#### key

Type: `number`<br/>
Required

key should be an integer between 0-25

### new DecryptTransform(key)

#### key

Type: `number`<br/>
Required

key should be an integer between 0-25

## Understand Caesar Cipher

> The Caesar cipher, also known as a shift cipher, is one of the simplest forms of encryption. It is a substitution cipher where each letter in the original message (called the plaintext) is replaced with a letter corresponding to a certain number of letters up or down in the alphabet. [Learn more](https://learncryptography.com/classical-encryption/caesar-cipher)

## Developer

- [Sylvester Das](https://www.sylvesterdas.com) 

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/sylvester.das)

## License

MIT © 2021 [get-your-knowledge-here](./LICENSE)
