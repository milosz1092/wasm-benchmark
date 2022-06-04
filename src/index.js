import { render } from './controls/render';
import { invocations } from './config';

console.log('[THREAD-START] Main-index.js');

window.benchmarkState = {
    allSteps: invocations.length * 2,
    actualStep: 0,
};

render();
