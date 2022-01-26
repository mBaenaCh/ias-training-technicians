import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';

import { TechnicianComponent } from './technician.component';

describe('TechnicianComponent', () => {
  let component: TechnicianComponent;
  let fixture: ComponentFixture<TechnicianComponent>;
  let technicianServiceSpy: TechnicianService;
    
  beforeEach(async () => {
    technicianServiceSpy = jasmine.createSpyObj<TechnicianService>(
      'TechnicianService', 
      ['getAll', 'getById', 'create', 'updateById', 'deleteById']
    );

    await TestBed.configureTestingModule({
      declarations: [ TechnicianComponent ],
      providers: [{
        provide: TechnicianService, useValue: technicianServiceSpy
      }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
