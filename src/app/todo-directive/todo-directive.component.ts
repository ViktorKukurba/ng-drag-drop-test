import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-directive',
  templateUrl: './todo-directive.component.html',
  styleUrls: ['./todo-directive.component.scss']
})
export class TodoDirectiveComponent implements OnInit {

  constructor() { }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  @ViewChild('doneList')
  doneList: CdkDropList<any>;

  @ViewChild('todoList')
  todoList: CdkDropList<any>;


  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  ngAfterViewInit() {
    debugger;
    // this.doneList._dropListRef.connectedTo([this.todoList._dropListRef]);
    // this.todoList._dropListRef.connectedTo([this.doneList._dropListRef]);

    this.doneList.connectedTo = [this.todoList];
    this.todoList.connectedTo = [this.doneList];
  }

}
