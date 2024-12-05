import {CanActivateFn, Router} from "@angular/router"
import {inject} from "@angular/core"
import {AuthService} from "../services/auth.service"

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const routerService = inject(Router)
  const token = localStorage.getItem('jwtToken')
  console.log(2)
  if (!token || !authService.isTokenValid(token)) {
    console.log(111)
    routerService.navigate(['/home'])
    return false
  }
  return true
}
