import { ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { PopularQuotesComponent } from './popular-quotes.component';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { LineOfBusiness } from '../LineOfBusiness';
import { RecentQuote } from '../RecentQuote';
import { of } from 'rxjs';
import { inputLoB } from '../mock_data/inputLineOfBusiness';
import { inputQuotes } from '../mock_data/inputQuote';

describe('PopularQuotesComponent', () => {
  // Declare component
  let popularComponent: PopularQuotesComponent;
  let fixture: ComponentFixture<PopularQuotesComponent>;
  // Declare services
  let lineOfBusinessService: LineOfBusinessService;
  let testingController: HttpTestingController;

  beforeEach(async () => {
    // Compile components with imports and services.
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

    // Inject service and HTTP testing controller for testing with mock data.
    lineOfBusinessService = TestBed.inject(LineOfBusinessService);
    testingController = TestBed.inject(HttpTestingController)
    
  });

  // Test for component creation.
  it('should create component', () => {
    expect(popularComponent).toBeTruthy();
  });

  // Test for checking quoteSortedArray is not empty after function call.
  it('should create an array that is not empty', fakeAsync(()=>{
        let mockQuote = Object.values(inputQuotes);
        let mockLoB = Object.values(inputLoB);

        let spyQ = spyOn(lineOfBusinessService, 'getRecentQuotes').and.returnValue(of(mockQuote))
        let spyL = spyOn(lineOfBusinessService, 'getLinesOfBusiness').and.returnValue(of(mockLoB))

        popularComponent.ngOnInit();
        tick();
        expect(popularComponent.quoteSortedArray).toBeDefined();
        expect(popularComponent.quoteSortedArray.length).toBeGreaterThan(0);
  }));

  // Test for getSortedLinesOfBusiness function getting called on init.
  it('should call the getSortedLinesOfBusiness function', ()=>{
    spyOn(popularComponent, "getSortedLinesOfBusiness");
    fixture.detectChanges();
    expect(popularComponent.getSortedLinesOfBusiness).toHaveBeenCalled();
    // component = new PopularQuotesComponent();
  })

  // Test to validate lineOfBusiness data received from API call.
  it('should get linesOfBusiness data from api call', ()=>{
    lineOfBusinessService.getLinesOfBusiness().subscribe((linesOfBusiness: any) => {
      expect(linesOfBusiness).toBeTruthy();
      expect(linesOfBusiness.length).toBeGreaterThan(0);
    })
    const mockDataReq = testingController.expectOne('api/linesOfBusiness');
    expect(mockDataReq.request.method).toEqual('GET');
    mockDataReq.flush(Object.values(inputLoB))
  })

  // Test to validate quote data received from API call.
  it('should get recentQuote data from api call', ()=>{
    lineOfBusinessService.getRecentQuotes().subscribe((recentQuote: any) => {
      expect(recentQuote).toBeTruthy();
      expect(recentQuote.length).toBeGreaterThan(0);
    })
    const mockDataReq = testingController.expectOne('api/recentQuotes');
    expect(mockDataReq.request.method).toEqual('GET');
    mockDataReq.flush(Object.values(inputQuotes))
  })

  // Test to validate quote data received from subscribe function in popular-quotes equals one in API call.
  it('should get input quote data from lineOfBusinessService', ()=>{
    const quoteResponse: RecentQuote[] = [];
    spyOn(lineOfBusinessService, 'getRecentQuotes').and.returnValue(of(quoteResponse));
    fixture.detectChanges();
    expect(popularComponent.recentQuotes).toEqual(quoteResponse);
  })

  // Test to validate lineOfBusiness data received from subscribe function in popular-quotes equals one in API call.
  it('should get input quote data from lineOfBusinessService', ()=>{
    const LoBResponse: LineOfBusiness[] = [];
    spyOn(lineOfBusinessService, 'getLinesOfBusiness').and.returnValue(of(LoBResponse));
    fixture.detectChanges();
    expect(popularComponent.linesOfBusiness).toEqual(LoBResponse);
  })

});
