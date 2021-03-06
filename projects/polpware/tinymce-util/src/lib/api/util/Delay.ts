/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import { clearInterval, clearTimeout, document, HTMLElement, setInterval, setTimeout, window } from '@ephox/dom-globals';
import Promise from './Promise';

type DebounceFunc = (...args: any[]) => { stop: () => void; };

interface Delay {
    requestAnimationFrame(callback: () => void, element?: HTMLElement): void;
    setInterval(callback: () => void, time?: number): number;
    setTimeout(callback: () => void, time?: number): number;
    clearInterval(id: number): void;
    clearTimeout(id: number): void;
    debounce(callback: (...args: any[]) => void, time?: number): DebounceFunc;
    throttle(callback: (...args: any[]) => void, time?: number): DebounceFunc;
}

/**
 * Utility class for working with delayed actions like setTimeout.
 *
 * @class tinymce.util.Delay
 */

let requestAnimationFramePromise;

const requestAnimationFrame = function(callback, element?) {
    let i, requestAnimationFrameFunc: any = window.requestAnimationFrame;
    const vendors = ['ms', 'moz', 'webkit'];

    const featurefill = function(callback) {
        window.setTimeout(callback, 0);
    };

    for (i = 0; i < vendors.length && !requestAnimationFrameFunc; i++) {
        requestAnimationFrameFunc = window[vendors[i] + 'RequestAnimationFrame'];
    }

    if (!requestAnimationFrameFunc) {
        requestAnimationFrameFunc = featurefill;
    }

    requestAnimationFrameFunc(callback, element);
};

const wrappedSetTimeout = function(callback, time?) {
    if (typeof time !== 'number') {
        time = 0;
    }

    return setTimeout(callback, time);
};

const wrappedSetInterval = function(callback: Function, time?: number): number {
    if (typeof time !== 'number') {
        time = 1; // IE 8 needs it to be > 0
    }

    return setInterval(callback, time);
};

const wrappedClearTimeout = function(id: number) {
    return clearTimeout(id);
};

const wrappedClearInterval = function(id: number) {
    return clearInterval(id);
};

const debounce = function(callback: (...args: any[]) => void, time?: number): DebounceFunc {
    let timer, func;

    func = function(...args) {
        clearTimeout(timer);

        timer = wrappedSetTimeout(function() {
            callback.apply(this, args);
        }, time);
    };

    func.stop = function() {
        clearTimeout(timer);
    };

    return func;
};

const Delay: Delay = {
    /**
     * Requests an animation frame and fallbacks to a timeout on older browsers.
     *
     * @method requestAnimationFrame
     * @param {function} callback Callback to execute when a new frame is available.
     * @param {DOMElement} element Optional element to scope it to.
     */
    requestAnimationFrame(callback, element?) {
        if (requestAnimationFramePromise) {
            requestAnimationFramePromise.then(callback);
            return;
        }

        requestAnimationFramePromise = new Promise(function(resolve) {
            if (!element) {
                element = document.body;
            }

            requestAnimationFrame(resolve, element);
        }).then(callback);
    },

    /**
     * Sets a timer in ms and executes the specified callback when the timer runs out.
     *
     * @method setTimeout
     * @param {function} callback Callback to execute when timer runs out.
     * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
     * @return {Number} Timeout id number.
     */
    setTimeout: wrappedSetTimeout,

    /**
     * Sets an interval timer in ms and executes the specified callback at every interval of that time.
     *
     * @method setInterval
     * @param {function} callback Callback to execute when interval time runs out.
     * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
     * @return {Number} Timeout id number.
     */
    setInterval: wrappedSetInterval,

    /**
     * Creates debounced callback function that only gets executed once within the specified time.
     *
     * @method debounce
     * @param {function} callback Callback to execute when timer finishes.
     * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
     * @return {Function} debounced function callback.
     */
    debounce,

    // Throttle needs to be debounce due to backwards compatibility.
    throttle: debounce,

    /**
     * Clears an interval timer so it won't execute.
     *
     * @method clearInterval
     * @param {Number} Interval timer id number.
     */
    clearInterval: wrappedClearInterval,

    /**
     * Clears an timeout timer so it won't execute.
     *
     * @method clearTimeout
     * @param {Number} Timeout timer id number.
     */
    clearTimeout: wrappedClearTimeout
};

export default Delay;
