import { Project } from "@/types";

// Parse end date from date string and return as Date object for comparison
const parseEndDate = (dateStr: string): Date => {
    // Handle formats like "Aug 2024 - Dec 2024" or "Aug 2024 – Dec 2024" (different dashes)
    const parts = dateStr.split(/[-–]/).map(s => s.trim());
    const endDateStr = parts.length > 1 ? parts[1] : parts[0];
    
    // Parse "Month YYYY" format (e.g., "Dec 2024")
    const monthNames: { [key: string]: number } = {
        "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
        "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
    };
    
    const match = endDateStr.match(/([A-Za-z]+)\s+(\d{4})/);
    if (match) {
        const monthKey = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
        const month = monthNames[monthKey] !== undefined ? monthNames[monthKey] : monthNames[match[1]];
        const year = parseInt(match[2]);
        return new Date(year, month !== undefined ? month : 0);
    }
    
    // Fallback: try to extract year only
    const yearMatch = endDateStr.match(/(\d{4})/);
    if (yearMatch) {
        return new Date(parseInt(yearMatch[1]), 11, 31); // End of year
    }
    
    // Ultimate fallback
    return new Date(0);
};

// Sort projects by end date (most recent first)
export const sortProjectsByEndDate = (projects: Project[]): Project[] => {
    return [...projects].sort((a, b) => {
        const dateA = parseEndDate(a.date);
        const dateB = parseEndDate(b.date);
        return dateB.getTime() - dateA.getTime(); // Most recent first
    });
};

export const groupProjectsByYear = (projects: Project[]): { [year: string]: Project[] } => {
    // First sort by end date
    const sortedProjects = sortProjectsByEndDate(projects);
    
    const grouped = sortedProjects.reduce((groups, project) => {
        // Extract year from end date
        const parts = project.date.split(/[-–]/).map(s => s.trim());
        const endDateStr = parts.length > 1 ? parts[1] : parts[0];
        const yearMatch = endDateStr.match(/(\d{4})/);
        const year = yearMatch ? yearMatch[1] : project.date;
        
        if (!groups[year]) groups[year] = [];
        groups[year].push(project);
        return groups;
    }, {} as { [year: string]: Project[] });
    
    // Sort projects within each year group by end date (most recent first)
    Object.keys(grouped).forEach(year => {
        grouped[year] = sortProjectsByEndDate(grouped[year]);
    });
    
    return grouped;
};

export const getSortedYears = (groupedProjects: { [year: string]: Project[] }): string[] => {
    return Object.keys(groupedProjects).sort((a, b) => {
        // Sort years numerically (most recent first)
        const yearA = parseInt(a);
        const yearB = parseInt(b);
        if (!isNaN(yearA) && !isNaN(yearB)) {
            return yearB - yearA;
        }
        // Fallback to string comparison
        return b.localeCompare(a);
    });
};

