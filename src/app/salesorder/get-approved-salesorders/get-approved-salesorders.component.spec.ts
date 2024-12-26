import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApprovedSalesordersComponent } from './get-approved-salesorders.component';

describe('GetApprovedSalesordersComponent', () => {
  let component: GetApprovedSalesordersComponent;
  let fixture: ComponentFixture<GetApprovedSalesordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetApprovedSalesordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetApprovedSalesordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
