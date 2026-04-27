import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root',
})


export class TripData {
  register(user: User, passwd: string): Observable<AuthResponse> {
   ;
    return this.handleAuthAPICall('register', user, passwd);
  }


  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> {
    let url = 'http://localhost:3000/api/trips';

    return this.http.get<Trip[]>(url);

  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>('http://localhost:3000/api/trips', formData);
  }

  
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`http://localhost:3000/api/trips/${tripCode}`);
  }
  
  updateTrip(tripCode: string, formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`http://localhost:3000/api/trips/${tripCode}`, formData);
  }

  login(user: User, passwd: string): Observable<AuthResponse> {
  
    return this.handleAuthAPICall('login', user, passwd);
  }
  handleAuthAPICall(arg0: string, user: User, passwd: string): Observable<AuthResponse> {
    throw new Error('Method not implemented.');
  }



}
