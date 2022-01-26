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

  ngOnInit() {
    this.technicianService.getAll().subscribe((data) => {
      this.techniciansArr = data;
    });
  }

  onReceiveTechnician($event) {

    /* Must know if the technician already exists 
       Ive prefered this approach in order to avoid an extra request (the "get by id")*/
    const foundTechnician = this.techniciansArr.find(item => item.technicianId === $event.technicianId);

    if (foundTechnician != undefined) { //The technician was already created so we just update it (Based on an inmutable technicianId, which is the case)

      this.technicianService.updateById($event.technicianId, $event).subscribe((data)=>{
        this.technicianService.getAll().subscribe((data) => {
          this.techniciansArr = data;
        });  
      });  
    } else { //The technician was a new one so we create an instance of it in the API
      this.technicianService.create($event).subscribe((data)=>{
        this.technicianService.getAll().subscribe((data) => {
          this.techniciansArr = data;
        });
      });
    } 
  }

  onReceiveSelectedTechnicianDelete($event) {
    this.technicianService.deleteById($event.technicianId).subscribe((data)=> {
      this.technicianService.getAll().subscribe((data) => {
        this.techniciansArr = data;
      });
    }); 
  }

  onReceiveSelectedTechnicianEdit($event) {
    this.technicianToEdit = $event;
  }
}
