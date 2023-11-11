/**
 * Command Interface.
 */
export interface AbstractCommand {
  execute(): void;
  undo(): void;
}

/**
 * Command Executor
 */
export type CommandExecutor = {
  execute: (command: AbstractCommand) => void;
  undo: VoidFunction;
  redo: VoidFunction;
  isUndoable: boolean;
  isRedoable: boolean;
};

export type Args = {
  /**
   * Max Command Stack Size
   */
  maxStackSize?: number;
};

declare function useCommandExecutor(args?: Args): CommandExecutor;
export default useCommandExecutor;