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
    constructor(
        public dialog: MatDialog,
        public fetchApiData: FetchApiDataService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const userFromRoute = routeParams.get('user');
        this.getUser(userFromRoute);
    }

    getUser(userParam: any): void { //can be call the same?
        this.fetchApiData.getUser(userParam).subscribe((resp: any) => {
            this.user = resp;
            console.log(this.user);
            return this.user;
        });
    }

    openEditDialog(): void {
        this.dialog.open(UserProfileEditCardComponent, {
            width: '280px'
        });
    }
    openDeleteDialog(): void {
        this.dialog.open(UserProfileDeleteCardComponent, {
            width: '280px'
        });
    }
}