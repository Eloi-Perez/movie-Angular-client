import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

    @Input() userData = { Username: '', Password: '' };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router
    ) { }

    ngOnInit(): void {
    }

    /**
    * Login User
    * Send this.userData
    * Store user in localStorage
    * @param this.userData
    */
    loginUser(): void {
        this.fetchApiData.userLogin(this.userData).subscribe((result) => {
            this.dialogRef.close(); // This will close the modal on success!
            localStorage.setItem('user', result.Username);
            localStorage.setItem('token', result.token);
            this.snackBar.open(result, 'OK', {
                duration: 2000
            });
            this.router.navigate(['movies']);
        }, (result) => {
            this.snackBar.open(result, 'OK', {
                duration: 2000
            });
        });
    }

}