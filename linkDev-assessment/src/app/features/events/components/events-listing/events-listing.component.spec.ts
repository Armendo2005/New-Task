import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListingComponent } from './events-listing.component';

describe('EventsListingComponent', () => {
  let component: EventsListingComponent;
  let fixture: ComponentFixture<EventsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
