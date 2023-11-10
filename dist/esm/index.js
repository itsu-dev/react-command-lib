import { useState, useRef, useCallback, useMemo } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * CommandManager-Hook
 * @param maxStackSize Max Command Stack Size (Default=30)
 */
function useCommandExecutor(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.maxStackSize, maxStackSize = _c === void 0 ? 30 : _c;
    var _d = useState(0), stackUpdater = _d[0], setStackUpdater = _d[1];
    var _stack = useRef([]);
    var _sp = useRef(-1);
    /**
     * Execute a command.
     */
    var execute = useCallback(function (command) {
        command.execute();
        for (var i = 0; i < _stack.current.length - _sp.current - 1; i++) {
            _stack.current.pop();
        }
        var newStack = __spreadArray(__spreadArray([], _stack.current, true), [command], false);
        if (newStack.length > maxStackSize) {
            newStack = newStack.slice(newStack.length - maxStackSize, newStack.length);
        }
        _stack.current = newStack;
        _sp.current = newStack.length - 1;
        setStackUpdater(stackUpdater + 1);
    }, [stackUpdater]);
    /**
     * Undo a command.
     */
    var undo = useCallback(function () {
        if (_sp.current >= 0) {
            _stack.current[_sp.current].undo();
            _sp.current = _sp.current - 1;
            setStackUpdater(stackUpdater + 1);
        }
    }, [stackUpdater]);
    /**
     * Redo a command.
     */
    var redo = useCallback(function () {
        if (0 < _stack.current.length && _sp.current + 1 < _stack.current.length) {
            _stack.current[_sp.current + 1].execute();
            _sp.current = _sp.current + 1;
            setStackUpdater(stackUpdater + 1);
        }
    }, [stackUpdater]);
    /**
     * A flag if it is undoable.
     */
    var isUndoable = useMemo(function () { return _sp.current >= 0; }, [stackUpdater]);
    /**
     * A flag if it is redoable.
     */
    var isRedoable = useMemo(function () { return 0 < _stack.current.length && _sp.current + 1 < _stack.current.length; }, [stackUpdater]);
    return { execute: execute, undo: undo, redo: redo, isUndoable: isUndoable, isRedoable: isRedoable };
}

export { useCommandExecutor as default };
