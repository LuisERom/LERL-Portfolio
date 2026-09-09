/**
 * Homepage section titled “Current Focus”: highlighted current work (title, short blurb, tags).
 * Cards match Past Accomplishments: optional logo above the card, click opens ProjectModal.
 */
import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { tagStyles } from "@/data/projects";

const focuses: Project[] = [
    {
        title: "Job Searching",
        description: "Looking for forward deployed engineering and product engineering roles in NYC.",
        status: "Actively looking — NYC",
        tags: ["Industry"],
        details:
            "I am currently searching for forward deployed engineering and product engineering roles in New York City. I am looking for teams where I can work close to customers, ship product, and take technical problems from discovery through a shipped solution.",
        date: "2026 – Present",
    },
    {
        title: "AI-Powered Research Assistant",
        description: "Working on an early-stage project that brings together AI and life sciences.",
        status: "In progress",
        tags: ["Entrepreneurship", "Research", "AI"],
        details:
            "Building GnoRA Labs, an early-stage project that brings together AI and life sciences to help researchers work more effectively.",
        date: "2025 – Present",
        link: "https://www.gnoralabs.com/",
        images: [
            {
                src: "/images/GnoraLabs_Logo.png",
                alt: "GnoRA Labs logo",
            },
        ],
    },
];

interface CurrentFocusProps {
    onFocusClick: (project: Project) => void;
}

export default function CurrentFocus({ onFocusClick }: CurrentFocusProps) {
    return (
        <>
            <motion.h2
                className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-4 uppercase tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
                Current Focus
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 pt-14">
                {focuses.map((focus, index) => {
                    const logoImage = focus.images && focus.images.length > 0 ? focus.images[0] : null;

                    return (
                        <motion.div
                            key={focus.title}
                            className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 shadow-md border border-zinc-200 dark:border-zinc-700 relative cursor-pointer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -4, scale: 1.01 }}
                            viewport={{ once: true, amount: 0.1, margin: "-100px" }}
                            transition={{
                                opacity: { duration: 0.6, ease: "easeOut", delay: index * 0.1 },
                                y: { duration: 0.6, ease: "easeOut", delay: index * 0.1 },
                                scale: { duration: 0.15, ease: "easeOut" },
                                default: { duration: 0.15, ease: "easeOut" },
                            }}
                            onClick={() => onFocusClick(focus)}
                        >
                            {logoImage && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[85%] z-20">
                                    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2 shadow-lg border border-zinc-200 dark:border-zinc-700">
                                        <img
                                            src={logoImage.src}
                                            alt={String(logoImage.alt || "")}
                                            className="h-16 w-auto object-contain"
                                        />
                                    </div>
                                </div>
                            )}
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                                {focus.title}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-3">
                                {focus.description}
                            </p>
                            {focus.link && (
                                <a
                                    href={focus.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-3 inline-block"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {focus.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                                </a>
                            )}
                            <div className="mt-2 flex flex-wrap gap-1 text-xs">
                                {focus.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`px-2 py-0.5 rounded-full ${tagStyles[tag] || "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </>
    );
}
