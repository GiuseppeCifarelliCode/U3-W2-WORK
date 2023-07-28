import { Component } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { Todoclass } from 'src/app/models/todoclass';
import { TodosService } from 'src/app/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

    newTodo:Todo = new Todoclass('', false)
    todos:Todo[] = []
    check:boolean[] = []
    constructor(private todoSvc:TodosService){}

    ngOnInit(){
      this.todoSvc.get()
      .then(todo => {
        this.todos = todo
        todo.forEach((el,i) => this.check[i] = el.completed)
      })
    }

    createTask(){
      this.todoSvc.create(this.newTodo)
      this.todos.push(this.newTodo)
      this.newTodo = new Todoclass('', false)
    }

    editTask(todo:Todo){
      this.newTodo = todo
    }

    checkTask(todo:Todo,i:number){
      this.check[i] = todo.completed
      todo.completed = todo.completed === true ? false : true
      this.todoSvc.edit(todo)
      .then( ()=> {
      })
    }
}
