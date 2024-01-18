import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubscribeComponent } from './category-subscribe.component';

describe('CategorySubscribeComponent', () => {
  let component: CategorySubscribeComponent;
  let fixture: ComponentFixture<CategorySubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySubscribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
