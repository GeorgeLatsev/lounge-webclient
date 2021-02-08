import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { HttpErrorService } from 'src/app/core/services/http-error.service';
import { ConnectionsService } from 'src/app/core/services/users/connections.service';
import { RelationshipEnum } from 'src/app/core/services/users/models/connection.model';
import { User } from 'src/app/core/services/users/models/user.model';
import { UserService } from 'src/app/core/services/users/user.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  user$: Observable<User> | undefined

  tab: Tab = Tab.Home;
  Tab = Tab;

  addUserForm: FormGroup;
  showError: boolean = false;
  errorMsg: string = '';
  showSuccess: boolean = false;

  RelationshipEnum = RelationshipEnum;

  showSettingsOverlay: boolean = false;

  constructor(
    public connectionsService: ConnectionsService,
    private userService: UserService,
    private httpErrorService: HttpErrorService
  ) {
    this.addUserForm = new FormGroup({
      nameAndTag: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9-_]*#[0-9A-F]{4}$")])
    });
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();

    this.httpErrorService.addHandler(`^${environment.apiUrls.usersApi}/api/users/[A-Za-z0-9-_]*%23[0-9A-F]{4}$`,
      e => {
        this.showError = true;
        this.showSuccess = false;
        this.errorMsg = e.error[0]
      });
  }

  onSubmit(data: any): void {
    this.connectionsService.getByName(data.nameAndTag)
      .pipe(
        filter(connection => connection != undefined),
        take(1),
        switchMap((connection) => {
          return this.connectionsService.update({ otherId: connection?.otherId ?? '', relationship: 2 }); // SOME KIND OF A LOOP WHILE ACCEPTING PROB IS NOT A GOOD IDEA TO HAVE THE CONN FROM THE HTTP REQUEST MAYBE JUST CHANGE THE API SO IT RETURNS THE 0 AS WELL
        }),
        tap(() => {
          this.showSuccess = true;
          this.showError = false;
        }),
        catchError(e => {
          this.showError = true;
          this.showSuccess = false;
          this.errorMsg = e.error[0]
          return throwError(e);
        })
      )
      .subscribe();
  }
}

enum Tab {
  Home,
  Friends,
  Add,
  Requests,
  Blocked
}