import { Component, OnInit, ElementRef } from '@angular/core';
import { EmpserviceService } from 'src/app/empservice.service';

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent implements OnInit {
  empObj = {};
  empId = 'new';
  public allEmployees = [];

  constructor(public serviceObj: EmpserviceService, public elem: ElementRef) {}

  ngOnInit() {
    this.empObj = {};
    this.empId = 'new';
    this.allEmployees = [];
    this.serviceObj.getAllEmpployees().subscribe(res => {
      console.log(res);
      this.allEmployees = res['employee'];
    });
  }

  editEmp(emp: any) {
    this.empId = emp['employeeCode'];
    this.empObj = emp;
  }

  deleteEmp(email: string) {
    this.serviceObj.deleteEmployee(email).subscribe(res => {
      if (res['message'] === 'Employee Deleted') {
        alert('Employee deleted successfully');
        this.ngOnInit();
      }
    });
  }

  submitForm() {
    if (this.empId === 'new') {
      this.serviceObj
        .addEmployee(
          this.empObj['firstName'],
          this.empObj['lastName'],
          this.empObj['employeeCode'],
          this.empObj['phone'],
          this.empObj['email']
        )
        .subscribe(res => {
          if (res['message'] === 'Employee Created') {
            alert('Employee added successfully');
            this.ngOnInit();
          }
        });
    } else {
      this.serviceObj
        .updateEmployee(
          this.empObj['firstName'],
          this.empObj['lastName'],
          this.empObj['employeeCode'],
          this.empObj['phone'],
          this.empObj['email']
        )
        .subscribe(res => {
          if (res['message'] === 'Employee Updated') {
            alert('Employee updated successfully');
            this.ngOnInit();
          }
        });
    }
  }
}
