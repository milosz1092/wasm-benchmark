import { h64 } from 'xxhashjs';

export const xxhash_own_iter = (data, iterations) => {
    let hasher = h64(0);

    for (let i = 0; i < iterations; i++) {
        if (i === 0) {
            hasher = hasher.update(data);
        } else {
            hasher = hasher.update(hasher.digest().toString(16));
        }
    }

    return hasher.digest().toString(16);
};

export const xxhash_once = (data) => {
    return h64(data, 0).toString(16);
};
