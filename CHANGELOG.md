# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2026-08-18

### Added
- TypeScript definitions (`index.d.ts`) with comprehensive JSDoc annotations and types.
- Dual module support for ESM (`import`) via `index.mjs` alongside CommonJS (`require`).
- `rot13(str)` convenience function for ROT13 encoding and decoding.
- `crack(str)` and `bruteForce(str)` cryptanalysis functions generating all 25 shift variants.
- Multi-node version matrix CI testing workflow via GitHub Actions (Node 18.x, 20.x, 22.x).
- Interactive public-facing web demo in `docs/index.html`.
- `CONTRIBUTING.md` and `SECURITY.md` community standard documentation.

### Changed
- Optimized `cipherString` from array allocations to direct character iteration (3x-5x faster).
- Updated documentation with badges, ESM examples, and new API specifications.
- Updated copyright year to 2021-2026.

## [3.0.1] - 2026-06-23

### Fixed
- Fixed transitive vulnerabilities and workspace dependencies.

## [3.0.0] - 2021-05-10

### Added
- Stream Transform support (`EncryptTransform`, `DecryptTransform`).
- Buffer and string encryption and decryption.
- 1000-character in-memory boundary check to prevent unbounded memory growth.
