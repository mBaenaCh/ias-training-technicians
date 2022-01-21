import { Component, OnInit } from '@angular/core';
import { TechnicianModel } from 'src/app/shared/models/technician';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

  techniciansArr: TechnicianModel[];
  technicianToEdit: TechnicianModel;

  // here, you can use for inject dependecys.
  // sintax = constructor(private readonly nameDependency: NameDependency)
  constructor(private technicianService: TechnicianService) {
    this.techniciansArr = [];
  }

  async ngOnInit() {
    this.techniciansArr = await this.technicianService.getAll();
  }

  async onReceiveTechnician($event) {

     /* Must know if the technician already exists */
    const foundTechnician = await this.technicianService.getById($event.technicianId);

    if (foundTechnician) { //The technician was already created so we just update it (Based on an inmutable technicianId, which is the case)
      await this.technicianService.updateById($event.technicianId, $event);
      this.techniciansArr = await this.technicianService.getAll();
    } else { //The technician was a new one so we create an instance of it in the API
      await this.technicianService.createTechnician($event);
      this.techniciansArr = await this.technicianService.getAll();
    }

  }

  async onReceiveSelectedTechnicianDelete($event) {
    await this.technicianService.deleteById($event.technicianId);
    this.techniciansArr = await this.technicianService.getAll();
  }

  onReceiveSelectedTechnicianEdit($event) {
    this.technicianToEdit = $event;
  }
}
