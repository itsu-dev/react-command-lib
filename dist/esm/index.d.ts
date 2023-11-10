/**
 * Command Interface.
 */
interface AbstractCommand {
  execute(): void;
  undo(): void;
}

/**
 * Command Executor
 */
type CommandExecutor = {
  execute: (command: AbstractCommand) => void;
  undo: VoidFunction;
  redo: VoidFunction;
  isUndoable: boolean;
  isRedoable: boolean;
};

type Args = {
  /**
   * Max Command Stack Size
   */
  maxStackSize?: number;
};

declare function useCommandExecutor(args?: Args): CommandExecutor;

export { type AbstractCommand, type Args, type CommandExecutor, useCommandExecutor };
