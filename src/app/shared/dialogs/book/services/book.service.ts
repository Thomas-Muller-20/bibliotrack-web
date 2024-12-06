import { Injectable } from '@angular/core'
import {Book} from "../model/book"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private basic = 'http://localhost:8080/books'
  constructor(private http: HttpClient) { }

  save(value: Partial<Book>) {
    return this.http.post<Book>(this.basic, value)
  }
  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.basic)
  }

  update(value: Book, id: number): Observable<Book> {
    return this.http.put<Book>(this.basic + `/` + id, value)
  }
}
