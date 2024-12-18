import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelComponent } from './car-model.component';

describe('CarModelComponent', () => {
  let component: CarModelComponent;
  let fixture: ComponentFixture<CarModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
