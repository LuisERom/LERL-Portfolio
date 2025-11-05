import { Project } from "@/types";

export const groupProjectsByYear = (projects: Project[]): { [year: string]: Project[] } => {
    return projects.reduce((groups, project) => {
        const year = (project.date.split("–")[1] || project.date).trim();
        if (!groups[year]) groups[year] = [];
        groups[year].push(project);
        return groups;
    }, {} as { [year: string]: Project[] });
};

export const getSortedYears = (groupedProjects: { [year: string]: Project[] }): string[] => {
    return Object.keys(groupedProjects).sort((a, b) => b.localeCompare(a));
};

