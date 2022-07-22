import { useEffect, useState } from 'react';
import { Todo, TodoModel } from '@mathlive-chat-poc/models';
import { Todos } from '@mathlive-chat-poc/frontend-tools-react';


const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:3334/api/todos')
      .then((_) => _.json())
      .then(setTodos)
      .catch((error) => null);
  }, []);

  const addTodo = () => {
    fetch('http://localhost:3334/api/todos', {
      method: 'POST',
      body: '',
    })
      .then((_) => _.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
      })
      .catch((error) => null);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Todos
      </h1>

      <Todos todos={todos} />

      <button
        id={'add-todo'}
        onClick={addTodo}
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block px-6 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
        style={{marginLeft: "10px"}}
      >
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus"
          className="w-3 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor"
            d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z">
          </path>
        </svg>
        Add Todo
      </button>
    </>
  );
};

export default App;
