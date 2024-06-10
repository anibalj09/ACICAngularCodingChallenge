import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { PopularQuotesComponent } from './popular-quotes.component';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { LineOfBusiness } from '../LineOfBusiness';
import { RecentQuote } from '../RecentQuote';
import { of } from 'rxjs';
import { inputLoB } from '../mock_data/inputLineOfBusiness';
import { inputQuotes } from '../mock_data/inputQuote';
//import { LineOfBusiness } from '../LineOfBusiness';

describe('PopularQuotesComponent', () => {
  let popularComponent: PopularQuotesComponent;
  let fixture: ComponentFixture<PopularQuotesComponent>;
  let lineOfBusinessService: LineOfBusinessService;
  let testingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PopularQuotesComponent ],
      providers: [ LineOfBusinessService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PopularQuotesComponent);
    popularComponent = fixture.componentInstance;
    // TODO: add lineOfbusiness declaration to inject in constructor.

    lineOfBusinessService = TestBed.inject(LineOfBusinessService);
    testingController = TestBed.inject(HttpTestingController)
    
  });

  it('should create', () => {
    expect(popularComponent).toBeTruthy();
  });

  it('should create an array that is not empty', ()=>{
    fixture.detectChanges();
    expect(popularComponent.quoteSortedArray).toBeTruthy();
  })
  it('should call the getSortedLinesOfBusiness function', ()=>{
    spyOn(popularComponent, "getSortedLinesOfBusiness");
    fixture.detectChanges();
    expect(popularComponent.getSortedLinesOfBusiness).toHaveBeenCalled();
    // component = new PopularQuotesComponent();
  })

  it('should get input quote data from lineOfBusinessService', ()=>{

    const quoteResponse: RecentQuote[] = [];

    spyOn(lineOfBusinessService, 'getRecentQuotes').and.returnValue(of(quoteResponse));
    fixture.detectChanges();

    expect(popularComponent.recentQuotes).toEqual(quoteResponse);
  })

  it('should get input quote data from lineOfBusinessService', ()=>{

    const LoBResponse: LineOfBusiness[] = [];

    spyOn(lineOfBusinessService, 'getLinesOfBusiness').and.returnValue(of(LoBResponse));
    fixture.detectChanges();

    expect(popularComponent.linesOfBusiness).toEqual(LoBResponse);
  })

  it('should get linesOfBusiness data from api call', ()=>{
    lineOfBusinessService.getLinesOfBusiness().subscribe((linesOfBusiness: any) => {
      expect(linesOfBusiness).toBeTruthy();
    })
    const mockDataReq = testingController.expectOne('api/linesOfBusiness');
    expect(mockDataReq.request.method).toEqual('GET');
    mockDataReq.flush(Object.values(inputLoB))
  })

  it('should get recentQuote data from api call', ()=>{
    lineOfBusinessService.getRecentQuotes().subscribe((recentQuote: any) => {
      expect(recentQuote).toBeTruthy();
    })
    const mockDataReq = testingController.expectOne('api/recentQuotes');
    expect(mockDataReq.request.method).toEqual('GET');
    mockDataReq.flush(Object.values(inputQuotes))
  })

});
