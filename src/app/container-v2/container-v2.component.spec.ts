import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerV2Component } from './container-v2.component';

describe('ContainerV2Component', () => {
  let component: ContainerV2Component;
  let fixture: ComponentFixture<ContainerV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
