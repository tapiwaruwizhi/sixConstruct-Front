import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-get-departments',
  templateUrl: './get-departments.component.html',
  styleUrls: ['./get-departments.component.css']
})
export class GetDepartmentsComponent implements OnInit {

  private products  = [];

  constructor(private dataservice: DataService) { }


  ngOnInit() {
    this.getDepartments()
  }


  getDepartments() {
    // this.showLoading()
    this.dataservice.getAllDepartments()
      .then(data => {
       console.log(data);
        //this.loading.dismissAll();
      }, (err) => {
        // this.loading.dismissAll();
    console.log(err)
      });
  }

  

}
