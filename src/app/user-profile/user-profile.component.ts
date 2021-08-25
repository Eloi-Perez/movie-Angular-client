import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service'
import { UserProfileEditCardComponent } from '../user-profile-edit-card/user-profile-edit-card.component';
import { UserProfileDeleteCardComponent } from '../user-profile-delete-card/user-profile-delete-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    user: any = {};
    sameUser: boolean = false;
    apiUrl = this.fetchApiData.apiUrl;
    testUser: boolean = false;
    constructor(
        public dialog: MatDialog,
        public fetchApiData: FetchApiDataService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const userFromRoute = routeParams.get('user');
        this.getUser(userFromRoute);
        const localUser: any = localStorage.getItem('user');
        if (localUser == userFromRoute) { this.sameUser = true }
        if (localUser == 'testUser') { this.sameUser = false; this.testUser = true }
    }

    /**
    * Get User info
    * @param userParam
    */
    getUser(userParam: any): void {
        this.fetchApiData.getUser(userParam).subscribe((resp: any) => {
            this.user = resp;
            console.log(this.user);
            return this.user;
        });
    }

    /**
    * Favourite film
    * @param title
    * @param fav
    */
    changeFav(title: string, fav: boolean): void {
        const data = { Movie: title, Favorite: fav }
        this.fetchApiData.updateMyMovies(data).subscribe((resp: any) => {
            this.user = resp;
            console.log(this.user);
            return this.user;
        });
    }

    /**
    * Open User-Profile-Edit-Card Component
    */
    openEditDialog(): void {
        this.dialog.open(UserProfileEditCardComponent, {
            width: '280px'
        });
    }
    /**
    * Open User-Profile-Delete-Card Component
    */
    openDeleteDialog(): void {
        this.dialog.open(UserProfileDeleteCardComponent, {
            width: '280px'
        });
    }
}