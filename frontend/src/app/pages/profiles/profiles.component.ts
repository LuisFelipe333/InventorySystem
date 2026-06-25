import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import * as bootstrap from 'bootstrap';

import { Profile } from '../../models/profile.model';
import { Section } from '../../models/section.model';

import { ProfilesService } from '../../core/services/profiles.service';
import { SectionsService } from '../../core/services/sections.service';

@Component({
  selector: 'app-profiles',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent {

  private readonly profilesService = inject(ProfilesService);

  private readonly sectionsService = inject(SectionsService);

  private readonly fb = inject(FormBuilder);

  profiles: Profile[] = [];

  sections: Section[] = [];

  selectedProfile?: Profile;

  isEditMode = false;

  editingProfileId: string | null = null;

  profileForm = this.fb.group({

    name: ['', Validators.required],

    section_ids: this.fb.control<string[]>([])

  });

  ngOnInit(): void {

    this.loadProfiles();

    this.loadSections();

  }

  loadProfiles(): void {

    this.profilesService.getProfiles().subscribe({

      next: (profiles) => {

        this.profiles = profiles;

      },

      error: console.error

    });

  }

  loadSections(): void {

    this.sectionsService.getSections().subscribe({

      next: (sections) => {

        this.sections = sections;

      },

      error: console.error

    });

  }

  openCreateModal(): void {

    this.isEditMode = false;

    this.editingProfileId = null;

    this.profileForm.reset({

        name: '',

        section_ids: []

    });

    const modalElement = document.getElementById('profileFormModal');

    if (modalElement) {

        new bootstrap.Modal(modalElement).show();

    }

  }

  viewProfile(profile: Profile): void {

    this.selectedProfile = profile;

    const modalElement = document.getElementById('profileDetailModal');

    if (modalElement) {

        new bootstrap.Modal(modalElement).show();

    }

  }

  editProfile(profile: Profile): void {

    this.isEditMode = true;

    this.editingProfileId = profile.id;

    this.profileForm.patchValue({

        name: profile.name,

        section_ids: [...profile.section_ids]

    });

    const modalElement = document.getElementById('profileFormModal');

    if (modalElement) {

        new bootstrap.Modal(modalElement).show();

    }

  }

  deleteProfile(profile: Profile): void {

    if (!confirm(`¿Eliminar el perfil ${profile.name}?`)) {

        return;

    }

    this.profilesService.deleteProfile(profile.id).subscribe({

        next: () => {

            alert('Perfil eliminado correctamente.');

            this.loadProfiles();

        },

        error: (error) => {

            console.error(error);

            alert('Ocurrió un error al eliminar el perfil.');

        }

    });

  }

  onSectionChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    const sectionId = input.value;

    const currentSections =
        this.profileForm.get('section_ids')?.value ?? [];

    if (input.checked) {

        this.profileForm.patchValue({

            section_ids: [...currentSections, sectionId]

        });

    } else {

        this.profileForm.patchValue({

            section_ids: currentSections.filter(
                id => id !== sectionId
            )

        });

    }

  }

  saveProfile(): void {

    if (this.isEditMode) {

        this.updateProfile();

    } else {

        this.createProfile();

    }

  }

  private createProfile(): void {

    if (this.profileForm.invalid) {

        alert('Completa los campos requeridos.');

        return;

    }

    const profile: Partial<Profile> = {

        name: this.profileForm.value.name ?? '',

        section_ids: this.profileForm.value.section_ids ?? []

    };

    this.profilesService.createProfile(profile).subscribe({

        next: () => {

            alert('Perfil creado correctamente.');

            this.loadProfiles();

            bootstrap.Modal
                .getInstance(
                    document.getElementById('profileFormModal')!
                )
                ?.hide();

        },

        error: (error) => {

            console.error(error);

            alert('Ocurrió un error al crear el perfil.');

        }

    });

  }

  private updateProfile(): void {

    if (this.profileForm.invalid) {

        alert('Completa los campos requeridos.');

        return;

    }

    const profile: Partial<Profile> = {

        name: this.profileForm.value.name ?? '',

        section_ids: this.profileForm.value.section_ids ?? []

    };

    this.profilesService
        .updateProfile(
            this.editingProfileId!,
            profile
        )
        .subscribe({

            next: () => {

                alert('Perfil actualizado correctamente.');

                this.loadProfiles();

                bootstrap.Modal
                    .getInstance(
                        document.getElementById('profileFormModal')!
                    )
                    ?.hide();

            },

            error: (error) => {

                console.error(error);

                alert('Ocurrió un error al actualizar el perfil.');

            }

        });

  }

}