import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramComponent } from './fitness-program.component';

describe('FitnessProgramComponent', () => {
  let component: FitnessProgramComponent;
  let fixture: ComponentFixture<FitnessProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FitnessProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
