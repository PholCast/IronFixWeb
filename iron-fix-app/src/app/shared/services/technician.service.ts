import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor() { }

  // Obtener todos los técnicos desde localStorage
  getTechnicians(): User[] {
    const storage = JSON.parse(localStorage.getItem('appData') || '{"users":[],"equipment":[],"orders":[]}');
    return storage.users.filter((user: any) => user.role === 'technician');
  }

  // Agregar o actualizar técnico
  saveTechnician(technician:any, originalUsername?: string | null) {
    const storage = JSON.parse(localStorage.getItem('appData') || '{"users":[],"equipment":[],"orders":[]}');

    const usernameToSearch = originalUsername || technician.username;

    const existingTechnician = storage.users.find((u: User) => u.username === usernameToSearch);
    
    if (existingTechnician) {
      existingTechnician.fullname = technician.fullname;
      existingTechnician.username = technician.username;
      existingTechnician.email = technician.email;
      existingTechnician.company = technician.company;
    } else {
      storage.users.push(technician);
    }

    localStorage.setItem('appData', JSON.stringify(storage));
  }

  // Eliminar técnico
  deleteTechnician(username: string) {
    const storage = JSON.parse(localStorage.getItem('appData') || '{"users":[],"equipment":[],"orders":[]}');
    storage.users = storage.users.filter((user: User) => user.username !== username);
    localStorage.setItem('appData', JSON.stringify(storage));
  }
}
