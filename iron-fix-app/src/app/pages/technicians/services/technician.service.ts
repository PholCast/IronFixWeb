import { Injectable } from '@angular/core';
import { User } from '../../../shared/interfaces/user.interface'

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor() { }

  getTechnicians(): User[] {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.filter((user:User) => user.role === 'technician');
  }

  // Agregar o actualizar técnico
  saveTechnician(technician:User, originalUsername?: string | null) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const usernameToSearch = originalUsername || technician.username;

    const existingTechnician = users.find((u: User) => u.username === usernameToSearch);
    
    if (existingTechnician) {
      existingTechnician.fullname = technician.fullname;
      existingTechnician.username = technician.username;
      existingTechnician.email = technician.email;
      existingTechnician.company = technician.company;
    } else {
      users.push(technician);
    }

    localStorage.setItem('users', JSON.stringify(users));
  }


  deleteTechnician(username: string) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter((user: User) => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
  }
}
