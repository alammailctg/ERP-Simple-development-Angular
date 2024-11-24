import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllProductionOrderComponent } from './get-all-production-order.component';

describe('GetAllProductionOrderComponent', () => {
  let component: GetAllProductionOrderComponent;
  let fixture: ComponentFixture<GetAllProductionOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllProductionOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllProductionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
