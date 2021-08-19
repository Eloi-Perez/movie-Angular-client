import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        public router: Router
    ) { }
    ngOnInit(): void {
        const localUser = localStorage.getItem('user');
        localUser && this.router.navigate(['movies']);
    }
    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent, {
            width: '280px'
        });
    }
    openUserLoginDialog(): void {
        this.dialog.open(UserLoginFormComponent, {
            width: '280px'
        });
    }
}