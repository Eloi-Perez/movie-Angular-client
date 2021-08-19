import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'movie-Angular-client';
}


// export class AppComponent {
//     constructor(
//         public router: Router
//     ) { }
//     title = 'movie-Angular-client';
//     ngOnInit(): void {
//         const localUser = localStorage.getItem('user');
//         !localUser && this.router.navigate(['welcome']);
//         console.log('test');
//     }
//     const localUser = localStorage.getItem('user');
//     if(!localUser) { this.router.navigate(['welcome']); }
// }