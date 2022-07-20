import { Todo } from '@mathlive-chat-poc/models';

export class TodoModel implements Todo {
  title: string;

  constructor(
    title: string
  ) {
    this.title = title;
  }
}
