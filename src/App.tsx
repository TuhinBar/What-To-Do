
import './App.css';

import Nav from './components/Nav';
import Todos from './components/Todos';
import NewTodo from './components/NewTodo';

function App() {
  return ( 
    <div>
      <Nav />
      <NewTodo />
      <Todos />
    </div>
  );
}

export default App;
