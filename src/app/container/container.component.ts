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

  @Input()
  ids: any[];

  ngOnInit() {
    if (!this.ids) {
      this.sendIds = this.getIds(this.data) as Array<any>;
      this.sendIds.shift();
      console.log('this.sendIds', this.sendIds);
    } else {
      this.sendIds = this.ids;
    }
  }

  getIds(data) {
    const arrStr = data.items.map((item) => this.getIds(item)).join(',');
    return [data._id, ...arrStr.split(',').filter(i => i)];
  }

  sendIds: any[];

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
