# @gykh/caesar-cipher

> A fast, zero-dependency Caesar shift cipher implementation in Node.js supporting Strings, Buffers, Streams, ROT13, and Cryptanalysis Cracking.

[![npm version](https://img.shields.io/npm/v/@gykh/caesar-cipher.svg?style=flat-square)](https://www.npmjs.com/package/@gykh/caesar-cipher)
[![npm downloads](https://img.shields.io/npm/dm/@gykh/caesar-cipher.svg?style=flat-square)](https://www.npmjs.com/package/@gykh/caesar-cipher)
[![CI Tests](https://img.shields.io/github/actions/workflow/status/get-your-knowledge-here/caesar-cipher/test.yml?branch=main&label=tests&style=flat-square)](https://github.com/get-your-knowledge-here/caesar-cipher/actions)
[![node version](https://img.shields.io/node/v/@gykh/caesar-cipher.svg?style=flat-square)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](./index.d.ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square)](./package.json)
[![Live Demo](https://img.shields.io/badge/demo-live-58a6ff.svg?style=flat-square)](https://get-your-knowledge-here.github.io/caesar-cipher/)
[![MiniFyn](https://img.shields.io/badge/by-MiniFyn-7c3aed.svg?style=flat-square)](https://www.minifyn.com)

**▶ [Try it live in your browser](https://get-your-knowledge-here.github.io/caesar-cipher/)**: encrypt, decrypt, ROT13 and brute-force crack with no install.

---

## Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Interactive Demo](#interactive-demo)
- [More from the Author: MiniFyn](#more-from-the-author-minifyn)
- [Developer](#developer)
- [License](#license)

---

## Features

- 🚀 **Zero Dependencies**: Pure native Node.js implementation.
- ⚡ **High Performance**: Optimized character code mapping with minimal memory allocation.
- 🔄 **Multi-Format Support**: Encrypt and decrypt Strings, Buffers, and Node.js Streams.
- 📦 **Dual ESM & CommonJS**: Full support for both `import` and `require`.
- 📘 **TypeScript Included**: Full type definitions (`index.d.ts`) with rich autocomplete.
- 🕵️ **Cracking & ROT13**: Built-in `rot13(str)` and `crack(str)` / `bruteForce(str)` cryptanalysis helpers.

---

## Install

```sh
pnpm add @gykh/caesar-cipher
# or
npm install @gykh/caesar-cipher
# or
yarn add @gykh/caesar-cipher
```

*Requires Node.js 18 or newer.*

---

## Usage

The Caesar cipher shifts standard ASCII letters (`A-Z` and `a-z`) with wraparound modulo 26, while punctuation, whitespace, digits, and special characters are preserved.

### 1. Strings (ESM & CommonJS)

```js
// ESM
import { encryptString, decryptString, rot13, crack } from "@gykh/caesar-cipher";

// CommonJS
// const { encryptString, decryptString, rot13, crack } = require("@gykh/caesar-cipher");

const message = "Hello, World! 123";

// Encrypt with a shift of 3
const encrypted = encryptString(message, 3);
console.log(encrypted); // "Khoor, Zruog! 123"

// Decrypt back with shift 3
const decrypted = decryptString(encrypted, 3);
console.log(decrypted); // "Hello, World! 123"

// ROT13 shortcut (shift of 13)
const rot13Text = rot13(message);
console.log(rot13(rot13Text) === message); // true

// Brute-force crack an unknown ciphertext
const allPossibleShifts = crack(encrypted);
// Returns an array of 25 possible shifts: [{ shift: 1, text: '...' }, ..., { shift: 3, text: 'Hello, World! 123' }, ...]
```

### 2. Buffers

```js
import { encrypt, decrypt } from "@gykh/caesar-cipher";
import { readFile } from "fs/promises";

const buffer = await readFile("sample.txt");

const encryptedBuffer = encrypt(buffer, 3);
const decryptedBuffer = decrypt(encryptedBuffer, 3);

console.log(buffer.equals(decryptedBuffer)); // true
```

### 3. Streams (For Large Files)

For files or streams exceeding 1000 characters/bytes, use the streaming transform classes:

```js
import { EncryptTransform, DecryptTransform } from "@gykh/caesar-cipher";
import fs from "fs";
import { pipeline } from "stream/promises";

// Encrypt a large file via stream pipeline
await pipeline(
  fs.createReadStream("large-input.txt"),
  new EncryptTransform(3),
  fs.createWriteStream("large-encrypted.txt")
);

// Decrypt stream
await pipeline(
  fs.createReadStream("large-encrypted.txt"),
  new DecryptTransform(3),
  fs.createWriteStream("large-decrypted.txt")
);
```

---

## API Reference

### `encryptString(str, key)`
Encrypts a plaintext string.
* **`str`** (`string`, max 1000 chars): Plaintext string to encrypt.
* **`key`** (`number`, 0–25): Integer shift amount.
* **Returns**: `string`

### `decryptString(str, key)`
Decrypts a ciphertext string.
* **`str`** (`string`, max 1000 chars): Ciphertext string to decrypt.
* **`key`** (`number`, 0–25): Integer shift amount used during encryption.
* **Returns**: `string`

### `rot13(str)`
Convenience utility to encode or decode text using the ROT13 cipher (shift 13).
* **`str`** (`string`, max 1000 chars): Input string.
* **Returns**: `string`

### `crack(str)` / `bruteForce(str)`
Generates all 25 possible Caesar cipher shift permutations for cryptanalysis.
* **`str`** (`string`, max 1000 chars): Encrypted string.
* **Returns**: `Array<{ shift: number, text: string }>`

### `encrypt(buffer, key)`
Encrypts a byte buffer.
* **`buffer`** (`Buffer`, max 1000 bytes): Input buffer.
* **`key`** (`number`, 0–25): Integer shift amount.
* **Returns**: `Buffer`

### `decrypt(buffer, key)`
Decrypts an encrypted byte buffer.
* **`buffer`** (`Buffer`, max 1000 bytes): Input buffer.
* **`key`** (`number`, 0–25): Integer shift amount.
* **Returns**: `Buffer`

### `new EncryptTransform(key)`
A Node.js `stream.Transform` subclass for encrypting stream chunks.
* **`key`** (`number`, 0–25): Shift key.

### `new DecryptTransform(key)`
A Node.js `stream.Transform` subclass for decrypting stream chunks.
* **`key`** (`number`, 0–25): Shift key.

---

## In-Memory Size Boundary Note

> [!NOTE]
> `encryptString`, `decryptString`, `encrypt`, `decrypt`, `rot13`, and `crack` enforce an input limit of **1000 characters/bytes** to protect against unbounded memory spikes in non-streaming workloads. For larger data or file transfers, pipe through `EncryptTransform` / `DecryptTransform`.

---

## Interactive Demo

**Live playground:** [https://get-your-knowledge-here.github.io/caesar-cipher/](https://get-your-knowledge-here.github.io/caesar-cipher/)

Encrypt and decrypt with any shift, apply ROT13, and brute-force all 25 shifts to crack unknown ciphertext, entirely in your browser. To run it offline, open [`docs/index.html`](./docs/index.html) locally.

---

## More from the Author: MiniFyn

If you find this library useful, check out **[MiniFyn](https://www.minifyn.com)**, *the simplest way to shorten, share, and track your links*, and its family of privacy-focused tools:

| Product | What it does | Link |
| --- | --- | --- |
| 🔗 **MiniFyn** | Shorten, share and track links with the short `mnfy.in` domain | [minifyn.com](https://www.minifyn.com) |
| 🧩 **MiniFyn API** | Add link shortening and analytics to your own apps | [API docs](https://www.minifyn.com/docs/api) |
| 🛡️ **ScamGuard** | Check links and QR codes for scams, phishing and malware | [minifyn.com/scamguard](https://www.minifyn.com/scamguard) · [Chrome extension](https://chromewebstore.google.com/detail/scamguard-link-checker/cendbppkhplamddjfnbhgbejnpmfmlbi) |
| 🙈 **CensorFyn** | Offline, on-device AI redaction for photos and videos | [minifyn.com/censorfyn](https://www.minifyn.com/censorfyn) |
| 🎬 **ClipFyn** | Trim and prepare videos for sharing | [minifyn.com/clipfyn](https://www.minifyn.com/clipfyn) |

---

## Developer

- **Sylvester Das** — [Website](https://www.sylvesterdas.com) • [MiniFyn](https://www.minifyn.com) • [Buy Me A Coffee](https://www.buymeacoffee.com/sylvester.das)

---

## License

[MIT](./LICENSE) © 2021-2026 [get-your-knowledge-here](https://github.com/get-your-knowledge-here)
