import { Component } from '@angular/core'
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms"
import {MatButton} from "@angular/material/button"
import {MatDialogRef} from "@angular/material/dialog"
import {Router} from "@angular/router"
import {AuthService} from "../../../auth/services/auth.service"
import {BookService} from "../../book/services/book.service"

@Component({
  selector: 'app-book-edit-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './book-edit-dialog.component.html',
  styleUrl: './book-edit-dialog.component.css'
})
export class BookEditDialogComponent {
  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    description: ['', [Validators.required, Validators.minLength(6)]],
  })


  constructor(
    private dialogRef: MatDialogRef<BookEditDialogComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private bookService: BookService
  ) { }

  submitDialog() {
    console.log(111111)
    this.bookService.save(this.form.value).subscribe(response => {
      console.log('Book saved', response)
    }, error => {
      console.error('Error saving book', error)
    })
    this.dialogRef.close()
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
