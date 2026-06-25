export interface Profile {

    id: string;

    code: number;

    name: string;

    created_at: string;

    section_ids: string[];

    sections: {

        id: string;

        name: string;

    }[];

}