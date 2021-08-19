import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-user-profile-delete-card',
    templateUrl: './user-profile-delete-card.component.html',
    styleUrls: ['./user-profile-delete-card.component.scss']
})
export class UserProfileDeleteCardComponent implements OnInit {

    @Input() userData = { Username: '', Password: '' };

    constructor(
        public dialog: MatDialog,
        public fetchApiData: FetchApiDataService,
    ) { }

    ngOnInit(): void {
    }

    delUser(): void { // add are you sure msg
        const localUser: any = localStorage.getItem('user');
        const data: any = this.userData;
        data.Username = localUser;

        this.fetchApiData.deleteUser(data).subscribe((resp: any) => {
            console.log(resp);
            localStorage.clear();
            return resp;
        });
    }
}
