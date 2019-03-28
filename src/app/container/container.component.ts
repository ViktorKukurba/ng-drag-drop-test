import { Component, OnInit, Input, ViewChild, ViewChildren,
  QueryList, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { moveItemInArray, transferArrayItem, DragDrop, DropListRef, DragRef } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {

  constructor(private dragDrop: DragDrop) { }

  @Input()
  data: any;

  @Output()
  listCreated = new EventEmitter<DropListRef>();

  @ViewChild('container')
  container: ElementRef;

  @ViewChild('handler')
  handler: ElementRef;

  @ViewChildren('items')
  items: QueryList<ElementRef>;

  containerList: DropListRef;

  connectedTo: DropListRef[] = [];

  drags: DragRef[] = [];

  @ViewChildren('dropLists')
  dropLists: QueryList<ContainerComponent>;

  ngOnInit() {

  }

  connectDropLists(dropLists: DropListRef[]) {
    this.connectedTo = [...this.connectedTo, ...dropLists];
    this.containerList.connectedTo(this.connectedTo);
  }

  onChildListCreated(childList: DropListRef) {
    this.connectedTo.push(childList);
    // this.listCreated.emit(childList);
    if (this.containerList) {
      // this.containerList.connectedTo(this.connectedTo);
      this.connectedTo.forEach(dL => {
        dL.connectedTo(this.connectedTo.filter(c => c !== dL));
      });
    }

    // console.log('onChildListCreated', this.connectedTo);



    // this.generateDrags();

    // childList.connectedTo([this.containerList]);
  }

  generateDrags() {
    if (this.items) {
      this.drags.forEach(d => d.dispose());
      console.log('generateDrags', this.data.items.map(i => i.title).join(','));
      this.drags = [];
      this.items.forEach(dropItem => {
        const drag = this.dragDrop.createDrag(dropItem);
        drag.withHandles([dropItem.nativeElement.querySelector('svg')]);
        this.drags.push(drag);
      });
      console.log('this.containerList', this.containerList['_itemPositions']);
      this.containerList.withItems(this.drags);


      this.dropLists.forEach(dropList => {
        dropList.connectDropLists(this.dropLists.filter(d => d !== dropList).map(d => d.containerList));
      });
      // this.drags = [];
      // this.containerList.connectedTo(this.connectedTo);
      this.listCreated.emit(this.containerList);
    }
  }

  ngAfterViewInit() {
    // this.container.nativeElement.id = 'list-' + Math.random();
    this.containerList = this.dragDrop.createDropList(this.container);
    console.log('created', this.container);
    // this.containerList.data = this.data.items;
    this.containerList.dropped.subscribe(({currentIndex, previousIndex, container, previousContainer, item}) => {
      console.log('this.containerList.dropped', currentIndex, this.containerList);
      if (currentIndex < 0) return;
      if (previousContainer === container) {
        moveItemInArray(container.data, previousIndex, currentIndex);
      } else {
        console.log('before', previousIndex, currentIndex, this.containerList.data.map(i => i.title).join(','));
        transferArrayItem(previousContainer.data,
                          container.data,
                          previousIndex,
                          currentIndex);
        console.log('before-2', this.containerList.data.map(i => i.title).join(','));
        setTimeout(() => this.generateDrags());
                          // console.log('item.getRootElement()', item.getRootElement());
                          // this.dragDrop.createDrag(item.getRootElement());
      }
    });

    this.generateDrags();
  }
}
