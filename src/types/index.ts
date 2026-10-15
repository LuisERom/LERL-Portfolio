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
    video?: string; // local file (/videos/x.mp4) or embed URL (e.g. YouTube /embed/ link)
    videoPoster?: string; // optional still frame shown before a local video plays
    workimage?: string;
    institution?: string; // Manual institution/university information
};

