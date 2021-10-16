import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PASComponent } from './pas.component';

describe('PASComponent', () => {
  let component: PASComponent;
  let fixture: ComponentFixture<PASComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PASComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PASComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
