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
    apiUrl = this.fetchApiData.apiUrl;
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.getMovies();
    }

    /**
    * Get all movies & store in this.movies
    * load this.getUser()
    */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            const sorted = resp.sort((a: any, b: any) => {
                let compA = a.Title.toUpperCase();
                let compB = b.Title.toUpperCase();
                if (compA < compB) { return -1 }
                if (compA > compB) { return 1 }
                return 0;
            })
            this.movies = sorted;
            // Load next function
            this.getUser();
        });
    }

    /**
    * Get User info & store in this.user
    * load this.merge()
    */
    getUser(): void {
        const localUser: any = localStorage.getItem('user');
        this.fetchApiData.getUser(localUser).subscribe((resp: any) => {
            this.user = resp;
            // Load next function
            this.merge(resp);
        });
    }

    /**
    * Merge User favourites movies into this.movies object
    * @param userResponse from this.getUser()
    */
    merge(userResponse: { Username: string, myMovies: any[] }): void {
        userResponse.myMovies.forEach(sourceElement => {
            let targetElement = this.movies.find(targetElement => {
                return sourceElement.Movie.Title === targetElement.Title;
            })
            targetElement ? Object.assign(targetElement, sourceElement) : null //: this.movies.push(sourceElement);
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
            this.merge(resp);
            console.log(this.user);
            return this.user;
        });
    }

    /**
    * Open Director-Card Component
    */
    openDirectorDialog(data: object): void {
        this.dialog.open(DirectorCardComponent, {
            data,
            width: '380px'
        });
    }
    /**
    * Open Genre-Card Component
    */
    openGenreDialog(data: object): void {
        this.dialog.open(GenreCardComponent, {
            data,
            width: '380px'
        });
    }
    /**
    * Open Description-Card Component
    */
    openDescriptionDialog(data: object): void {
        this.dialog.open(DescriptionCardComponent, {
            data,
            width: '380px'
        });
    }
}