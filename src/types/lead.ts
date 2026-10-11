export type Lead = {
    id: number | string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    job: string;
};

export type LeadInput = {
    first_name: string;
    last_name: string;
    email: string;
    job?: string;
};