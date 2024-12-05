import { Component } from '@angular/core'
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import {MatDialogRef} from "@angular/material/dialog"
import {MatButton} from "@angular/material/button"
import {AuthService} from "../../../auth/services/auth.service"
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy"
import {tap} from "rxjs/operators"

@UntilDestroy()
@Component({
  selector: 'app-sign-up-dialog',
  standalone: true,
  imports: [
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.css'
})
export class SignUpDialogComponent {

  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
  })

  constructor(
    private dialogRef: MatDialogRef<SignUpDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  submitDialog(): void {
    this.authService.signUp(this.form.value)
      .pipe(
        tap(() => this.closeDialog()),
        untilDestroyed(this),
      )
      .subscribe()
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
