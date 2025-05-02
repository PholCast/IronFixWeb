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

  private getStoredUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  login(usernameOrEmail: string, password: string,role:string): boolean {

    const users = this.getStoredUsers();
    
    const user = users.find((u: User) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.role === role );
    
    if (user && user.password === password) {
      this.isLogged.set(true);
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
    this.isLogged.set(false);
    localStorage.removeItem('currentUser');
    this.userTechnician.set(false);
  }

  registry(user: User): boolean {

    const users = this.getStoredUsers();

    const userExists = users.some((u: User) => u.username === user.username);
    const emailExists = users.some((u: User) => u.email === user.email);
  
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
    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser',JSON.stringify(user))
    
    this.isLogged.set(true);
    return true;
  }

  currentUserExists():boolean{
    return !!this.getCurrentUser();
  }

  isTechnician(): boolean {
    const user = this.getCurrentUser()
    if(user){
      return (user.role === 'technician');
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


  
  updateUser(updatedUser: User, originalUsername: string, originalEmail: string): boolean {
    const users = this.getStoredUsers();
  
    // Verificar si el nuevo username o email ya existen en otro usuario
    const isDuplicate = users.some((u: User) =>
      (u.username === updatedUser.username || u.email === updatedUser.email) &&
      (u.username !== originalUsername || u.email !== originalEmail)
    );
  
    if (isDuplicate) {
      Swal.fire({
        text: 'Ya existe un usuario con ese nombre de usuario o correo electrónico.',
        icon: 'error'
      });
      return false;
    }
  
    // Buscar al usuario original
    const userIndex = users.findIndex(
      (u: User) => u.username === originalUsername && u.email.toLowerCase() === originalEmail.toLowerCase()
    );
  
    if (userIndex === -1) {
      Swal.fire({
        text: 'Usuario original no encontrado.',
        icon: 'error'
      });
      return false;
    }
  
    // Actualizar los datos
    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  
    Swal.fire({
      text: 'Perfil actualizado correctamente.',
      icon: 'success'
    });
  
    return true;
  }
  
  
  
}
