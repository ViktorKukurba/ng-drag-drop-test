import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDirectiveComponent } from './todo-directive/todo-directive.component';
import { ContainerV2Component } from './container-v2/container-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    TodoComponent,
    TodoDirectiveComponent,
    ContainerV2Component
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
