import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  APIUrl: string = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }


  createUser(user: any, image: File) {

    const userData = new FormData();
    userData.append('user', JSON.stringify(user));
    userData.append('image', image, user.firstname);

    return this.http.post(this.APIUrl + '/create', userData).pipe(
      catchError(this.handleError));
  }

  updateUser(userId:string, user: any, image: File | string) {
    console.log(user);
    console.log(image);
    
    let userData: any | FormData;
    if (typeof image === 'string') {
      user.imageUrl = image;
      userData = user;
    } else {
      userData = new FormData();
      userData.append('user', JSON.stringify(user));
      userData.append('image', image, user.firstname);
    }

    let url = `${this.APIUrl}/update/${userId}`
    return this.http.put(url, userData).pipe(
      catchError(this.handleError));
  }

  getUser() {
    return this.http.get(this.APIUrl + '/getUser').pipe(catchError(this.handleError));
  }

  getUserById(userId) {
    let url = `${this.APIUrl}/getUser/${userId}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  deleteUser(id: string) {
    let url = `${this.APIUrl}/delete/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg: string = '';
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    }
    else {
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }
}
