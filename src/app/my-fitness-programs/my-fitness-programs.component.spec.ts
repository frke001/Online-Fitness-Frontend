import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFitnessProgramsComponent } from './my-fitness-programs.component';

describe('MyFitnessProgramsComponent', () => {
  let component: MyFitnessProgramsComponent;
  let fixture: ComponentFixture<MyFitnessProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFitnessProgramsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFitnessProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
