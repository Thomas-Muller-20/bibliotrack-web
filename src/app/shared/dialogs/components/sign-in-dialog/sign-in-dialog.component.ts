import { Component } from '@angular/core'
import {Router} from "@angular/router"
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import {MatDialogRef} from "@angular/material/dialog"
import {MatButton} from "@angular/material/button"
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import {AuthService} from "../../../auth/services/auth.service"
import {tap} from "rxjs/operators"
import {UserCredentials} from "../../../auth/model/user.model"

@UntilDestroy()
@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.css'
})
export class SignInDialogComponent {
  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
  })

  constructor(
    private dialogRef: MatDialogRef<SignInDialogComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  submitDialog(): void {
    this.authService.signIn(this.form.value)
      .pipe(
        tap((res: UserCredentials) => {
          localStorage.setItem('jwtToken', res.token)
          this.router.navigate(['books'])
          this.closeDialog()
        }),
        untilDestroyed(this),
      )
      .subscribe()
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
