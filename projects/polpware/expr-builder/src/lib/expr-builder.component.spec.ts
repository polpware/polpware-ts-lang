import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprBuilderComponent } from './expr-builder.component';

describe('ExprBuilderComponent', () => {
  let component: ExprBuilderComponent;
  let fixture: ComponentFixture<ExprBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
