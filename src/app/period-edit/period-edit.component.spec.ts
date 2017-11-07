import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodEditComponent } from './period-edit.component';

describe('PeriodEditComponent', () => {
  let component: PeriodEditComponent;
  let fixture: ComponentFixture<PeriodEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
