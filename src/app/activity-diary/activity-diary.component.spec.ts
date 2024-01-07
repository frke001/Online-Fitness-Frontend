import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDiaryComponent } from './activity-diary.component';

describe('ActivityDiaryComponent', () => {
  let component: ActivityDiaryComponent;
  let fixture: ComponentFixture<ActivityDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
