import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataService} from  '../data.service'
import { AlertService } from '../_alert';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder,  Validators  } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  department:any;
  departments:any;

  departmentdataId:any;
  departmentdataDes:any;
  depdta;
  responseDataDepartment:any;

  employee:any;
  employeeNumber:any;
  Name :any;
  DepartmentId :any;
  DateOfBirth :any;
  responseData:any;
  employeeresponse:any;
  Age:any;

  form;
  form1;

  constructor(
    private dataservice:DataService,
    private route:ActivatedRoute,
    private alertService:AlertService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    ) {
    
      this.form = fb.group({
        depId: ['',Validators.required],
        DepDes: ['', Validators.required],
   
      });
      this.form1 =fb.group({
        employeeNum: ['',Validators.required],
        empName: ['', Validators.required],
        empdob: ['', Validators.required],
        empDep: ['', Validators.required],
        age:[''],
   
      });
     }

     submit() {
      if (this.form.valid) {
     this.updateDepartment();
      }
      else{
        alert("FILL ALL FIELDS")
      }
    }
    submit1(){
      if (this.form1.valid) {
        this.upDateEmployee();
         }
         else{
           alert("FILL ALL FIELDS")
         }
    }

  ngOnInit() {
    
    this.getDepartments();
    this.route.paramMap.subscribe(params => {
      console.log(params.get('data')) 
      this.depdta =params.get('data')
      });
      let data = this.depdta
      console.log(data)
    
      this.dataservice.getDepartmentById(data).then(c =>{
        console.log(c);
        this.department = c;
        this.departmentdataId= this.department.Id;
        this.departmentdataDes = this.department.Description;
    })  

    this.dataservice.getEmployeeById(data).then(c =>{
     
      this.employee = c;
      this.employeeNumber = this.employee.employeedetails.EmployeeNumber;
      this.Name = this.employee.employeedetails.Name;
      this.DepartmentId = this.employee.employeedetails.DepartmentId;
      this.DateOfBirth = this.employee.employeedetails.DateOfBirth;
      this.Age = this.employee.age;
      console.log(this.Age)
      console.log(this.Name)
    })


    
  }

  //////////get department//////////////
  getDepartments() {
   this.spinner.show()
    this.dataservice.getAllDepartments()
      .then(data => {
        this.departments = data;
 
      }, (err) => {
   
      });
  }
// update Departments
  updateDepartment(){
    this.spinner.show()
    let userData = {
      "Id": this.departmentdataId,
      "Description": this.departmentdataDes,
    };
    this.dataservice.editDepartment(userData).then((result) => {
     this.responseDataDepartment = result;
     if(this.responseDataDepartment == 0){
     this.spinner.hide()
     
     this.alertService.warn("Could Not Update Department")
 }
     else{
      this.spinner.hide()
      this.alertService.success("Successfully Updated")
      
    }
   }, (err) => {
    this.spinner.hide() 
     this.alertService.error("An Error Ocurred")
     
  });
   }
///Update Employees
  upDateEmployee(){
this.spinner.show();
    let userData = {
      "EmployeeNumber": this.employeeNumber,
      "Name": this.Name,
      "DateOfBirth":this.DateOfBirth,
      "DepartmentId":this.DepartmentId,
    };
    this.dataservice.editEmployee(userData).then((result) => {
     this.responseData = result;
     if(this.responseData == 0){
  this.spinner.hide();
  this.alertService.warn("Could Not Update Employee")
     }
     else{
      this.spinner.hide();
      this.ngOnInit();
      this.alertService.success("Successfully Updated")
    }
   }, (err) => {
    this.alertService.error("An Error Ocurred")
 
  });
  }


}
