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

type Args = {
  /**
   * Max Command Stack Size
   */
  maxStackSize?: number;
};

export type useCommandExecutor = (args?: Args) => CommandExecutor;