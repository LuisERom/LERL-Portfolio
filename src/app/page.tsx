// src/app/page.tsx
'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import 'react-medium-image-zoom/dist/styles.css';

// DISABLED: Click wave effect is deactivated
// import ElectromagneticWave from "@/components/ElectromagneticWave";
import ProjectModal from "@/components/ProjectModal";
import TagFilter from "@/components/TagFilter";
import CurrentFocus from "@/components/CurrentFocus";
import ProjectList from "@/components/ProjectList";
import InterestsSection from "@/components/InterestsSection";
import { projects } from "@/data/projects";
import { groupProjectsByYear, getSortedYears } from "@/utils/projects";
import { Project } from "@/types";

export default function Home() {
  const [activeTag, setActiveTag] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImages, setLightboxImages] = useState<
    { src: string; description?: string }[]
  >([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [waveAnimation, setWaveAnimation] = useState(false);

  const filtered = activeTag === "All" ? projects : projects.filter(p => p.tags.includes(activeTag));
  const groupedProjects = groupProjectsByYear(filtered);
  const sortedYears = getSortedYears(groupedProjects);

  useEffect(() => {
    if (lightboxImages.length === 0) return;

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;

      const isSlide = target.classList.contains("yarl__slide");
      const isImage = target.closest(".yarl__slide_image");
      const isControl = target.closest(".yarl__toolbar, .yarl__button");

      if (isSlide && !isImage && !isControl) {
        setLightboxImages([]);
      }
    };

    const interval = setInterval(() => {
      const container = document.querySelector(".yarl__container");
      if (container) {
        container.addEventListener("click", handleClick);
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      const container = document.querySelector(".yarl__container");
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  }, [lightboxImages]);

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWaveAnimation(true);
      setTimeout(() => setWaveAnimation(false), 600);
    }, 3000);

    return () => clearInterval(waveInterval);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Electromagnetic Wave Effect */}
      {/* DISABLED: Click wave effect is deactivated */}
      {/* <ElectromagneticWave /> */}

      {/* Introduction and Interests Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 mb-8 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Introduction Section */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            Hi! I&apos;m Luis.
            <motion.span
              animate={{
                rotate: waveAnimation ? [0, 14, -8, 14, -8, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{ display: "inline-block", transformOrigin: "70% 70%" }}
            >
              👋
            </motion.span>
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Or LERL as short for Luis Enrique Román Lizasoain.
          </p>
        </div>

        {/* Interests Section */}
        <div className="flex-shrink-0 md:w-96">
          <InterestsSection />
        </div>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        Portfolio
      </motion.h1>

      <motion.p
        className="text-sm text-zinc-600 dark:text-zinc-400 mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        ⚙️ Hardware & Embedded Systems &nbsp;&nbsp;🧠 AI & Intelligent Systems &nbsp;&nbsp;🔬 Scientific Research & Innovation &nbsp;&nbsp;🚀 Product Building
      </motion.p>

      <CurrentFocus />

      <TagFilter activeTag={activeTag} onTagChange={setActiveTag} />

      <motion.h2
        className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-4 mt-12 uppercase tracking-wide"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Past Accomplishments
      </motion.h2>

      <ProjectList
        groupedProjects={groupedProjects}
        sortedYears={sortedYears}
        onProjectClick={setSelectedProject}
      />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          lightboxImages={lightboxImages}
          setLightboxImages={setLightboxImages}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
        />
      )}
    </div>
  );
}
