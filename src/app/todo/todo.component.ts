import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDrop } from '@angular/cdk/drag-drop';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private dragDrop: DragDrop) { }

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

  @ViewChild('containerA')
  containerA: ElementRef;

  @ViewChild('containerB')
  containerB: ElementRef;

  @ViewChildren('itemsA')
  itemsA: QueryList<ContainerComponent>;

  @ViewChildren('itemsB')
  itemsB: QueryList<ContainerComponent>;

  ngOnInit() {
  }

  initDropList(containerRef, dragsRef, items, key) {
    const containerList = this.dragDrop.createDropList(containerRef);
    containerList.dropped.subscribe(({currentIndex, previousIndex, container, previousContainer}) => {
      console.log(`previousIndex: ${previousIndex}; currentIndex:${currentIndex}`);
      if (previousContainer === container) {
        moveItemInArray(this[key], previousIndex, currentIndex);
      } else {
        transferArrayItem(previousContainer.data,
                          container.data,
                          previousIndex,
                          currentIndex);
      }
    });

    const drags = [];
    dragsRef.forEach(dropItem => {
      const drag = this.dragDrop.createDrag(dropItem);
      drag.withHandles([dropItem.nativeElement.querySelector('svg')]);
      drags.push(drag);
    });
    containerList.withItems(drags);
  }

  ngAfterViewInit() {
    this.initDropList(this.containerA, this.itemsA, this.todo, 'todo');
    this.initDropList(this.containerB, this.itemsB, this.done, 'done');
  }

}
