import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularQuotesComponent } from './popular-quotes.component';

describe('PopularQuotesComponent', () => {
  let component: PopularQuotesComponent;
  let fixture: ComponentFixture<PopularQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
