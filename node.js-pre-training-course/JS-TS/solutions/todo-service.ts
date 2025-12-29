import { TodoApi } from "./todo-api";
import { Todo, TodoStatus } from "./types";

export class TodoService {
  constructor(private readonly api: TodoApi) {}

  async create(title: string, description = ""): Promise<Todo> {
    const newTodo = { title, description, status: TodoStatus.PENDING };
    const createdTodo = await this.api.add(newTodo);
    return createdTodo;
  }

  async toggleStatus(id: number): Promise<Todo> {
    const todo = await this.api.getById(id);
    if (!todo) throw new Error(`Todo with id ${id} not found`);

    let newStatus: TodoStatus;
    switch (todo.status) {
      case TodoStatus.PENDING:
        newStatus = TodoStatus.IN_PROGRESS;
        break;
      case TodoStatus.IN_PROGRESS:
        newStatus = TodoStatus.COMPLETED;
        break;
      case TodoStatus.COMPLETED:
        newStatus = TodoStatus.PENDING;
        break;
      default:
        newStatus = TodoStatus.PENDING;
        break;
    }

    const updated = await this.api.update(id, { ...todo, status: newStatus });
    return updated;
  }

  async search(keyword: string): Promise<Todo[]> {
    return await this.api.search(keyword);
  }
}
