import handler from './handler';

console.log('[THREAD-START] Worker-ES');

import('../methods')
    .then(module => {
        addEventListener('message', handler(module, self));
    })
    .catch(console.error);