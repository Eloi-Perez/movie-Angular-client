import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    localUser: any = '';
    constructor(
        public router: Router,
    ) { }

    ngOnInit(): void {
        this.localUser = localStorage.getItem('user');
    }

    /**
    * Log out User:
    * clear local storage & navigate back to start page
    */
    logoff():void {
        localStorage.clear();
        this.router.navigate(['welcome']);
    }
}