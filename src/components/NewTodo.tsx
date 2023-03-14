import {useRef, useContext,useState} from 'react';
import { TodosContext } from '../store/todos-context';

import classes from './NewTodo.module.css';

const NewTodo: React.FC = () => {
  const [error,setError] = useState<string | null>(null);
    const textInputRef = useRef<HTMLInputElement>(null);
    const todosCtx = useContext(TodosContext);


    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;

        if(enteredText.trim().length === 0){
            setError("Can't hear you!")
            return;
        }
        if(enteredText.startsWith("Do")){
          try{
            const res = await todosCtx.addTodo(enteredText);
            if(res){
              setError(null);
              textInputRef.current!.value = "";
            }

          } catch(err){
            console.log(err);
          }
          return
        }
        setError("Instructions are meant to be followed!");
        return;
    }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Start with a "Do"!</label>
      <input type="text" id="text" autoComplete='off' onChange={() => setError(null)} ref={textInputRef}/>
      {error && <p className={classes.error}>{error}</p>}
      <button>Add</button>
    </form>
  );
};

export default NewTodo;
