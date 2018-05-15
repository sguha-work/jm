import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasswordmodalComponent } from './forgetpasswordmodal.component';

describe('ForgetpasswordmodalComponent', () => {
  let component: ForgetpasswordmodalComponent;
  let fixture: ComponentFixture<ForgetpasswordmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetpasswordmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpasswordmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
