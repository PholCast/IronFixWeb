export interface User {
    username: string;
    email: string;
    password: string;
    role:string;
    fullname: string;
    company: string;
    phone: string | null;
    jobTitle: string | null
  }