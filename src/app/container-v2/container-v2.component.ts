import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CdkDropList, DragRef, moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-container-v2',
  templateUrl: './container-v2.component.html',
  styleUrls: ['./container-v2.component.scss']
})
export class ContainerV2Component implements OnInit {

  constructor() { }

  @Input()
  data: any;

  @Output()
  listCreated = new EventEmitter<CdkDropList>();

  @ViewChild('container')
  container: CdkDropList;

  @ViewChild('handler')
  handler: ElementRef;

  @ViewChildren('items')
  items: QueryList<ElementRef>;

  connectedListsTo: CdkDropList[] = [];

  drags: DragRef[] = [];

  @ViewChildren('dropLists')
  dropLists: QueryList<ContainerV2Component>;

  onChildListCreated(childList: CdkDropList) {
    this.connectedListsTo.push(childList);

    this.connectedListsTo.forEach(dL => {
      dL.connectedTo = this.connectedListsTo;
    });

    this.listCreated.emit(childList);
  }

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
    this.dropLists.forEach(dropList => {
      dropList.connectDropLists(this.dropLists.map(d => d.container));
    });
    this.connectDropLists(this.dropLists.map(d => d.container));
    this.listCreated.emit(this.container);
  }

  connectDropLists(dropLists: CdkDropList[]) {
    this.connectedListsTo = [...this.connectedListsTo, ...dropLists, this.container];
    this.container.connectedTo = this.connectedListsTo;
  }
}
