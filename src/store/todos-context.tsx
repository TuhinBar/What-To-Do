import React,{useEffect} from "react";
import Todo from "../models/todos";

type TodoContextObj = {
    items: Todo[];
    addTodo: (text: string) => Object;
    removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodoContextObj>({
  items: [],
  addTodo: (text: string) => Object,
  removeTodo: (id: string) => {},
});

const TodosContextProvider : React.FC = (props) => {
    const [updated, setUpdated] = React.useState<boolean>(false);
    const [todos, setTodos] = React.useState<Todo[]>([]);

    useEffect(() => {
        fetch("https://react-food-290bf-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json")
        .then(res => res.json())
        .then(data => {
            const loadedTodos: Todo[] = [];
            for(const key in data){
                loadedTodos.push(new Todo(
                    data[key].text,
                    key,
                    data[key].id
                ));
            }
            setTodos(loadedTodos);
        })
    },[updated]);


    const addTodoHandler = async (text: string) => {
        const newTodo = new Todo(text, "", (Math.random() * 1000 + 1).toFixed(2).toString());
        const res = await fetch("https://react-food-290bf-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json",{
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json"
            }
        });
        setUpdated(!updated);
        const data: Object= await res.json();
        return data;
    };
    const removeTodoHandler = async (todoId: string) => {
        console.log(todoId);
        const res = await fetch(`https://react-food-290bf-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${todoId}.json`,{
            method: "DELETE",
        });
        setUpdated(!updated);
        console.log(res);
    };
    const contextValue: TodoContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
    };
    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    );
};

export default TodosContextProvider;


