import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRequestDetailsComponent } from './registration-request-details.component';

describe('RegistrationRequestDetailsComponent', () => {
  let component: RegistrationRequestDetailsComponent;
  let fixture: ComponentFixture<RegistrationRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationRequestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
