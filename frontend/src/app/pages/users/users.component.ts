import { Component, inject } from '@angular/core';
import { UsersService } from '../../core/services/users.service';

import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private usersService = inject(UsersService); //Obtiene una instancia del servicio UsersService para interactuar con la API de usuarios

  users: User[] = [];

  selectedUser: User | null = null;

  protected readonly environment = environment;

  ngOnInit(): void { //Carga la lista de usuarios al inicializar el componente

      this.usersService.getUsers().subscribe({

          next: (users) => {

              console.log(users);

              this.users = users;

          },

          error: (error) => {

              console.error(error);

          }

      });

  }

  viewUser(user: User): void { //Muestra los detalles de un usuario específico para prueba, actualmente solo imprime el usuario en la consola
    this.selectedUser = user; 

    const modalElement = document.getElementById('userDetailModal'); 
    
    if (modalElement) { 
      const modal = new bootstrap.Modal(modalElement); 
      modal.show(); 
    }

  }

  editUser(user: User): void {
    console.log('Editar usuario:', user);
  }

  deleteUser(user: User): void {
    console.log('Eliminar usuario:', user);
  }

}
