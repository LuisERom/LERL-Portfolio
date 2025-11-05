export type Project = {
    title: string;
    description: string;
    status: string;
    tags: string[];
    details: string;
    date: string;
    techStack?: string[];
    images?: { src: string; alt: string; caption?: string }[];
    role?: string;
    link?: string;
    video?: string;
    workimage?: string;
};

