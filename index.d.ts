import useCommandExecutor from "./src/useCommandExecutor";

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

export declare function useCommandExecutor(args?: Args): CommandExecutor;