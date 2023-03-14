class Todo {
    key : string;
    id: string;
    text : string;
    constructor(todotext: string, key: string, id: string) {
        this.key = key;
        this.text = todotext;
        this.id = id;
    }
}

export default Todo;