import { Component } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodosService } from 'src/app/todos.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent {

  todos:Todo[] = []
  emptyTodo:boolean = false
  fetchCompleted:boolean = false
  private filterURL:string = "http://localhost:3000/todos?completed=true"

  constructor(private todoSvc:TodosService){}

  ngOnInit():void{
    this.todoSvc.get(this.filterURL)
    .then(todo => {
      this.todos = todo
      this.fetchCompleted = !this.fetchCompleted
        if(this.todos.length === 0) {this.emptyTodo = true}
    })

  }

  delete(todo:Todo):void{
    this.todoSvc.delete(todo)
    this.todos = this.todos.filter(el => todo.title != el.title)
    if(this.todos.length === 0) this.emptyTodo = true

  }
}
