[![npm version](https://badge.fury.io/js/react-command-lib.svg)](https://badge.fury.io/js/react-command-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# react-command-lib
This library provides your React project with simple command system.

## Usage

```tsx
import useCommandExecutor from 'react-command-lib/dist/esm';
import {useState} from 'react';

class TestCommand implements AbstractCommand {
    private n: number;
    constructor(n: number) {
        super();
        this.n = n;
    }
    
    execute() {
        console.log(`execute: ${this.n}`);
    }

    undo() {
        console.log(`undo: ${this.n}`);
    }
}


export default function TestComponent() {
    const executor = useCommandExecutor({maxStackSize: 20});
    const [n, setN] = useState<number>(0);

    const onExecuteCick = () => {
        executor.execute(new TestCommand(n));
        setN(n + 1);
    };

    const onUndoClick = () => {
        executor.undo();
    };

    const onRedoClick = () => {
        executor.redo();
    };

    return <>
        <button onClick={onExecuteCick}>Execute</button>
        <button style={{color: executor.isUndoable ? 'black' : 'red'}} onClick={onUndoClick}>Undo</button>
        <button style={{color: executor.isRedoable ? 'black' : 'red'}} onClick={onRedoClick}>Redo</button>
    </>;
}
```
