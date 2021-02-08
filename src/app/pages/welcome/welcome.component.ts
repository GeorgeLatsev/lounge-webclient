import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  nameForm: FormGroup;

  constructor(
    private userService: UserService
  ) {
    this.nameForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(24), Validators.pattern('^[A-Za-z0-9-_]*$')])
    })
  }

  ngOnInit(): void {

  }

  onSubmit(data: any): void {
    this.userService.changeUser({ name: data.name }).subscribe();
  }

}
