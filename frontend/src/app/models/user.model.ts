export interface User {

    _id: string;

    code: number;

    created_at: string;

    name: string;

    email: string;

    phone?: string;

    photo?: string;

    profile_ids: string[];

}