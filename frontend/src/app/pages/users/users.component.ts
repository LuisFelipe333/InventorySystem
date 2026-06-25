import { Component, inject } from '@angular/core';
import { UsersService } from '../../core/services/users.service';

import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { environment } from '../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProfilesService } from '../../core/services/profiles.service';
import { Profile } from '../../models/profile.model';


@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private usersService = inject(UsersService); //Obtiene una instancia del servicio UsersService para interactuar con la API de usuarios
  private readonly fb = inject(FormBuilder); //Obtiene una instancia de FormBuilder para crear formularios reactivos
  private readonly profilesService = inject(ProfilesService); //Obtiene una instancia del servicio ProfilesService para interactuar con la API de perfiles
  users: User[] = [];
  profiles: Profile[] = [];

  selectedUser: User | null = null;

  selectedPhoto: File | null = null; //Almacena la foto seleccionada por el usuario para subirla al servidor

  editingUserId: string | null = null; //Almacena el ID del usuario que se está editando actualmente, si hay alguno

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: [''],
    photo: [null],
    profile_ids: this.fb.control<string[]>([])
  });


  protected readonly environment = environment; //Permite acceder a las variables de entorno en la plantilla del componente

  
  isEditMode = false; //Indica si el componente está en modo de edición o no
  showPassword = true; //Indica si la contraseña del usuario debe mostrarse o no


  ngOnInit(): void { //Carga la lista de usuarios al inicializar el componente

      this.loadUsers();
      this.loadProfiles();

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

    this.userForm.controls.password.clearValidators();

    this.userForm.controls.password.updateValueAndValidity();

    this.isEditMode = true;

    this.editingUserId = user.id;

    this.selectedPhoto = null;

    this.userForm.patchValue({

      name: user.name,

      email: user.email,

      phone: user.phone,

      password: '',

      profile_ids: user.profile_ids

    });

    const modalElement = document.getElementById('userFormModal');

    if (modalElement) {

      new bootstrap.Modal(modalElement).show();

    }

  }

  deleteUser(user: User): void { //Elimina un usuario específico después de confirmar la acción con el usuario
    const confirmDelete = confirm(
      `¿Está seguro de eliminar al usuario "${user.name}"?`
    );

    if (!confirmDelete) {
      return;
    }
    console.log(user);
    this.usersService.deleteUser(user.id).subscribe({
      
      next: () => {

        alert('Usuario eliminado correctamente.');

        this.loadUsers();

      },

      error: (error) => {

        console.error(error);

        alert('Ocurrió un error al eliminar el usuario.');

      }
    });
  }

  loadUsers(): void { //Carga la lista de usuarios
    this.usersService.getUsers().subscribe({ 
      next: (users) => { 
        this.users = users; 
      }, 
      error: (error) => { 
        console.error(error); 
      } 
    }); 
  }

  openCreateModal(): void { 
    this.isEditMode = false;

    this.userForm.reset();

    this.userForm.controls.password.setValidators([
      Validators.required,
      Validators.minLength(8)
    ]);

    this.userForm.controls.password.updateValueAndValidity();

    this.userForm.patchValue({
      profile_ids: []
    });

    const modalElement = document.getElementById('userFormModal');

    if (modalElement) {

      const modal = new bootstrap.Modal(modalElement);

      modal.show();

    }
  }

  loadProfiles(): void { //Carga la lista de perfiles

    this.profilesService.getProfiles().subscribe({

      next: (profiles) => {

        this.profiles = profiles;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedPhoto = input.files[0];
    }
  }

  onProfileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const profileId = input.value;

    const currentProfiles = this.userForm.controls.profile_ids.value ?? [];

    if (input.checked) {
      this.userForm.patchValue({
        profile_ids: [...currentProfiles, profileId]
      });
    } else {
      this.userForm.patchValue({
        profile_ids: currentProfiles.filter(id => id !== profileId)
      });
    }
  }

  saveUser(): void {
    console.log(this.userForm.value);
    
    if (this.isEditMode) {

        this.updateUser();

    } else {

        this.createUser();

    }

  }

  private createUser(): void {

    if (this.userForm.invalid) {
      alert('Completa los campos requeridos.');
      return;
    }

    const formData = new FormData();

    formData.append('name', this.userForm.value.name ?? '');
    formData.append('email', this.userForm.value.email ?? '');
    formData.append('phone', this.userForm.value.phone ?? '');
    formData.append('password', this.userForm.value.password ?? '');

    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }

    const profileIds = this.userForm.value.profile_ids ?? [];

    profileIds.forEach(profileId => {
      formData.append('profile_ids[]', profileId);
    });

    this.usersService.createUser(formData).subscribe({
      next: () => {
        alert('Usuario creado correctamente.');
        this.loadUsers();
        const modalElement = document.getElementById('userFormModal');
        if (modalElement) {
            bootstrap.Modal.getInstance(modalElement)?.hide();
        }
      },
      error: (error) => {
        console.error(error);
        alert('Ocurrió un error al crear el usuario.');
      }
    });

  }


  private updateUser(): void {
    if (this.userForm.invalid) {

        alert('Completa los campos requeridos.');

        return;

    }

    const formData = new FormData();

    formData.append('name', this.userForm.value.name ?? '');
    formData.append('email', this.userForm.value.email ?? '');
    formData.append('phone', this.userForm.value.phone ?? '');

    if (this.userForm.value.password) {

        formData.append(
            'password',
            this.userForm.value.password
        );

    }

    if (this.selectedPhoto) {

        formData.append(
            'photo',
            this.selectedPhoto
        );

    }

    (this.userForm.value.profile_ids ?? []).forEach(profileId => {

        formData.append(
            'profile_ids[]',
            profileId
        );

    });

    this.usersService
        .updateUser(this.editingUserId!, formData)
        .subscribe({

            next: () => {

                alert('Usuario actualizado.');

                this.loadUsers();

                bootstrap
                    .Modal
                    .getInstance(
                        document.getElementById('userFormModal')!
                    )
                    ?.hide();

            },

            error: console.error

        });

  }
  

  
}
