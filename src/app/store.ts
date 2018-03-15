import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS } from "./actions";
import { ToDo } from "./todo.module";

export function tassign<T extends U, U>(target: T, ...source: U[]): T {
    return Object.assign({}, target, ...source);
}

export interface IAppState {
    todos: ToDo[]
    lastUpdate: Date;
}

export const INITIAL_STATE: IAppState = {
    todos: [],
    lastUpdate: null
}

class TodoActions {

    constructor(private state: IAppState, private action) {}

    addTodo() {
        var newTodo: ToDo = {
            id: this.state.todos.length + 1,
            title: this.action.title,
            isCompleted: false
        }
        return tassign(this.state, {
            //instead of push we use concat
            //push mutates the old object, concat returns a new array
            todos: this.state.todos.concat(newTodo),
            lastUpdate: new Date()
        });
    }
    toggleTodo() {
        var todo = this.state.todos.find(t => t.id === this.action.id);
        var index = this.state.todos.indexOf(todo);
        return tassign(this.state, {
            todos: [
                //... = spread operator
                //all items before toggle
                ...this.state.todos.slice(0, index),
                //toggled items
                tassign(todo, { isCompleted: !todo.isCompleted }),
                //items after toggle
                ...this.state.todos.slice(index + 1)
            ],
            lastUpdate: new Date()
        });
    }
    removeTodo() {
        return tassign(this.state, {
            todos: this.state.todos.filter(t => t.id !== this.action.id),
            lastUpdate: new Date()
        });
    }
    clearTodos() {
        return tassign(this.state, {
            todos: [],
            lastUpdate: new Date()
        });
    }
}

export function rootReducer(state: IAppState, action): IAppState {
    var actions = new TodoActions(state, action);
    switch (action.type) {
        case ADD_TODO:
            return actions.addTodo();
        case TOGGLE_TODO:
            return actions.toggleTodo();
        case REMOVE_TODO:
            return  actions.removeTodo();
        case CLEAR_TODOS:
            return  actions.clearTodos();          
    }
    return state;

}