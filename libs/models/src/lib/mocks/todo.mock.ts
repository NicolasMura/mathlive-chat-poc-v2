import { TodoModel } from '../models/todo.model';


const getDefaults = (): TodoModel => ({
  title: 'Todo Mock Title'
});

export const getTodoMock = (todo?: Partial<TodoModel>): TodoModel => ({
  ...getDefaults(),
  ...todo
});
