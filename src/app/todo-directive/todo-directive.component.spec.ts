import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDirectiveComponent } from './todo-directive.component';

describe('TodoDirectiveComponent', () => {
  let component: TodoDirectiveComponent;
  let fixture: ComponentFixture<TodoDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
