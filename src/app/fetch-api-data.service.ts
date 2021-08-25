import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api2.herokuapp.com'; // 'http://localhost:8080'
@Injectable({
    providedIn: 'root'
})
export class FetchApiDataService {
    public apiUrl = apiUrl;
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
    constructor(private http: HttpClient) {
    }

    /**
    * Get all movies endpoint
    * @returns Request to the database (Endpoint: 'movies', Method: GET)
    */
    public getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + '/movies', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
    // public getMovie(): Observable<any> {
    //     const token = localStorage.getItem('token');
    //     return this.http.get(apiUrl + '/movies/:Title', {
    //         headers: new HttpHeaders(
    //             {
    //                 Authorization: 'Bearer ' + token,
    //             })
    //     }).pipe(
    //         map(this.extractResponseData),
    //         catchError(this.handleError)
    //     );
    // }
    // public getGenre(): Observable<any> {
    //     const token = localStorage.getItem('token');
    //     return this.http.get(apiUrl + '/genres/:Genre', {
    //         headers: new HttpHeaders(
    //             {
    //                 Authorization: 'Bearer ' + token,
    //             })
    //     }).pipe(
    //         map(this.extractResponseData),
    //         catchError(this.handleError)
    //     );
    // }
    // public getDirector(): Observable<any> {
    //     const token = localStorage.getItem('token');
    //     return this.http.get(apiUrl + '/directors/:Director', {
    //         headers: new HttpHeaders(
    //             {
    //                 Authorization: 'Bearer ' + token,
    //             })
    //     }).pipe(
    //         map(this.extractResponseData),
    //         catchError(this.handleError)
    //     );
    // }


    /**
    * User registration
    * @param userDetails
    * @returns Api call (Endpoint: 'users', Method: POST)
    */
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + '/users', userDetails).pipe(
            catchError(this.handleError) // + data?
        );
    }
    /**
    * User login
    * @param userDetails
    * @returns Api call (Endpoint: 'login', Method: POST)
    */
    public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + '/login', userDetails).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
    /**
    * Request User profile
    * @param user
    * @returns Api call (Endpoint: 'users:user', Method: GET)
    */
    public getUser(user: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(`${apiUrl}/users/${user}`, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
    /**
    * Update User profile
    * @param userDetails
    * @returns Api call (Endpoint: 'users', Method: PUT)
    */
    public updateUser(userDetails: any): Observable<any> {

        return this.http.put(apiUrl + '/users', userDetails).pipe(
            catchError(this.handleError)
        );
    }
    /**
    * Delete User profile
    * @param userDetails
    * @returns Api call (Endpoint: 'users', Method: DELETE)
    */
    public deleteUser(userDetails: any): Observable<any> {
        return this.http.delete(apiUrl + '/users', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    /**
    * Update User Favourites
    * @param details
    * @returns Api call (Endpoint: 'users/:user/myMovies', Method: PUT)
    */
    public updateMyMovies(details: any): Observable<any> {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        return this.http.put(apiUrl + '/users/' + user + '/myMovies', details, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }



    /**
    * Non-typed response extraction
    * @param res
    * @returns body
    */
    private extractResponseData(res: Response | Object): any {
        const body = res;
        return body || {};
    }

    /**
    * Error handler
    * @param error
    */
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