import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
    todos : Todo[] = [
        {
            id:1,
            title:'todos app',
            description:'create todos',
            done: false
        },
        {
            id:2,
            title:'articles app',
            description:'create articles',
            done: true
        }
    ]

    findOne(id : string) {
        return this.todos.find(todo => todo.id === Number(id))
    }

    findAll() : Todo[] {
        return this.todos;
    }

    createTodo(todo: CreateTodoDto) {
        return this.todos = [...this.todos, todo]
    }

    update(id: string, todo: CreateTodoDto) {
        const todoToUpdate =  this.todos.find(todo => todo.id === Number(id))
        if(!todoToUpdate) {
            return new NotFoundException("Id recherche est introuvable")
        }
        if(todo.hasOwnProperty("done")){
            todoToUpdate.done = todo.done;
        }
        if(todo.title){
            todoToUpdate.title = todo.title
        }
        if(todo.description){
            todoToUpdate.description = todo.description
        }

        // mettre a jour le tableau todos
        const updateTodos = this.todos.map(t => t.id != Number(id) ? t : todoToUpdate )
        console.log("test",updateTodos);
        
        return this.todos = [...updateTodos]
    }

    delete(id : string) {
        const nombreTodo = this.todos.length;
        this.todos = [...this.todos.filter(t => t.id !== Number(id))]
        if(this.todos.length < nombreTodo){
            return {deletedTodo:1, nbTodos : this.todos.length , todos:this.todos }
        }else{
            return {deletedTodo:1, nbTodos : this.todos.length  }
        }
    }
}
