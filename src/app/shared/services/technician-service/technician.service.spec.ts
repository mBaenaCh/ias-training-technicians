import { TestBed } from '@angular/core/testing';
import { TechnicianService } from './technician.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TechnicianModel } from '../../models/technician';


describe('TechnicianService', () => {
  let technicianService: TechnicianService;
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
    technicianService = TestBed.inject(TechnicianService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return the list of technicians', () => {
    const expectedTechnicians: TechnicianModel[] = [
      {
        technicianId: 9,
        name: "asdqeqeditado",
        lastName: "adsadsqqqqqeditado"
      },
      {
        technicianId: 12,
        name: "el editado",
        lastName: "quedo editado"
      },
      {
        technicianId: 11,
        name: "dont use ",
        lastName: "promises again"
      }
    ];

    technicianService.getAll().subscribe((data) => {
      expect(data).toEqual(expectedTechnicians, 'Should return the expected technicians'), fail
    });

    const req = httpTestingController.expectOne(technicianService.baseUrl, 'Should have made one request to the endpoint');
    expect(req.request.method).toEqual('GET', 'The HTTP method should be a GET');

    req.flush(expectedTechnicians); //Test respond with the expected response body
  });

  it('should return the created technician', () => {
    const expectedTechnician: TechnicianModel = {
      technicianId: 10,
      name: "Mateo",
      lastName: "Baena"
    };

    technicianService.create(expectedTechnician).subscribe((data) => {
      expect(data).toEqual(expectedTechnician, 'Should return the technician created');
    });

    const req = httpTestingController.expectOne(technicianService.baseUrl, 'Should have made one request to the endpoint');
    expect(req.request.method).toEqual('POST', 'The HTTP Method should be POST');

    req.flush(expectedTechnician);
  });

  it('should return the technician found by its id', () => {
    const expectedTechnician: TechnicianModel = {
      technicianId: 11,
      name: "dont use",
      lastName: "promises again"
    }

    technicianService.getById(expectedTechnician.technicianId).subscribe((data) => {
      expect(data).toEqual(expectedTechnician, 'Should return the found technician');
    });

    const req = httpTestingController.expectOne(`${technicianService.baseUrl}/${expectedTechnician.technicianId}`, 'Should have made one request to the endpoint');
    expect(req.request.method).toEqual('GET', 'The HTTP Method should be GET');
    req.flush(expectedTechnician);
  });

  it('should return the edited technician', () => {
    const expectedTechnician: TechnicianModel = {
      technicianId: 11,
      name: "edited",
      lastName: "edited"
    };

    technicianService.updateById(expectedTechnician.technicianId, expectedTechnician).subscribe((data) => {
      expect(data).toEqual(expectedTechnician, 'Should return the edited technician');
    });

    const req = httpTestingController.expectOne(`${technicianService.baseUrl}/${expectedTechnician.technicianId}`, 'Should have made one request to the endpoint');
    expect(req.request.method).toEqual('PUT', 'The HTTP Method should be PUT');
    req.flush(expectedTechnician);
  });

  it('should return the deleted technician', () => {
    const expectedTechnician: TechnicianModel = {
      technicianId: 12,
      name: "el editado",
      lastName: "quedo editado"
    };

    technicianService.deleteById(expectedTechnician.technicianId).subscribe((data) => {
      expect(data).toEqual(expectedTechnician, 'Should return the deleted technician');
    });

    const req = httpTestingController.expectOne(`${technicianService.baseUrl}/${expectedTechnician.technicianId}`, 'Should have made one request to the endpoint');
    expect(req.request.method).toEqual('DELETE', 'The HTTP Method should be DELETE');
    req.flush(expectedTechnician);
  });
});
