import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-user-profile-edit-card',
    templateUrl: './user-profile-edit-card.component.html',
    styleUrls: ['./user-profile-edit-card.component.scss']
})
export class UserProfileEditCardComponent implements OnInit {

    @Input() userData = { Username: '', Password: '', NewUsername: '', NewPassword: '', NewEmail: '', Birthday: '' };

    constructor(
        public dialog: MatDialog,
        public fetchApiData: FetchApiDataService,
    ) { }

    ngOnInit(): void {
    }

    editUser(): void { // add are you sure msg
        const localUser: any = localStorage.getItem('user');
        const data: any = this.userData;
        data.Username = localUser;
        Object.keys(data).forEach((k) => data[k] == '' && delete data[k]);

        this.fetchApiData.updateUser(data).subscribe((resp: any) => {
            console.log(resp);
            // localStorage.clear();
            return resp;
        });
    }

}
