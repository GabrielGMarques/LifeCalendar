import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekTooltipComponent } from './week-tooltip.component';

describe('WeekTooltipComponent', () => {
  let component: WeekTooltipComponent;
  let fixture: ComponentFixture<WeekTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
