import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'


import { BehaviorSubject, Observable } from 'rxjs'
import {User, UserCredentials, UserRole} from "../model/user.model"
import jwt_decode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)

  private basic = 'http://localhost:8080/auth'

  constructor(private http: HttpClient) {
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: { id: number; sub: string; roles: UserRole[]; exp: number } = jwt_decode(token)
      const currentTime = Math.floor(Date.now() / 1000)

      if (decodedToken.exp < currentTime) {
        return false
      }

      this.user$.next({id: decodedToken.id, username: decodedToken.sub, roles: decodedToken.roles})
      return true
    } catch (error) {
      return false
    }
  }

  signIn({ username, password }: { username: string; password: string }): Observable<UserCredentials> {
    return this.http.post<UserCredentials>(this.basic + '/sign-in', {username, password})
  }

  signUp({ username, password }: { username: string; password: string }): Observable<UserCredentials> {
    return this.http.post<UserCredentials>(this.basic + '/sign-up', {username, password})
  }
}
