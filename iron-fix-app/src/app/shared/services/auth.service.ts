import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged = signal(this.currentUserExists());

  userTechnician = signal(this.isTechnician())

  login(usernameOrEmail: string, password: string,role:string): boolean {

    const storage = JSON.parse(localStorage.getItem('appData') || '{"users":[],"equipment":[],"orders":[]}');
    
    const user = storage.users.find((u: User) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.role === role );
    
    if (user && user.password === password) {
      this.isLogged.update(()=>true);
      localStorage.setItem('currentUser',JSON.stringify(user));
      this.userTechnician.set(this.isTechnician());
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
    this.userTechnician.set(false);
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

  isTechnician(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if(user){
      return (user.role === 'technician') ? true : false;
    }
    return false
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return null;
  }
  
}
