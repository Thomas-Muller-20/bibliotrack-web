import {Component} from '@angular/core'
import {Router, RouterLink, RouterModule} from "@angular/router"
import {MatDialog, MatDialogModule} from "@angular/material/dialog"
import {SignInDialogComponent} from "../dialogs/components/sign-in-dialog/sign-in-dialog.component"
import {SignUpDialogComponent} from "../dialogs/components/sign-up-dialog/sign-up-dialog.component"
import {MatButton, MatButtonModule} from "@angular/material/button"
import {HttpClient} from "@angular/common/http"
import {AuthService} from "../auth/services/auth.service"
import {Observable} from "rxjs"
import {User} from "../auth/model/user.model"
import {AsyncPipe, CommonModule, NgIf} from "@angular/common"
import {map} from "rxjs/operators"
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu"
import {BookEditDialogComponent} from "../dialogs/components/book-edit-dialog/book-edit-dialog.component"

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    NgIf,
    MatButton,
    MatMenuItem,
    MatMenu,
    MatMenuTrigger,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  user$: Observable<User | null> = this.authService.user$
  isGuest$: Observable<boolean> = this.authService.user$
    .pipe(
      map((user: User | null) => !user),
    )

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
  }

  openSignInDialog(): void {
    this.dialog.closeAll()
    this.dialog.open(SignInDialogComponent)
  }

  openSignUpDialog(): void {
    this.dialog.closeAll()
    this.dialog.open(SignUpDialogComponent)
  }

  openSignOutDialog(): void {
    localStorage.removeItem('jwtToken')
    this.authService.user$.next(null)
  }

  openBookCreateDialog() {
    this.dialog.closeAll()
    this.dialog.open(BookEditDialogComponent)
  }
}
