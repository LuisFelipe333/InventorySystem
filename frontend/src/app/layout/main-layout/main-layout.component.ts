import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Section } from '../../models/section.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  sections: Section[] = [];

  ngOnInit(): void {

    const user = this.authService.currentUser;

    if (!user) {
      return;
    }

    const uniqueSections = new Map<string, Section>();

    user.profiles.forEach(profile => {

      profile.sections.forEach(section => {

        uniqueSections.set(
          section.id,
          section
        );

      });

    });

    this.sections = Array.from(
      uniqueSections.values()
    );

  }

  getRoute(sectionName: string): string {

    switch (sectionName) {

      case 'Dashboard':
        return '/dashboard';

      case 'Usuarios':
        return '/users';

      case 'Productos':
        return '/products';

      case 'Perfiles':
        return '/profiles';

      case 'Bitácora':
        return '/logs';

      default:
        return '/dashboard';

    }

  }

  logout(): void {

    this.authService.logout().subscribe({

      next: () => {

        this.router.navigate([
          '/login'
        ]);

      },

      error: () => {

        localStorage.removeItem('token');

        this.router.navigate([
          '/login'
        ]);

      }

    });

  }

}