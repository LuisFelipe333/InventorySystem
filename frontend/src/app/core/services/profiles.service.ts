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

    createProfile(profile: Partial<Profile>) {
        return this.http.post(this.apiUrl, profile);
    }

    updateProfile(id: string, profile: Partial<Profile>) {
        return this.http.put(`${this.apiUrl}/${id}`, profile);
    }

    deleteProfile(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

}