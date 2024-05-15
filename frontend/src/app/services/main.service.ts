import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  url: string = environments.url

  private configUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public readonly configUser$: Observable<any> = this.configUser.asObservable();

  constructor(private http: HttpClient) { }

  createUser(request: User){
    return this.http.post<any>(
      `${this.url}/users`,
      request
    )
  }

  updateUser(request: any, id: string){
    return this.http.put<any>(
      `${this.url}/users/${id}`,
      request
    )
  }

  getAllUser(){
    return this.http.get<any>(`${this.url}/users`)
  }

  setUser(user: any){
    this.configUser.next(user)
  }

  uploadProfileImg(request: any, id: string){
    return this.http.put<any>(
      `${this.url}/users/upload-profile-image/${id}`,
      request
    )
  }

  uploadCoverImg(request: any, id: string){
    return this.http.put<any>(
      `${this.url}/users/upload-cover-image/${id}`,
      request
    )
  }

  deletInfo(request: any, id: string){
    return this.http.delete<any>(
      `${this.url}/users/info/${id}`,
      { body: request }
    )
  }
}
