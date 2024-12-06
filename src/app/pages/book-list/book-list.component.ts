import {Component} from '@angular/core'
import {BookService} from "../../shared/dialogs/book/services/book.service"
import {Book} from "../../shared/dialogs/book/model/book"
import {Observable} from "rxjs"
import {AsyncPipe, NgForOf, NgIf} from "@angular/common"
import {MatButton} from "@angular/material/button"
import {MatDialog} from "@angular/material/dialog"
import {BookEditDialogComponent} from "../../shared/dialogs/components/book-edit-dialog/book-edit-dialog.component"

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    MatButton
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  books$: Observable<Book[]> = this.bookService.getAll()

  constructor(private dialog: MatDialog, private bookService: BookService) {
  }

  openEditModal(book: Book): void {
    const dialogRef = this.dialog.open(BookEditDialogComponent, {data: book})

    dialogRef.afterClosed().subscribe((updatedBook: Book | undefined) => {
      if (updatedBook) {
        this.updateBookInList()
      }
    })
  }

  private updateBookInList(): void {
    this.books$ = this.bookService.getAll()

  }
}
