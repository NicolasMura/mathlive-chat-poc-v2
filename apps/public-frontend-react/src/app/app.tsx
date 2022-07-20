import { useEffect, useState } from 'react';
import { Todo, TodoModel } from '@mathlive-chat-poc/models';
import { Todos } from '@mathlive-chat-poc/frontend-tools-react';


const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:3334/api/todos')
      .then((_) => _.json())
      .then((t) => {
        console.log('todos:');
        console.log(t);

        return t;
      })
      .then(setTodos)
      .catch((error) => console.error());
  }, []);

  const addTodo = () => {
    fetch('http://localhost:3334/api/todos', {
      method: 'POST',
      body: '',
    })
      .then((_) => _.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        console.log(newTodo);
      });
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Todos
      </h1>
      <Todos todos={todos} />
      {/* <Button
        variant="contained"
        id={'add-todo'}
        onClick={addTodo}
        startIcon={<AddIcon />}
        style={{textTransform: 'none'}}
      >
        Add Todo
      </Button> */}
      <div className="flex space-x-2 justify-center">
        <button disabled
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="ripple-bg-gray-300 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
        >
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          </svg>
          Button
        </button>
      </div>
      <button className="ripple-bg-gray-300">
          Hover me for a lighter background, click me for a ripple effect
      </button>

      <div className="relative rounded-xl overflow-auto p-8">
        <div className="flex items-center justify-center">
          <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </button>
        </div>
      </div>

      <div className="relative rounded-xl overflow-auto p-8">
        <div className="flex items-center justify-center">
          <span className="relative inline-flex">
            <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white dark:bg-slate-800 transition ease-in-out duration-150 cursor-not-allowed ring-1 ring-slate-900/10 dark:ring-slate-200/20" disabled>
              Transactions
            </button>
            <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </span>
        </div>
      </div>

      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
