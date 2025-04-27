import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged = signal(this.currentUserExists());

  login(usernameOrEmail: string, password: string,role:string): boolean {

    const storage = JSON.parse(localStorage.getItem('appData') || '{"users":[],"equipment":[],"orders":[]}');
    
    const user = storage.users.find((u: User) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.role === role );
    
    if (user && user.password === password) {
      this.isLogged.update(()=>true);
      localStorage.setItem('currentUser',JSON.stringify(user))
      return true;
    }

    Swal.fire({
      text: 'Credenciales incorrectas',
      icon: 'error'
    });
    return false;
  }

  logout(): void {
    this.isLogged.update(()=>false);
    localStorage.removeItem('currentUser');
  }

  registry(user: User): boolean {

    const storage = JSON.parse(localStorage.getItem('appData') || '{"users":[],"equipment":[],"orders":[]}');

    const userExists = storage.users.some((u: User) => u.username === user.username);
    const emailExists = storage.users.some((u: User) => u.email === user.email);
  
    if (userExists) {
      Swal.fire({
        text: `El nombre de usuario ${user.username} ya está en uso.`,
        icon: 'error'
      });
      return false;
    }
  
    if (emailExists) {
      Swal.fire({
        text: `El correo electrónico ${user.email} ya está en uso.`,
        icon: 'error'
      });
      return false;
    }
    storage.users.push(user);

    localStorage.setItem('appData', JSON.stringify(storage));
    localStorage.setItem('currentUser',JSON.stringify(user))
    
    this.isLogged.update(()=>true);
    return true;
  }

  currentUserExists():boolean{
    return !!JSON.parse(localStorage.getItem('currentUser') || 'false');
  }
}
