import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianRowComponent } from './technician-row.component';

describe('TechnicianRowComponent', () => {
  let component: TechnicianRowComponent;
  let fixture: ComponentFixture<TechnicianRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
