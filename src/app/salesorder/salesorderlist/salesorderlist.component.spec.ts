import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesorderlistComponent } from './salesorderlist.component';

describe('SalesorderlistComponent', () => {
  let component: SalesorderlistComponent;
  let fixture: ComponentFixture<SalesorderlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesorderlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesorderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
