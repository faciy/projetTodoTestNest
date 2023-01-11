import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor (private readonly todosServices : TodosService){}

    @Get(":id")
    findOne(@Param('id') id: string ) {
        return this.todosServices.findOne(id)
        
    }

    @Get()
    findAll() : Todo[]{
        return this.todosServices.findAll();
    }

    @Post()
    createTodo(@Body() newTodo : CreateTodoDto) {
        return this.todosServices.createTodo(newTodo)
    }

    @Patch(":id")
    updateTodo(@Param("id") id: string, @Body() todo: CreateTodoDto ){
        return this.todosServices.update(id,todo)
    }

    @Delete(":id")
    deleteTodo(@Param("id") id : string ) {
        return this.todosServices.delete(id)
    }
}
