import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesalesorderComponent } from './createsalesorder.component';

describe('CreatesalesorderComponent', () => {
  let component: CreatesalesorderComponent;
  let fixture: ComponentFixture<CreatesalesorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatesalesorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatesalesorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
