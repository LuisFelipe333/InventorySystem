import { Profile } from './profile.model';

export interface User {

    id: string;

    code: number;

    created_at: string;

    name: string;

    email: string;

    phone?: string;

    photo?: string;

    profile_ids: string[];

    profiles: Profile[];

}