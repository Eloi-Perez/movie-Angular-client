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
    user: { Username: string, myMovies: any[] } = { Username: '', myMovies: [] };
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
            // Load next function
            this.getUser();
        });
    }

    getUser(): void {
        const localUser: any = localStorage.getItem('user');
        this.fetchApiData.getUser(localUser).subscribe((resp: any) => {
            this.user = resp;
            // Load next function
            this.merge(resp);
        });
    }

    merge(u: { Username: string, myMovies: any[] }): void {
        console.log(u)
        console.log(this.movies);
        u.myMovies.forEach(sourceElement => {
            let targetElement = this.movies.find(targetElement => {
                return sourceElement.Movie.Title === targetElement.Title;
            })
            targetElement ? Object.assign(targetElement, sourceElement) : null //: this.movies.push(sourceElement);
        });
    }

    changeFav(title: string, fav: boolean): void {
        const data = { Movie: title, Favorite: fav }
        this.fetchApiData.updateMyMovies(data).subscribe((resp: any) => {
            this.user = resp;
            this.merge(resp);
            console.log(this.user);
            return this.user;
        });
    }

    openDirectorDialog(data: object): void {
        this.dialog.open(DirectorCardComponent, {
            data,
            width: '280px'
        });
    }
    openGenreDialog(data: object): void {
        this.dialog.open(GenreCardComponent, {
            data,
            width: '280px'
        });
    }
    openDescriptionDialog(data: object): void {
        this.dialog.open(DescriptionCardComponent, {
            data,
            width: '280px'
        });
    }
}