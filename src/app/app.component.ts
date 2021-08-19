import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor(
        public router: Router
    ) { }
    title = 'movie-Angular-client';
    ngOnInit(): void {
        const localUser = localStorage.getItem('user');
        !localUser && this.router.navigate(['welcome']);
    }
}