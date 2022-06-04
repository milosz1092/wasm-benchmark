import handler from './handler';

console.log('[THREAD-START] Worker-WASM');

import('../../rust-wasm/pkg/wasm_benchmark.js')
    .then(module => {
        addEventListener('message', handler(module, self));
    })
    .catch(console.error);