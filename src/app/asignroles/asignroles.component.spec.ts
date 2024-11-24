import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignrolesComponent } from './asignroles.component';

describe('AsignrolesComponent', () => {
  let component: AsignrolesComponent;
  let fixture: ComponentFixture<AsignrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignrolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
