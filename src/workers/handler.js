const handler = (module, context) => (evt) => {
    const { method, params, name, iterations } = evt.data;

    const iters = iterations ? iterations : 1;

    if (module[method]) {
        let result = null;

        const t0 = performance.now();
        for (let i = 0; i < iters; i++) {
            result = module[method](...params);
        }
        const time = performance.now() - t0;
        context.postMessage({
            source: name,
            method,
            time,
            result,
            params: JSON.stringify(params),
            iters
        });
    }
}

export default handler;
