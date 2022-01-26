import { TestBed } from '@angular/core/testing';
import { TechnicianService } from './technician.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TechnicianModel } from '../../models/technician';


describe('TechnicianService', () => {
  let service: TechnicianService;
  let httpTestingController: HttpTestingController; //Allows us to make the request to external APIs
  beforeEach(() => {
    //Allows us to configure an artificial NGModule that let us take advantage of the dependency injection in an "Angular way"
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
      providers: [
        TechnicianService
      ]
    });
    //Dependency Injection using the TestBed
    service = TestBed.inject(TechnicianService);
    httpTestingController = TestBed.inject(HttpTestingController); 
  });

  it('should return the list of technicians', () => {
    
    service.getAll();
    

    const req = httpTestingController.expectOne('http://localhost:3000/technicians');

    expect(req.request.method).toBe('GET', 'The HTTP method for this request should be a POST');
    
  
  });
});
