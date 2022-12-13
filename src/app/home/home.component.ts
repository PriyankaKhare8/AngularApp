import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  loading: boolean = false ;
  constructor(
    private router: Router,
    private dataService: DataServiceService) { }



  ngOnInit() {
    this.getAllEmployeeDetails();
  }



  
  getAllEmployeeDetails() {
    this.loading = true;
    this.dataService.getAllEmployees().subscribe(response => {
      if (response) {
        console.log(response);
        this.data = response;
        localStorage.setItem("length", this.data.length);
        this.loading = false;
      }
    }, (error) => {
      this.loading = false;
      alert('Get API failed')

    });
  }
  
  navigate() {
    this.router.navigate(['/', 'add-employee']);
  }

  deleteEmployee(e: any) {
    if (e != null) {
      if (e.id != null || e.id != undefined) {
        this.loading = true;
        this.dataService.removeEmployee(e.id).subscribe(response => {
          if (response) {
            alert('data removed successfully !!!!');
            this.dataService.getAllEmployees().subscribe(res => {
              if (res) {
                this.data = res;
                this.loading = false;  
              }
            })
          }

        })
      }
    }
  }

}
