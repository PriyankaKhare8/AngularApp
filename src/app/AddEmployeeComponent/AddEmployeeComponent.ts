import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './AddEmployeeComponent.html',
  styleUrls: ['./AddEmployeeComponent.css']
})


export class AddEmployeeComponent implements OnInit {
  empForm = this.fb.group({
    name: ['', Validators.required],
    designation: ['', Validators.minLength(5)],
    email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }]
  });

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataServiceService) { }
  ngOnInit() {

  }


  profileForm = this.fb.group({
    employeeName: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
    location: ['', Validators.required],
    contact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
  });

  onSubmit() {
    if (this.profileForm.value) {
      const empData = {
        name: this.profileForm.value.employeeName,
        contact: this.profileForm.value.contact,
        profession: this.profileForm.value.role,
        emailId: this.profileForm.value.email,
        location: this.profileForm.value.location,
        id: localStorage.getItem("length")
      }
      this.dataService.addEmployee(empData).subscribe(response => {
        if (response) {
          alert('Data added successfully');
          this.profileForm.reset();
        }
      })

    }
  }


  navigateToDashboard() {
    this.router.navigate(['/', 'home']);
  }
}
