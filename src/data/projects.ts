import { Project } from "@/types";

export const tagStyles: { [key: string]: string } = {
    AI: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    Hardware: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100",
    Research: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    Entrepreneurship: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    Software: "bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100",
    Academic: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
    Industry: "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100",
    "3D Design": "bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100",
};

export const projects: Project[] = [
    {
        title: "B.S. in Electrical Engineering",
        workimage: "/images/PUPR.jpeg",
        description: "Completed coursework, capstone project, and multiple research/startup initiatives at the same time.",
        status: "Completed — Graduated in 2025 with a 3.7 GPA",
        tags: ["Academic"],
        details: "Earned a B.S. in Electrical Engineering at the Polytechnic University of Puerto Rico. Focused on Communications, Signals & Control Systems. During my time there, I launched my first startup (Vienvo), led multiple projects, and collaborated on hardware/software research at PUPR, photonics research at UGA and DNA origami research at UC Berkeley.",
        date: "2020 – 2025",
        images: [
            {
                src: "/images/PUPR.jpeg",
                alt: "PUPR logo"
            },
            {
                src: "/images/Grad_Img.jpg",
                alt: "Graduation Photo"
            }
        ],
    },
    {
        title: "Capstone Project – Psyche Asteroid Regolith Processing",
        description: "Designed a metal extraction system for the Psyche asteroid using in-situ resource strategies.",
        date: "2024 – 2025",
        tags: ["Research", "3D Design", "Academic"],
        details: "Capstone project focused on enabling in-situ resource utilization (ISRU) for the Psyche asteroid. Investigated environmental conditions and regolith properties to design a system for extracting metals like iron, aluminum, and silicon. Explored analogs from lunar and Martian missions and proposed a vapor deposition-based build system for microgravity applications.",
        status: "Completed — Created the solution and CAD model of the capstone project",
        images: [
            {
                src: "/images/UGA_CapstoneLogos.png",
                alt: "Vienvo logo"
            },
            {
                src: "/images/3D_Print_Capstone.jpg",
                alt: "Prototype on desk",
                caption: "3D printed prototype of the regolith processing system"
            },
            {
                src: "/images/UGA_Capstone_Poster.png",
                alt: "Testing session with user",
                caption: "UGA Capstone project poster"
            }
        ],
    },
    {
        title: "Year 5 Research - UGA Photonics Project",
        description: "Photonic STDP neural circuit with machine learning.",
        status: "Completed - Built and tested the STDP response simulation circuit",
        tags: ["AI", "Research", "Academic"],
        details: "Designed and simulated a photonic circuit implementing spike-timing-dependent plasticity.",
        techStack: ["Python", "Machine Learning", "Photonics"],
        role: "Solo developer — handled all coding and circuit design",
        link: "https://wavelab.engr.uga.edu/",
        date: "2024",
        images: [
            {
                src: "/images/WaveLab.jpeg",
                alt: "WaveLab logo"
            },
            {
                src: "/images/STDP_SimCirc.png",
                alt: "Simulation circuit diagram",
                caption: "Simulation circuit diagram for photonic STDP"
            },
            {
                src: "/images/STDP_Depression.png",
                alt: "Depression curve",
                caption: "Depression curve for photonic STDP"
            },
            {
                src: "/images/STDP_Potentiation.png",
                alt: "Potentiation curve",
                caption: "Potentiation curve for photonic STDP"
            }
        ],
    },
    {
        title: "Vienvo - Cable Management Startup (www.vienvo.com)",
        description: "Cable management startup with hardware prototypes.",
        status: "Completed — Discontinued after contacting 500+ hypothesized clients — low customer urgency validated",
        tags: ["Entrepreneurship", "Hardware", "Software", "3D Design"],
        details: "Created a modular cable hub, conducted 500+ user interviews, and tested market demand. Shut down after validation phase. Webpage: www.vienvo.com",
        techStack: ["Arduino", "3D Printing", "Electronics Prototyping"],
        role: "Solo founder — handled all coding, prototyping, and business development",
        link: "https://www.vienvo.com",
        date: "2022 – 2024",
        video: "https://youtu.be/Q6_grfdx7ss",
        images: [
            {
                src: "/images/Vienvo_LogoT.png",
                alt: "Vienvo logo"
            },
            {
                src: "/images/VienvoHub_SideNoLidC2.png",
                alt: "Vienvo Hub Side View",
                caption: "Side view of the Vienvo modular hub without lid"
            }
        ],
    },
    {
        title: "Summer Research - UC Berkeley SUPERB Program",
        description: "DNA origami biosensor project for molecular detection.",
        status: "Completed — Realized the experiments and proved the attachment of fluorescent molecules to DNA origami",
        tags: ["Research", "Academic"],
        details: "Worked with Dr. Tikhomirov's lab on DNA origami and fluorescence-based molecule detection for biosensing applications.",
        techStack: ["Python", "Fluorescence Microscopy"],
        role: "Team member — contributed to experimental design and data analysis",
        link: "https://superb.berkeley.edu/",
        date: "2024",
        images: [
            {
                src: "/images/UC_Berkeley_Embleme.jpg",
                alt: "UC Berkeley logo"
            },
            {
                src: "/images/Berkeley_Poster.png",
                alt: "Research poster",
                caption: "Research poster for DNA origami biosensor project"
            },
        ],
    },
    {
        title: "Year 4 Research - Baby & Pet Heat Stroke Death Prevention System for Vehicles",
        description: "Sensor system to detect and alert if a baby is left in a hot car.",
        status: "Completed — Built the prototype circuit and a large part of the codebase",
        tags: ["Hardware", "Research", "Software", "Academic"],
        details: "Built an embedded system with heat/humidity sensors, microcontroller, and wireless alert features for infant safety.",
        techStack: ["Arduino", "Embedded Systems"],
        role: "Solo developer — handled all coding and prototyping",
        link: "https://www.youtube.com/watch?v=FDJzQJS0elk",
        date: "2023 – 2024",
        images: [
            {
                src: "/images/PUPR.jpeg",
                alt: "PUPR logo"
            },
            {
                src: "/images/PUPR_ResearchFinalCirc.jpg",
                alt: "PUPR Research Final Circuit",
                caption: "Complete prototype circuit for the heat stroke death prevention system"
            },
            {
                src: "/images/PUPR_ResearchPCB_Schematic.png",
                alt: "Prototype on desk",
                caption: "First hardware prototype of the modular hub"
            }
        ],
    },
    {
        title: "Quality Engineer Intern - Lutron Internship",
        description: "7-month quality engineering internship in automation.",
        status: "Completed — Built and tested a 100% analogous locking mechanism for a HIPOT testing machine",
        tags: ["Hardware", "Industry"],
        details: "Automated QA procedures for lighting control hardware and wrote test software for product validation.",
        techStack: ["Python", "Test Automation"],
        role: "Intern — assisted in automation and quality assurance",
        date: "2023 – 2024",
        images: [
            {
                src: "/images/LutronLogo.jpg",
                alt: "Lutron logo"
            },
            {
                src: "/images/Lutron_PCB3D_Top.png",
                alt: "3D PCB design",
                caption: "3D view of the PCB design for the locking mechanism"
            },
            {
                src: "/images/LutronPCB_Schematic.png",
                alt: "PCB schematic",
                caption: "Schematic view of the PCB design"
            }
        ]
    },
    {
        title: "NASA Competition Student Rocket Launch",
        description: "Built the payload system circuit for a student research rocket as part of a NASA launch competition.",
        status: "Completed — Built the rocket's payload sensor system circuit and software",
        tags: ["Hardware", "Software", "Academic"],
        details: "Collaborated on the NASA Student Launch Project at PUPR, contributing to the design and integration of electrical systems and telemetry for a research rocket. Focused on data acquisition, safety protocols, and launch readiness in a competitive engineering environment.",
        techStack: ["Arduino", "Embedded Systems"],
        role: "Team member — system design and integration",
        date: "2023 – 2024",
        images: [
            {
                src: "/images/NASA.png",
                alt: "NASA logo"
            },
            {
                src: "/images/NASA_PCB.png",
                alt: "PCB design",
                caption: "3D view of the PCB design for the rocket payload system"
            },
            {
                src: "/images/NASA_PCBWiring.png",
                alt: "PCB wiring",
                caption: "Wiring diagram for the PCB design"
            }
        ],
    },
    {
        title: "Knockout - Roblox Game",
        description: "Custom multiplayer experience with game logic scripting.",
        status: "Completed — Built the game and monetization features",
        tags: ["Software"],
        details: "Built a Roblox game focusing on multiplayer mechanics, using Lua for scripting and monetization features. Play at: https://www.roblox.com/games/5214994542/Knockout#!/game-instances",
        techStack: ["Lua", "Roblox Studio"],
        role: "Solo developer — handled all coding and asset design",
        link: "https://www.roblox.com/games/5214994542/Knockout#!/game-instances",
        date: "2020",
        images: [
            {
                src: "/images/Knockout_Logo.png",
                alt: "Vienvo logo"
            }
        ],
    },
];

export const tags = ["All", "AI", "Hardware", "Research", "Entrepreneurship", "Software", "Academic", "Industry", "3D Design"];

