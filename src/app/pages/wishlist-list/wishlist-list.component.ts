import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router"
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common"
import {MatButton} from "@angular/material/button"
import {Observable} from "rxjs"
import {WishlistService} from "../../shared/wishlist/service/wishlist.service"
import {Wishlist} from "../../shared/wishlist/model/wishlist"
import {MatDialog} from "@angular/material/dialog"
import {WishlistEditComponent} from "../../shared/dialogs/components/wishlist-edit/wishlist-edit.component"
import {Book} from "../../shared/dialogs/book/model/book"
import {BookService} from "../../shared/dialogs/book/services/book.service"

@Component({
  selector: 'app-wishlist-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './wishlist-list.component.html',
  styleUrl: './wishlist-list.component.css'
})
export class WishlistListComponent implements OnInit {
  userId: string
  wishlist$: Observable<Wishlist[]>
  books$: Observable<Book[]> = this.bookService.getAll()
  books: Book[] = []

  constructor(
    private route: ActivatedRoute,
    private wishlistService: WishlistService,
    private dialog: MatDialog,
    private bookService: BookService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id')!
    this.wishlist$ = this.wishlistService.getAllById(this.userId)
  }

  ngOnInit(): void {
    this.books$.subscribe((books) => {
      this.books = books
    })
  }

  openCreateModal() {
    this.dialog.closeAll()
    this.dialog.open(WishlistEditComponent, {data: {userId: this.userId}})
  }


  getBookTitleById(bookId: number): string {
    const book = this.books.find(b => b.id === bookId)
    return book ? book.title : 'Title not found'
  }

}
