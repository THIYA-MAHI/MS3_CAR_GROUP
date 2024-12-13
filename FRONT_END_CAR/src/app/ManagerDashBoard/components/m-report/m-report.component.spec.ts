import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MReportComponent } from './m-report.component';

describe('MReportComponent', () => {
  let component: MReportComponent;
  let fixture: ComponentFixture<MReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
