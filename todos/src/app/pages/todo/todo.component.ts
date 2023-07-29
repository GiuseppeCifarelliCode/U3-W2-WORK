import { Component, ViewChild } from '@angular/core';
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
    emptyTodo:boolean = false
    fetchCompleted:boolean = false
    editButton: string = "+"

    constructor(private todoSvc:TodosService){}

    ngOnInit():void{
      this.todoSvc.get()
      .then(todo => {
        this.todos = todo
        this.fetchCompleted = !this.fetchCompleted
        if(this.todos.length === 0) {this.emptyTodo = true}
        todo.forEach((el,i) => this.check[i] = el.completed)
      })
    }

    createTask(todo?:Todo, i?:number):void{
      if(this.editButton != 'Modify') {
        this.todoSvc.create(this.newTodo)
        this.todos.push(this.newTodo)
        this.newTodo = new Todoclass('', false)
        this.emptyTodo = false
      } else {
        todo = this.newTodo
        i = this.todos.findIndex(el => el === todo)
        this.editTask(todo, i)
        this.editButton = "+"
      }
    }

    editTask(todo:Todo, i:number):void{
      this.editButton = "Modify"
      this.newTodo = todo
      this.todos[i].title = todo.title
      this.todoSvc.edit(todo)
    }

    checkTask(todo:Todo,i:number):void{
      this.check[i] = todo.completed
      todo.completed = todo.completed === true ? false : true
      this.todoSvc.edit(todo)
    }
}
