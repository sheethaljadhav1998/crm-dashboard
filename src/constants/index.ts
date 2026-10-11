export const REQRES_BASE_URL = process.env.REQRES_BASE_URL;
export const AVATAR_BASE_URL = process.env.NEXT_PUBLIC_AVATAR_BASE_URL;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
export const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_REQRES_API_KEY;
export const USERS_API = `${API_BASE_URL}/users`;

export const APP_NAME = "CRM Lead Management Dashboard";
export const APP_DESCRIPTION = "Track and manage your sales leads.";

export const LEADS_QUERY_KEY = ["leads"];

export const NAME_MAX_LENGTH = 50;
export const JOB_MAX_LENGTH = 80;

export const NO_JOB = "Not specified";

export const EMPTY_LEAD_FORM = { first_name: "", last_name: "", email: "", job: "" };

export const JOB_TITLES = [
    "Sales Manager",
    "Account Executive",
    "Marketing Lead",
    "Product Owner",
    "Business Analyst",
    "Customer Success",
    "Software Engineer",
    "Designer",
    "Operations Manager",
    "CEO / Founder",
];

export const SKELETON_COUNT = 8;
