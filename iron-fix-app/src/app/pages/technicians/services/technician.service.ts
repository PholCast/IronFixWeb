import { Injectable } from '@angular/core';
import { User } from '../../../shared/interfaces/user.interface'

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor() { }

  getTechnicians(): User[] {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.filter((user:User) => user.role.toLowerCase() === 'technician');
  }

  // Agregar o actualizar técnico
  saveTechnician(technician: User, originalUsername?: string | null): true | 'username' | 'email' {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    const duplicate = users.find((u: User) => 
      u.username.toLowerCase() === technician.username.toLowerCase() &&
      u.username.toLowerCase() !== (originalUsername || '').toLowerCase()
    );
  
    if (duplicate) return 'username';

    const emailDuplicate = users.find((u: User) =>
    u.email.toLowerCase() === technician.email.toLowerCase() &&
    u.username.toLowerCase() !== (originalUsername || '').toLowerCase()
    );

    if (emailDuplicate) return 'email';
  
    if (originalUsername) {
      // Editando
      const index = users.findIndex((u: User) => 
        u.username.toLowerCase() === originalUsername.toLowerCase()
      );
      if (index !== -1) {
        users[index] = technician;
      }
    } else {
      // Creando
      users.push(technician);
    }
  
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  


  deleteTechnician(username: string) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter((user: User) => user.username.toLowerCase() !== username.toLowerCase());
    localStorage.setItem('users', JSON.stringify(users));
  }
}
