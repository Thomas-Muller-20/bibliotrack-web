import {CanActivateFn, Router} from "@angular/router"
import {inject} from "@angular/core"
import {AuthService} from "../services/auth.service"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const routerService = inject(Router)
  const token = localStorage.getItem('jwtToken')
  if (!token || !authService.isTokenValid(token)) {
    routerService.navigate(['/home'])
    return false
  }
  return true
}
