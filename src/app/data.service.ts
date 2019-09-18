import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError,Subscriber} from 'rxjs';
import { tap, catchError, map, filter, toArray } from 'rxjs/operators';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data;
  apiurl = 'http://localhost:50777/api/';                   // main api
  urlGetAllDepartments =  this.apiurl + 'Departments';      //get all departments
  urlGetDepartmentById = this.apiurl +'Departments/';       //get department by id
  urlAddDepartment = this.apiurl + 'Departments';           // add deartment
  urlEditDepartment = this.apiurl +'Departments/';          // edit department
  urlDeleteDepartment = this.apiurl + 'Departments/';       //delete departmet
  //////////////////////////////////////////////////
  urlGetAllEmployess = this.apiurl + 'Employees';           //get all employess
  urlGetEmployeeById = this.apiurl + 'Employees/';          //get employee by Id
  urlAddEmployee = this.apiurl +'Employees';                 //add employee
  urlEditEmployee = this.apiurl + 'Employees/';              // edit employee
  urlDeleteEmployee = this.apiurl + 'Employees/';            // delete employee

  urlGetAge = this.apiurl +'';                              //get Age

  constructor(private http: HttpClient) {}      
     
   //Injecting HTTP service to communicate with the data

   private handleError(error: any) {
    console.error(error);                                       //Created a function to handle and log errors, in case
    return throwError(error);
  }

  ////get all departments/////////////
  getAllDepartments(){
    return new Promise(resolve => {
      this.http.get(this.urlGetAllDepartments)
        .subscribe(data => {
          this.data = data;
          resolve(data);
        }, err => {
        
        });
    });
  }

//////////////create department
  createDepartment(data) {
let headers = new HttpHeaders(
      {
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT,OPTIONS'
      });
    return new Promise((resolve, reject) => {
       this.http.post(this.urlAddDepartment, JSON.stringify(data),{headers} )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err)
        });
    });
  }

///get department by id
  getDepartmentById(data) {
return new Promise((resolve, reject) => {
       this.http.get(this.urlGetDepartmentById +data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err)
        });
    });
  }
////////////edit department
  editDepartment(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT,OPTIONS'
      }),
      body: data,
    };
     console.log(data)
    return new Promise((resolve, reject) => {
      this.http.put(this.urlEditDepartment , JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err)
        });
    });
  }
/////////////delete department
  deleteDepartment(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT,OPTIONS'
      }),
      body: data,
    };
console.log("delete data",data)
    return this.http
      .delete(this.urlDeleteDepartment + data.id)
      .pipe(map((response: any) => response.json()));
  }
///////////////////////////////////
//////get all employees/////////////
  getAllEmployees(){
    return new Promise(resolve => {
      this.http.get(this.urlGetAllEmployess)
        .subscribe(data => {
          this.data = data;
          resolve(data);
        }, err => {
        
        });
    });
  }
/////// create  employee
  createEmployee(data) {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT,OPTIONS'
      });
    return new Promise((resolve, reject) => {
       this.http.post(this.urlAddEmployee, JSON.stringify(data),{headers} )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err)
        });
    });
  }
//////////get employee by id
  getEmployeeById(data) {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlGetEmployeeById +data)
       .subscribe(res => {
         resolve(res);
       }, (err) => {
         reject(err)
       });
   });
  }
////////////edit employee
  editEmployee(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT,OPTIONS'
      }),
      body: data,
    };
     console.log(data)
    return new Promise((resolve, reject) => {
      this.http.put(this.urlEditEmployee , JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err)
        });
    });
  }
////////////delete employee
  deleteEmployee(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT,OPTIONS'
      }),
      body: data,
    };
console.log("delete data",data)
    return this.http
      .delete(this.urlDeleteEmployee + data.id)
      .pipe(map((response: any) => response.json()));
  }




}

