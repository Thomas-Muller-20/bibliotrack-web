import { Injectable } from '@angular/core'
import {Book} from "../model/book"
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private basic = 'http://localhost:8080/books'
  constructor(private http: HttpClient) { }

  save(value: Partial<Book>) {
    console.log(value)
    return this.http.post<Book>(this.basic, value)
  }
}
