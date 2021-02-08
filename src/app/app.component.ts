import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReadyMethod } from './core/services/notifications/methods/ready.method';
import { NotificationsService } from './core/services/notifications/notifications.service';
import { UserService } from './core/services/users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private notificationService: NotificationsService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    this.notificationService.on(ReadyMethod, ([data]) => {
      this.spinner.hide();
    });
  }
}
