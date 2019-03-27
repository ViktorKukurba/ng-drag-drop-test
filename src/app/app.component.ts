import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data = {
    title: 'Root container',
    items: [{
      title: 'Second layer container - 1',
      items: [{
        title: 'Third layer - 1.1',
        items: []
      }, {
        title: 'Third layer - 1.2',
        items: []
      }, {
        title: 'Third layer - 1.3',
        items: []
      }]}, {
        title: 'Second layer container - 2',
        items: [{
          title: 'Third layer - 2.1',
          items: []
        }, {
          title: 'Third layer - 2.2',
          items: []
        }
      ]}]
  };

  dataIds = this.dataWithIds(this.data);

  dataWithIds(data) {
    data._id = `id-${Math.random()}`;
    data.items.forEach((item) => this.dataWithIds(item));
    return data;
  }
}
