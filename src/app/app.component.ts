import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import {NavigationComponent} from "./shared/navigation/navigation.component"
import {HTTP_INTERCEPTORS} from "@angular/common/http"
import {JwtInterceptor} from "@auth0/angular-jwt"
import {HomeComponent} from "./pages/home/home.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bibliotrack-web'
}
