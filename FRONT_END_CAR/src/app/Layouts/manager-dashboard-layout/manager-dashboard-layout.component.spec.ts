import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashboardLayoutComponent } from './manager-dashboard-layout.component';

describe('ManagerDashboardLayoutComponent', () => {
  let component: ManagerDashboardLayoutComponent;
  let fixture: ComponentFixture<ManagerDashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerDashboardLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
