import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly http = inject(HttpClient); //Obtiene una instancia de HttpClient para realizar solicitudes HTTP

    private readonly apiUrl = `${environment.apiUrl}/users`;

    getUsers() {
      return this.http.get<User[]>(this.apiUrl);
    }
}
