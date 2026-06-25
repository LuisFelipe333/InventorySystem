import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Section } from '../../models/section.model';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl = `${environment.apiUrl}/sections`;

    getSections() {

        return this.http.get<Section[]>(this.apiUrl);

    }

}