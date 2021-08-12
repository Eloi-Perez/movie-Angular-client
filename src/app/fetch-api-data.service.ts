import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api2.herokuapp.com/';
@Injectable({
    providedIn: 'root'
})
export class UserRegistrationService {
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
    constructor(private http: HttpClient) {
    }

    //get movies endpoint
    public getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
    public getMovie(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/:Title', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
    public getGenre(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'genres/:Genre', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
    public getDirector(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'directors/:Director', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }


    // Making the api call for the user endpoint
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError) // + data?
        );
    }
    public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'login', userDetails).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
    public getUser(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
    public updateUser(userDetails: any): Observable<any> {

        return this.http.put(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError)
        );
    }
    public deleteUser(userDetails: any): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError)
        );
    }


    //myMovies (favourites)
    public updateMyMovies(details: any): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.put(apiUrl + 'users/:Username/myMovies', details, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }



    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
        const body = res;
        return body || {};
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error body is: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
}