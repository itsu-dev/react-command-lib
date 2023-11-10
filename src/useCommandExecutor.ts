import { useCallback, useMemo, useRef, useState } from 'react';
import {AbstractCommand, Args, CommandExecutor} from "../index";

/**
 * CommandManager-Hook
 * @param maxStackSize Max Command Stack Size (Default=30)
 */
export default function useCommandExecutor({
  maxStackSize = 30,
}: Partial<Args> = {}): CommandExecutor {
  const [stackUpdater, setStackUpdater] = useState<number>(0);
  const _stack = useRef<AbstractCommand[]>([]);
  const _sp = useRef<number>(-1);

  /**
   * Execute a command.
   */
  const execute = useCallback(
    (command: AbstractCommand): void => {
      command.execute();

      for (let i = 0; i < _stack.current.length - _sp.current - 1; i++) {
        _stack.current.pop();
      }

      let newStack = [..._stack.current, command];
      if (newStack.length > maxStackSize) {
        newStack = newStack.slice(
          newStack.length - maxStackSize,
          newStack.length,
        );
      }

      _stack.current = newStack;
      _sp.current = newStack.length - 1;
      setStackUpdater(stackUpdater + 1);
    },
    [stackUpdater],
  );

  /**
   * Undo a command.
   */
  const undo = useCallback(() => {
    if (_sp.current >= 0) {
      _stack.current[_sp.current].undo();
      _sp.current = _sp.current - 1;
      setStackUpdater(stackUpdater + 1);
    }
  }, [stackUpdater]);

  /**
   * Redo a command.
   */
  const redo = useCallback(() => {
    if (0 < _stack.current.length && _sp.current + 1 < _stack.current.length) {
      _stack.current[_sp.current + 1].execute();
      _sp.current = _sp.current + 1;
      setStackUpdater(stackUpdater + 1);
    }
  }, [stackUpdater]);

  /**
   * A flag if it is undoable.
   */
  const isUndoable = useMemo(() => _sp.current >= 0, [stackUpdater]);

  /**
   * A flag if it is redoable.
   */
  const isRedoable = useMemo(
    () => 0 < _stack.current.length && _sp.current + 1 < _stack.current.length,
    [stackUpdater],
  );

  return { execute, undo, redo, isUndoable, isRedoable };
}
