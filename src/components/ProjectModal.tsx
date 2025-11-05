import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import { Project } from "@/types";

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
    lightboxImages: { src: string; description?: string }[];
    setLightboxImages: (images: { src: string; description?: string }[]) => void;
    lightboxIndex: number;
    setLightboxIndex: (index: number) => void;
}

export default function ProjectModal({
    project,
    onClose,
    lightboxImages,
    setLightboxImages,
    lightboxIndex,
    setLightboxIndex
}: ProjectModalProps) {
    return (
        <>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={() => {
                    onClose();
                    setLightboxImages([]);
                }}
            >
                <div
                    className="bg-white dark:bg-zinc-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* IMAGES PREVIEW (CLICK TO ENLARGE) */}
                    {project.images && (
                        <div className="flex flex-col items-center space-y-6 mb-6">
                            {project.images.map((image, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <img
                                        src={image.src}
                                        alt={String(image.alt || "")}
                                        className="max-w-full max-h-[500px] object-contain rounded-md shadow cursor-zoom-in"
                                        onClick={() => {
                                            setLightboxImages(
                                                project.images!.map((img) => ({
                                                    src: img.src,
                                                    description: img.caption || "",
                                                }))
                                            );
                                            setLightboxIndex(idx);
                                        }}
                                    />
                                    {image.caption && (
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 text-center">
                                            {image.caption}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {project.video && (
                        <div className="w-full aspect-video mb-6">
                            <iframe
                                src={project.video}
                                className="w-full h-full rounded-md shadow"
                                title="Project video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}

                    {/* TEXT CONTENT */}
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4">{project.details}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">{project.date}</p>

                    <button
                        onClick={onClose}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>

            {lightboxImages.length > 0 && (
                <Lightbox
                    open={true}
                    close={() => {
                        setLightboxImages([]);
                        setLightboxIndex(0);
                    }}
                    slides={lightboxImages}
                    index={lightboxIndex}
                    plugins={[Zoom, Captions]}
                    zoom={{
                        scrollToZoom: true,
                        maxZoomPixelRatio: 5,
                        zoomInMultiplier: 1.5,
                        doubleTapDelay: 300,
                    }}
                    controller={{
                        closeOnBackdropClick: true,
                    }}
                />
            )}
        </>
    );
}

