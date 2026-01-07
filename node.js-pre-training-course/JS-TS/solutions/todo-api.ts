import { InMemoryRepository } from "./repository";
import { Todo, NewTodo, TodoStatus } from "./types";

export class TodoNotFoundError extends Error {
  constructor(id: number) {
    super(`Todo with id ${id} not found`);
    this.name = "TodoNotFoundError";
  }
}
const simulateLatency = () =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 300)
  );

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();
  private nextIdCounter = 1; // Manual ID generation
  private todos: Todo[] = []; // Local copy to simulate listing

  async getAll(): Promise<Todo[]> {
    await simulateLatency();
    return [...this.todos]; // Return a copy
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await simulateLatency();
    const todo: Todo = {
      id: this.nextIdCounter++,
      title: newTodo.title,
      createdAt: new Date(),
      status: TodoStatus.PENDING,
    };
    this.todos.push(todo);
    this.repo.add(todo);
    return todo;
  }

  async update(
    id: number,
    patch: Partial<Omit<Todo, "id" | "createdAt">>
  ): Promise<Todo> {
    await simulateLatency();
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) throw new TodoNotFoundError(id);

    const updated = { ...this.todos[index], ...patch };
    this.todos[index] = updated;

    this.repo.update(id, patch);
    return updated;
  }

  async remove(id: number): Promise<void> {
    await simulateLatency();
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) throw new TodoNotFoundError(id);

    this.todos.splice(index, 1);
    this.repo.remove(id);
  }
}
