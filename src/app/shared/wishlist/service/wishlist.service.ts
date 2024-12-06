import { Injectable } from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"
import {Wishlist} from "../model/wishlist"

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private basic = 'http://localhost:8080/wishlist'
  constructor(private http: HttpClient) { }

  save(value: Partial<Wishlist>) {
    return this.http.post<Wishlist>(this.basic, value)
  }
  getAllById(userId: string): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(this.basic +`/user/` + userId)
  }

  update(value: Wishlist, id: number): Observable<Wishlist> {
    return this.http.put<Wishlist>(this.basic + `/` + id, value)
  }


}
