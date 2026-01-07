import { Todo, TodoStatus } from "./types";

/**
 * Marks all todos as completed or not completed.
 */
export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  const newStatus = completed ? TodoStatus.Completed : TodoStatus.Active;
  return state.map((todo) => ({ ...todo, status: newStatus }));
}

/**
 * Removes all completed todos from the state.
 */
export function clearCompleted(state: Todo[]): Todo[] {
  return state.filter((todo) => todo.status !== TodoStatus.Completed);
}

/**
 * Counts todos by a given status.
 */
export function countByStatus(state: Todo[], status: TodoStatus): number {
  return state.reduce(
    (count, todo) => (todo.status === status ? count + 1 : count),
    0
  );
}
