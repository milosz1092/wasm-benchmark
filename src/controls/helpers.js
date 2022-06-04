import { invocations, workers } from '../config';
import { ELEMENT } from './static';

const { BTN_START, BTN_START_GLOBAL, PRE_SUMMARY } = ELEMENT;

export const setIsButtonActive = (className, state) => {
    const buttons = document.getElementsByClassName(className);
    const disabledAttr = 'disabled';

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons.item(i);
        if (state && button.hasAttribute(disabledAttr)) {
            button.removeAttribute(disabledAttr);
        } else if (!button.hasAttribute(disabledAttr)) {
            button.setAttribute(disabledAttr, true);
        }
    }
};

const generateBenchmarkSummary = () => {
    const summaryEl = document.getElementById(PRE_SUMMARY);
    const data = invocations.map((config) => {
        const { method, last_result } = config;

        let winnerKey = '';
        let loserKey = '';
        let winnerValue = null;
        Object.keys(workers).forEach((key) => {
            if (winnerValue === null) {
                winnerKey = key;
                winnerValue = last_result[key];
            } else {
                if (last_result[key] < winnerValue) {
                    loserKey = winnerKey;
                    winnerKey = key;
                } else {
                    loserKey = key;
                }
            }
        });

        const boostResult = 100 - ((last_result[winnerKey] / last_result[loserKey]) * 100);
        const boost = `${Math.floor(boostResult)}%`;

        return {
            method,
            winner: winnerKey,
            boost,
            last_result,
        };
    });

    const output = {
        name: 'Benchmark raport',
        data,
    }
    summaryEl.innerHTML = JSON.stringify(output, null, 2);;
    setIsButtonActive(BTN_START, true);
};

export const putTimeToResultTemplateString = (data) => {
    let output = 'result:';
    if (data) {
        output = `${output} ${data}`;
    }

    if (typeof data === 'number') {
        output = `${output}ms`;
    }
    return output;
};

const updateResultView = () => {
    invocations.forEach((config) => {
        Object.keys(workers).forEach((worker) => {
            try {
                const value = config.last_result[worker];
                if (typeof value !== undefined) {
                    const resultEl = document.getElementById(`${config.method}_${worker}`);
                    resultEl.innerText = putTimeToResultTemplateString(value);
                }
            } catch (error) { }
        });
    });
};

export const setTimeData = (method, source, time) => {
    const configIndex = invocations.findIndex((obj) => obj.method === method);
    const config = invocations[configIndex];
    const lastResultKey = 'last_result';

    if (!config[lastResultKey]) {
        config[lastResultKey] = {};
    }
    config[lastResultKey][source] = time;

    updateResultView();
};

export const triggerBenchmarkStep = () => {
    if (window.benchmarkState.actualStep === window.benchmarkState.allSteps) {
        window.benchmarkState.actualStep = 0;
    }

    if (window.benchmarkState.actualStep === 0) {
        setIsButtonActive(BTN_START, false);
        document.getElementById(PRE_SUMMARY).innerText = '';
    }

    window.benchmarkState.actualStep += 1;

    const step = window.benchmarkState.actualStep;

    const configIndex = Math.floor((step - 1) / 2);
    const workerIndex = step % 2 !== 0 ? 0 : 1;

    const workerKey = Object.keys(workers)[workerIndex];
    const config = invocations[configIndex];

    const worker = workers[workerKey].instance;
    const { method, params, iterations } = config;

    workers[workerKey].blocked += 1;

    setTimeData(method, workerKey, '...');
    worker.postMessage({ name: workerKey, method, params, iterations });
};

const checkIsWorkersFree = (key) => {
    if (key) {
        return workers[key].blocked === 0;
    } else {
        let isFree = true;

        Object.keys(workers).forEach((key) => {
            if (workers[key].blocked > 0) {
                isFree = false;
            }
        });

        return isFree;
    }
}

export const workerResponseCallback = (evt) => {
    if (evt.data) {
        const { source, method, time } = evt.data;
        console.log(evt.data);

        workers[source].blocked -= 1;

        setTimeData(method, source, time);

        const { allSteps, actualStep } = window.benchmarkState;

        if (actualStep === 0) {
            if (checkIsWorkersFree()) {
                setIsButtonActive(BTN_START_GLOBAL, true);
            }
            setIsButtonActive(`${source}-button`, true);
        }

        if (actualStep > 0 && actualStep < allSteps) {
            triggerBenchmarkStep();
        } else if (actualStep > 0) {
            window.benchmarkState.actualStep = 0;
            generateBenchmarkSummary();
        }
    }
};