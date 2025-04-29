import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const technicianGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService)
  const router = inject(Router)

  if(authService.isTechnician()){
    router.navigateByUrl(''); 
    return false;
  }
  
  return true;
};
