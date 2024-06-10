import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { PopularQuotesComponent } from './popular-quotes.component';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { LineOfBusiness } from '../LineOfBusiness';

describe('PopularQuotesComponent', () => {
  let component: PopularQuotesComponent;
  let fixture: ComponentFixture<PopularQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PopularQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularQuotesComponent);
    component = fixture.componentInstance;
    // TODO: add lineOfbusiness declaration to inject in constructor.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an array for printing', ()=>{
    expect(component.quoteSortedArray).toBeTruthy();
  })
  it('should call the getSortedLinesOfBusiness function', ()=>{
    spyOn(component, "getSortedLinesOfBusiness");
    expect(component.getSortedLinesOfBusiness).toHaveBeenCalled();
    component = new PopularQuotesComponent();
  })
});
