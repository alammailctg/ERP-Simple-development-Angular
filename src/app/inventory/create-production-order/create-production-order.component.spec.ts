import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductionOrderComponent } from './create-production-order.component';

describe('CreateProductionOrderComponent', () => {
  let component: CreateProductionOrderComponent;
  let fixture: ComponentFixture<CreateProductionOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductionOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
