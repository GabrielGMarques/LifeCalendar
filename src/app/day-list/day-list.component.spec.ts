import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayListComponent } from './day-list.component';

describe('DayListComponent', () => {
  let component: DayListComponent;
  let fixture: ComponentFixture<DayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
