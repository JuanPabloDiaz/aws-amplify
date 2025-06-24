import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  // const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>To Do</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App deployed in AWS Amplify
        <br />
        {/* <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates" target="_blank">
        Review tutorial</a> */}
        Try creating a new todo.
        <br />
        Authentication step added but its commented out
        <br/>
        <footer>
          <p>© {new Date().getFullYear()}  by <a href="https://jpdiaz.dev" target="_blank">Juan Diaz</a></p>
        </footer>
      </div>
      {/* <button onClick={signOut}>Sign out</button> */}
    </main>
  );
}

export default App;
