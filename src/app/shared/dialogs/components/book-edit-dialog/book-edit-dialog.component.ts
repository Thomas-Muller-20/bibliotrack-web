import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms"
import {MatButton} from "@angular/material/button"
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {Router} from "@angular/router"
import {AuthService} from "../../../auth/services/auth.service"
import {BookService} from "../../book/services/book.service"
import {BehaviorSubject} from "rxjs"
import {finalize, tap} from "rxjs/operators"
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy"
import {AsyncPipe, NgIf} from "@angular/common"
import {LoaderComponent} from "../../../loader/loader.component"
import {Book} from "../../book/model/book"

@UntilDestroy()
@Component({
  selector: 'app-book-edit-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    LoaderComponent
  ],
  templateUrl: './book-edit-dialog.component.html',
  styleUrl: './book-edit-dialog.component.css'
})
export class BookEditDialogComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    description: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) private book: Book ,
    private dialogRef: MatDialogRef<BookEditDialogComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    if (this?.book) {
      this.form.patchValue({
        title: this.book.title,
        author: this.book.author,
        description: this.book.description,
      })
    }
  }

  submitDialog() {
    const saveAction = !this?.book?.id
      ? this.bookService.save(this.form.value)
      : this.bookService.update(this.form.value, this.book.id)

    this.loading$.next(true)
    saveAction.pipe(
      tap((updatedBook: Book) => {
        this.dialogRef.close(updatedBook)
      }),
      finalize(() => this.loading$.next(false)),
      untilDestroyed(this)
    )
      .subscribe()
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
