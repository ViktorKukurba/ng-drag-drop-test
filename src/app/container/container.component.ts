import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor() { }

  @Input()
  data: any;

  @ViewChild('list')
  list: CdkDropList;

  containerId;
  childId;

  ngOnInit() {
  }

  onMouseOver() {
    if (this.containerId !== 'list-s') {
      this.containerId = 'list-t';
    }
  }

  onMouseLeave() {
    if (this.containerId !== 'list-s') {
      this.containerId = 'list-' + Math.random();
    }
  }

  onMouseOverChild() {
    if (this.childId !== 'list-s') {
      this.childId = 'list-t';
    }
  }

  onMouseLeaveChild() {
    if (this.childId !== 'list-s') {
      this.childId = 'list-' + Math.random();
    }
  }

  startDrag() {
    this.containerId = 'list-s';
    console.log('startDrag', this.list);
  }

  startDragChild() {
    this.childId = 'list-s';
    console.log('startDrag', this.list);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
