import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service'
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    movies: any[] = [];
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }

    openDirectorDialog(): void {
        this.dialog.open(DirectorCardComponent, {
            width: '280px'
        });
    }
    openGenreDialog(): void {
        this.dialog.open(GenreCardComponent, {
            width: '280px'
        });
    }
    openDescriptionDialog(): void {
        this.dialog.open(DescriptionCardComponent, {
            width: '280px'
        });
    }
}