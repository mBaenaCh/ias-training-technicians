import { Component, OnInit } from '@angular/core';
import { TechnicianModel } from 'src/app/shared/models/technician';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

  techniciansArr: TechnicianModel[];

  // here, you can use for inject dependecys.
  // sintax = constructor(private readonly nameDependency: NameDependency)
  constructor() { 
    this.techniciansArr = [];
  }

  ngOnInit(): void {
  }

  onReceiveTechnician($event): void{
    this.techniciansArr.push($event);
    console.log(this.techniciansArr);
  }

}
