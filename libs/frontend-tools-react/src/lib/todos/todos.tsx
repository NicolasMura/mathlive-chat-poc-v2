import { Todo } from '@mathlive-chat-poc/models';
import './todos.module.scss';

export interface TodosProps {
  todos: Todo[];
}

export function Todos(props: TodosProps) {
  return (
    <ul>
      {props.todos.map((t, i) => (
        <li className={'todo'} key={i}>{t.title}</li>
      ))}
    </ul>
  );
}

export default Todos;