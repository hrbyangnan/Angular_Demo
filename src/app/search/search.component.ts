import {Component, OnInit} from '@angular/core';
import {StorageService} from '../services/storage.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public keyword: string;
  public todoList: any[] = [];
  public doneList: any[] = [];

  constructor(public storage: StorageService) {

  }

  ngOnInit() {
    if (this.storage.get('todoList')) {
      this.todoList = this.storage.get('todoList');
    }

    if (this.storage.get('doneList')) {
      this.doneList = this.storage.get('doneList');
    }

  }

  add() {
    if (this.todoList.indexOf(this.keyword) <= -1) {
      this.todoList.push(this.keyword);
      this.storage.set('todoList', this.todoList);
      this.keyword = '';
    } else {
      alert('已存在');
    }
  }


  delete(key) {
    this.todoList.splice(key, 1);
    this.storage.set('todoList', this.todoList);
  }

  deleteFromDone(key) {
    this.doneList.splice(key, 1);
    this.storage.set('doneList', this.doneList);
  }

  toTodoList(key) {
    this.todoList.push(this.doneList[key]);
    this.doneList.splice(key, 1);
    this.storage.set('todoList', this.todoList);
    this.storage.set('doneList', this.doneList);

  }

  toDoneList(key) {
    console.log(this.todoList[key]);
    this.doneList.push(this.todoList[key]);
    this.todoList.splice(key, 1);
    this.storage.set('todoList', this.todoList);
    this.storage.set('doneList', this.doneList);
  }

}
