import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Profile } from '../../models/profile.model';

@Injectable({
  providedIn: 'root'
})

export class ProfilesService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/profiles`;

  getProfiles() {
    return this.http.get<Profile[]>(this.apiUrl);
  }

}
