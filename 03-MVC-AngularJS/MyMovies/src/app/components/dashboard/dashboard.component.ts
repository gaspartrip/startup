import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showMe: boolean = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showMe = true;
    }, 1000)
  }

}