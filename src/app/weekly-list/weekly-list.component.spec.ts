import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyListComponent } from './weekly-list.component';

describe('WeeklyListComponent', () => {
  let component: WeeklyListComponent;
  let fixture: ComponentFixture<WeeklyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
