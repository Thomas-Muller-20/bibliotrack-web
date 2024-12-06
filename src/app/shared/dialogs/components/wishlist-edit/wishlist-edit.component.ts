import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {Book} from "../../book/model/book"
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms"
import {BookService} from "../../book/services/book.service"
import {Observable} from "rxjs"
import {AsyncPipe, NgForOf} from "@angular/common"
import {MatButton} from "@angular/material/button"
import {tap} from "rxjs/operators"
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy"
import {WishlistService} from "../../../wishlist/service/wishlist.service"
import {Wishlist} from "../../../wishlist/model/wishlist"
@UntilDestroy()
@Component({
  selector: 'app-wishlist-edit',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './wishlist-edit.component.html',
  styleUrl: './wishlist-edit.component.css'
})
export class WishlistEditComponent {
  books$: Observable<Book[]> = this.bookService.getAll()
  form = this.formBuilder.group({
    bookId: ['', Validators.required],
    priority: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    isCompleted: [false],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { userId: number },
    private dialogRef: MatDialogRef<WishlistEditComponent>,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private wishlistService: WishlistService,
  ) {
    console.log(this.data.userId)
  }

  submitDialog() {
    if (this.form.valid) {
      const wishlistData: Partial<Wishlist> = {
        userId: this.data.userId,
        bookId: Number(this.form.value.bookId) ?? 1,
        dateAdded: new Date(),
        priority: this.form.value.priority ?? 1,
        isCompleted: this.form.value.isCompleted ?? false,
      }
      console.log(wishlistData)
      this.wishlistService.save(wishlistData).pipe(
        tap(() =>  this.closeDialog()),
        untilDestroyed(this),
      ).subscribe()
      this.dialogRef.close(wishlistData)
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
