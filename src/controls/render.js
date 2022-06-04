import { workers, invocations } from '../config';
import {
    setIsButtonActive,
    workerResponseCallback,
    setTimeData,
    triggerBenchmarkStep,
    putTimeToResultTemplateString
} from './helpers';
import { ELEMENT } from './static';

const { BTN_START, BTN_START_GLOBAL, PRE_SUMMARY, BTN_START_WORKER } = ELEMENT;

const generateButtonOnClickHandler = (workerName, worker, el) => () => {
    const { method, params, iterations } = el;

    workers[workerName].blocked += 1;

    setTimeData(method, workerName, '...');
    worker.postMessage({ name: workerName, method, params, iterations });

    setIsButtonActive(BTN_START_GLOBAL, false);
    setIsButtonActive(`${workerName}-button`, false);

    document.getElementById(PRE_SUMMARY).innerText = '';
};

export const render = () => {
    Object.keys(workers).forEach((key) => {
        workers[key].instance.addEventListener('message', workerResponseCallback);
    });
    
    let globalButton = document.createElement('button');
    globalButton.innerText = 'start (all steps)';
    globalButton.classList.add(BTN_START, BTN_START_GLOBAL);
    globalButton.onclick = triggerBenchmarkStep;
    document.body.appendChild(globalButton);
    
    for (const el of invocations) {
        let title = document.createElement('h3');
        title.innerText = `${el.method} ${JSON.stringify(el.params)}`;
        document.body.appendChild(title);
    
        Object.keys(workers).forEach((key) => {
            let button = document.createElement('button');
            button.innerText = `start (${key})`;
            button.classList.add(BTN_START, BTN_START_WORKER, `${key}-button`);
            button.onclick = generateButtonOnClickHandler(key, workers[key].instance, el);
    
            let line = document.createElement('hr');
    
            let result = document.createElement('div');
            result.setAttribute('id', `${el.method}_${key}`);
            result.innerText = putTimeToResultTemplateString();
    
            document.body.appendChild(button);
            document.body.appendChild(result);
            document.body.appendChild(line);
        });
    }
    
    
    let summary = document.createElement('pre');
    summary.setAttribute('id', PRE_SUMMARY);
    document.body.appendChild(summary);
}
