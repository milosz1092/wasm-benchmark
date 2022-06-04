export const workers = {
    worker_es: {
        blocked: 0,
        instance:
            new Worker(
                './worker_es.js',
            ),
    },
    worker_wasm: {
        blocked: 0,
        instance:
            new Worker(
                './worker_wasm.js',
            ),
    },
};

export const invocations = [
    {
        method: 'xxhash_own_iter',
        params: ['teststring', 10000],
    },
    {
        method: 'xxhash_once',
        params: ['teststring'],
        iterations: 10000
    },
    {
        method: 'fibonacci_recu',
        params: [40],
    },
    {
        method: 'prime_numbers_in_range',
        params: [1, 100000],
    }
];
