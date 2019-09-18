import { Component, OnInit,Inject} from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, FormBuilder,  Validators  } from '@angular/forms';
import { Router } from "@angular/router";
import { AlertService } from '../_alert';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  startDate = new Date(1990, 0, 1);

  departments:any;        // All departmentS
  department:any;         // one department
  departmentId: any;   // department Id on dialog
  description: any;    // description on dialog
  responseDataDepartment :any ;

  departmentadata={
    "Id":"",
    "Description":"",
  };

    employees:any;
    employee:any;
    responseDataEmployee:any;
    employeedata ={
    "EmployeeNumber" :"",
    "Name":"", 
    "DepartmentId":"",
    "DateOfBirth ":"",
};

form;
form1;
departmentForm: FormGroup;
  constructor( 
    private dataservice:DataService,
    private router: Router,
    private alertService: AlertService,
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
 
    });
   }
  submit() {
    if (this.form.valid) {
   this.addDepartment();
    }
    else{
      alert(" check all fields")
    }
  }
  submit1(){
    if (this.form1.valid) {
      this.addEmployee();
       }
       else{
         alert("FILL ALL FIELDS")
       }
  }
  ngOnInit() {

    this.getEmployees()
    this.getDepartments();
  }
////////////////get all departments///////////
  getDepartments() {
    this.spinner.show();
    this.dataservice.getAllDepartments()
      .then(data => {
        this.departments = data;
          this.spinner.hide()
      }, (err) => {
    console.log(err)
    this.alertService.info("We Have encountered an Error Please Try Again")
    this.spinner.hide()
      });
  }

  ////////add a new department//////////
  addDepartment(){
    this.spinner.show();
    this.dataservice.createDepartment(this.departmentadata).then((result) => {
     this.responseDataDepartment = result;
     if(this.responseDataDepartment == 0){
     this.alertService.success("Error")
     this.getDepartments();
     }
     else{
      this.alertService.warn("You Have added A new Department")
      this.getDepartments();
    }
   }, (err) => {
    this.getDepartments();
    this.alertService.error("We have encountered an error please try againg")
  });
   }
  //////delete confirmation
  deleteDepartments(data) {
    if(confirm("Are you sure you want to delete "+ data.Description)) {
      this.delete(data);
    }
  }
/////delete department-----------/////////
delete(data){
  this.spinner.show();
  let departmentId={
    "id": data.Id,
  }
  this.dataservice.deleteDepartment(departmentId)
  .toPromise()
  .then(result => {
this.spinner.hide();
this.alertService.success("Delete Successful")

  }, (err) => {
    this.spinner.hide()
    this.alertService.success("Delete Successful")
    this.getDepartments();
});

}

////////////////////////////////////////////*********** */////
////////////////employee//////////////////////
getEmployees(){
  this.spinner.show();
  this.dataservice.getAllEmployees()
  .then(data => {
    this.employees = data;
   this.spinner.hide();
    
  }, (err) => {
    this.alertService.error('Error occured')
    this.spinner.hide();
console.log(err)
  });
  this.spinner.hide();
}
////////////add employee//////////
addEmployee(){
  this.spinner.show();
  this.dataservice.createEmployee(this.employeedata).then((result) => {
   this.responseDataEmployee = result;
   if(this.responseDataEmployee == 0){
 this.spinner.hide();

   }
   else{
 this.spinner.hide();
 this.alertService.warn("Successful")
 this.getEmployees

  }
 }, (err) => {
this.alertService.error("An error Occured")
});

}

//////////delete employee////////
deleteEmployee(data) {
  if(confirm("Are you sure you want to delete "+ data.Name)) {
    this.deleteEmp(data);
  }
}

/////delete department-----------/////////
deleteEmp(data){
  this.spinner.show();
let EmployeeNumber ={
  "id": data.EmployeeNumber,
}
this.dataservice.deleteEmployee(EmployeeNumber)
.toPromise()
.then(result => {
  this.spinner.hide();
this.alertService.warn("deleted")
this.getEmployees();
}, (err) => {
  this.spinner.hide();
  this.alertService.warn("deleted")
  this.getEmployees();
});


}
















}
