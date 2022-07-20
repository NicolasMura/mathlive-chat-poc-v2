export interface Todo {
  title: string;
}

export class TodoModel implements Todo {
  title: string;

  constructor(
    title: string
  ) {
    this.title = title;
  }
}
