import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {formatDate} from '@angular/common';
import { TodoServiceService } from "../app/service/todo-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "to-do-app";
  authorName: string = "";
  todoTitleText: string = "";
  itemTxt:any = [];
  todoList: any = [];
  currentDate:any = '';
  //configUrl = "assets/default-to-do-list.json";
  constructor(private http: HttpClient,private todoService: TodoServiceService) {
    this.currentDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    console.log("Constructor initialised");
    do {
      this.authorName = prompt("Enter username");
      console.log(this.authorName);
    } while (this.authorName == "");

    if (this.authorName != "") {
      this.getJsonData();
    }
  }

  getJsonData() {
    this.todoService.getData().subscribe((data: any) => {
      console.log("config data", data);
      this.todoList = data;
    });
  }

  createToDoList() {
    if (this.todoTitleText == "") {
        alert("Please enter a title");
    } else {
        this.createList();
    }
  }

  createList(){
    if(this.todoTitleText.length > 0){
      let itemList = {title: this.todoTitleText, todoItems: [], author: this.authorName, date: this.currentDate};
      this.todoList.push(itemList);
      this.todoTitleText = '';
      console.log("itemList",itemList);
    }else{
      alert("Please enter a title");
    }
  }

  deleteList(listId){
    if(listId < this.todoList.length){
      this.todoList.splice(listId, 1);
    }
  }

  addItem(listId){
    if(this.itemTxt[listId] && listId >= 0 && this.itemTxt[listId].length > 0){
      let temp = {'name':this.itemTxt[listId],'checked':0};
      this.todoList[listId].todoItems.push(temp);
      this.itemTxt[listId] = '';
    }else{
      alert("Please enter a item name");
    }
  }

  deleteItem(listid,itemId){
    if(listid >= 0 && itemId >= 0){
      this.todoList[listid].todoItems.splice(itemId, 1);
    }
  }

}
