import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
    selector: 'app-director-card',
    templateUrl: './director-card.component.html',
    styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {
    director: any = []
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<DirectorCardComponent>,
    ) { }

    ngOnInit(): void {
    }

    // getDirector(film: any): void {
    //     this.fetchApiData.getDirector(film).subscribe((resp: any) => {
    //         this.director = resp;
    //         console.log(this.director);
    //         return this.director;
    //     });
    // }

}
