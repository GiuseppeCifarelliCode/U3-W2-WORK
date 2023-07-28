import { Injectable } from '@angular/core';
import { Todo } from './models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private URL:string = "http://localhost:3000/todos"
  constructor() { }

  get(url:string = this.URL):Promise<Todo[]>{
    return fetch(url).then(res => res.json())
  }

  create(todo:Todo):Promise<Todo>{
    return fetch(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(todo)
    }).then(res => res.json())
  }

  edit(todo:Todo){
    return fetch(this.URL + '/' + todo.id, {
      method: 'PUT',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(res => res.json())
  }

  delete(todo:Todo){
    return fetch(this.URL+'/'+ todo.id,{
      method: 'DELETE'
    }).then(res => res.json());
  }
}
