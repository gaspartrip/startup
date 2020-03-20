import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {

  @Input() alertMessage: String = "";
  @Output() closed = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void { }

  cleanAlertMessage(): void {
    this.alertMessage = "";
    this.closed.emit(true);
  }

}
