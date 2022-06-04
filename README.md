## Introduction

WebAssembly as a compilation target for native programming languages give possibility to run code written in, among others, Rust, C++ or C#, on web browsers. Wasm-benchmark is a simple engine allowing to compare execution time performance for algorighms written in Vanilla JS and WASM byte code.

# Description

Engine logic is based on following main parts:

1. Algorighms definitions:
    1. written in Rust, ready for compiling to WASM using wasm-pack [[src]](https://github.com/milosz1092/wasm-benchmark/tree/main/rust-wasm/src/methods)
    2. equivalent in pure JavaScript [[src]](https://github.com/milosz1092/wasm-benchmark/tree/main/src/methods)
3. Methods and invocations config [[src]](https://github.com/milosz1092/wasm-benchmark/blob/main/src/config.js)
4. UI performed in Vanilla JS.

The individual steps in the benchmark are performed in parallel thanks to the use of [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

# Adding new algorithms

Including new methods is partialy dynamic.

### Rust

***Prequsites:** [Rust](https://www.rust-lang.org/tools/install) and [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) installed.*

1. Add new method inside `/wasm-benchmark/rust-wasm/src/methods`. Note that `#[wasm_bindgen]` macro is mandatory.
2. Make new code visible by adding proper export in `/wasm-benchmark/rust-wasm/src/methods/mod.rs`.
3. Go to `/wasm-benchmark/rust-wasm` and run `wasm-pack build --release`. It will generate new package popullated with WASM file and JavaScript bindings.

### JavaScript

1. In `/wasm-benchmark/src/methods` add equivalent JavaScript method to the one created for Rust. Method name and arguments needs to be equal.
2. Export newly created function in `/wasm-benchmark/src/methods/index.js`.
3. Register code to be taken into account by adding correct invocation data in `/wasm-benchmark/src/config.js`.

# Installation

```
npm install
```

# Starting up

### Development
```
npm run dev
```
### Production
```
npm run build
```
