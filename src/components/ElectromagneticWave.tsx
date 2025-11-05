'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Wave {
    id: number;
    x: number;
    y: number;
    timestamp: number;
    isReflection?: boolean;
    parentWaveId?: number;
}


interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
}

const ElectromagneticWave = () => {
    const [waves, setWaves] = useState<Wave[]>([]);
    const [obstacles, setObstacles] = useState<Obstacle[]>([]);
    const waveIdRef = useRef(0);
    const wavesRef = useRef<Wave[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const processedCollisionsRef = useRef<Set<string>>(new Set());

    // Keep wavesRef in sync with waves state
    useEffect(() => {
        wavesRef.current = waves;
    }, [waves]);

    // Update obstacles when page content changes
    useEffect(() => {
        const updateObstacles = () => {
            const elements = document.querySelectorAll(
                'h1, h2, h3, h4, h5, h6, p, span, button, a, li, img, div[class*="text"], div[class*="project"]'
            );

            const newObstacles: Obstacle[] = [];
            elements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                // Only include visible elements
                if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
                    const elementId = element.id || `obs-${newObstacles.length}`;
                    if (!element.id) {
                        element.id = elementId;
                    }
                    newObstacles.push({
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height,
                        id: elementId,
                    });
                }
            });
            setObstacles(newObstacles);
        };

        updateObstacles();
        window.addEventListener('resize', updateObstacles);
        window.addEventListener('scroll', updateObstacles);

        // Update periodically for dynamic content
        const interval = setInterval(updateObstacles, 500);

        return () => {
            window.removeEventListener('resize', updateObstacles);
            window.removeEventListener('scroll', updateObstacles);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Don't trigger on button clicks or interactive elements to avoid conflicts
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('canvas')
            ) {
                return;
            }

            // Don't trigger when clicking inside project cards (the timeline cards)
            // Project cards have cursor-pointer and group classes and are inside timeline (border-l-2)
            let checkElement: HTMLElement | null = target;
            let isInsideCard = false;
            let clickedCard: HTMLElement | null = null;

            while (checkElement && checkElement !== document.body) {
                if (checkElement.classList.contains('cursor-pointer') &&
                    checkElement.classList.contains('group')) {
                    // Verify it's inside the timeline structure
                    if (checkElement.closest('[class*="border-l-2"]')) {
                        isInsideCard = true;
                        clickedCard = checkElement;
                        return;
                    }
                }
                checkElement = checkElement.parentElement;
            }

            // If clicking outside a card, check if exiting from top/bottom (block) or sides (allow)
            if (!isInsideCard) {
                const clickX = e.clientX;
                const clickY = e.clientY;
                const margin = 50; // Margin to detect "near" the card

                // Find all project cards (elements with both cursor-pointer and group classes in timeline)
                const allElements = document.querySelectorAll('[class*="cursor-pointer"]');
                const allCards: HTMLElement[] = [];

                allElements.forEach((el) => {
                    const element = el as HTMLElement;
                    if (element.classList.contains('cursor-pointer') &&
                        element.classList.contains('group') &&
                        element.closest('[class*="border-l-2"]')) {
                        allCards.push(element);
                    }
                });

                for (const card of allCards) {

                    const rect = card.getBoundingClientRect();

                    // Check if click is outside the card
                    const isOutsideCard =
                        clickX < rect.left ||
                        clickX > rect.right ||
                        clickY < rect.top ||
                        clickY > rect.bottom;

                    if (isOutsideCard) {
                        // Check if click is within horizontal bounds (left to right) but outside vertical bounds
                        // This means it's exiting from top or bottom
                        const withinHorizontalBounds = clickX >= rect.left - margin && clickX <= rect.right + margin;
                        const outsideVerticalBounds = clickY < rect.top || clickY > rect.bottom;

                        if (withinHorizontalBounds && outsideVerticalBounds) {
                            // Clicking out from top or bottom - block wave
                            return;
                        }
                    }
                }
            }

            // Don't trigger when clicking inside boxes, modals, or overlays
            let element: HTMLElement | null = target;
            while (element && element !== document.body) {
                const style = window.getComputedStyle(element);
                const zIndex = parseInt(style.zIndex, 10);
                const position = style.position;
                const isFixedOrAbsolute = position === 'fixed' || position === 'absolute';

                // Check if it's a modal/overlay/box (high z-index overlay element)
                if ((isFixedOrAbsolute && zIndex > 50) ||
                    element.classList.contains('modal') ||
                    element.classList.contains('overlay') ||
                    element.classList.contains('dialog') ||
                    element.classList.contains('yarl__container') ||
                    element.closest('.yarl__container') ||
                    element.closest('[class*="modal"]') ||
                    element.closest('[class*="overlay"]') ||
                    element.closest('[class*="dialog"]')) {
                    return;
                }

                element = element.parentElement;
            }

            const x = e.clientX;
            const y = e.clientY;
            const newWave: Wave = {
                id: waveIdRef.current++,
                x,
                y,
                timestamp: Date.now(),
            };
            setWaves((prev) => [...prev, newWave]);

            // Reset collision tracking for new wave
            processedCollisionsRef.current.clear();

            // Remove wave after animation
            setTimeout(() => {
                setWaves((prev) => prev.filter((w) => w.id !== newWave.id));
            }, 1500);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    // Draw waves with physics-based collision
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const currentWaves = wavesRef.current;
            const currentObstacles = obstacles;

            currentWaves.forEach((wave) => {
                const elapsed = Date.now() - wave.timestamp;
                const waveSpeed = 400; // pixels per second
                const maxRadius = 1000;
                const currentRadius = Math.min((elapsed / 1000) * waveSpeed, maxRadius);

                if (currentRadius <= 0) return;

                // Draw multiple concentric waves
                for (let ring = 0; ring < 3; ring++) {
                    const ringRadius = currentRadius - ring * 30;
                    const ringOpacity = Math.max(0, 0.8 - ring * 0.2 - elapsed / 1000);

                    if (ringRadius <= 0 || ringOpacity <= 0) continue;

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${ringOpacity})`;
                    ctx.lineWidth = 2;

                    // Draw wave with physics-based distortion
                    const segments = 120; // Number of segments for smooth circle
                    const distortionStrength = 0.4; // How much obstacles affect the wave
                    let pathStarted = false;

                    for (let i = 0; i <= segments; i++) {
                        const angle = (i / segments) * Math.PI * 2;
                        let radius = ringRadius;
                        let isBlocked = false;

                        // Calculate point on circle
                        let x = wave.x + Math.cos(angle) * radius;
                        let y = wave.y + Math.sin(angle) * radius;

                        // Check collision with obstacles
                        currentObstacles.forEach((obstacle) => {
                            const obstacleCenterX = obstacle.x + obstacle.width / 2;
                            const obstacleCenterY = obstacle.y + obstacle.height / 2;
                            const obstacleRadius = Math.max(obstacle.width, obstacle.height) / 2 + 10;

                            // Distance from wave center to obstacle center
                            const distToObstacle = Math.sqrt(
                                Math.pow(wave.x - obstacleCenterX, 2) +
                                Math.pow(wave.y - obstacleCenterY, 2)
                            );

                            // Distance from current point to obstacle center
                            const distFromPoint = Math.sqrt(
                                Math.pow(x - obstacleCenterX, 2) +
                                Math.pow(y - obstacleCenterY, 2)
                            );

                            // Calculate distance from wave center to obstacle edge
                            const distToObstacleEdge = distToObstacle - obstacleRadius;

                            // Check if wave has just reached the obstacle edge (within a small threshold)
                            const isJustHittingEdge = Math.abs(currentRadius - distToObstacleEdge) < 30 &&
                                distToObstacleEdge >= 0 &&
                                currentRadius >= distToObstacleEdge - 10;

                            // If wave has reached or passed the obstacle
                            if (distToObstacle <= currentRadius + obstacleRadius) {
                                // Check if this point is inside the obstacle
                                const isInsideObstacle =
                                    x >= obstacle.x - 5 &&
                                    x <= obstacle.x + obstacle.width + 5 &&
                                    y >= obstacle.y - 5 &&
                                    y <= obstacle.y + obstacle.height + 5;

                                if (isInsideObstacle) {
                                    // Point is blocked by obstacle
                                    isBlocked = true;
                                }

                                // Create reflection when wave first hits obstacle edge (only once per wave, only for larger obstacles)
                                if (!wave.isReflection && ring === 0 && isJustHittingEdge) {
                                    const collisionKey = `${wave.id}-reflection`;
                                    const obstacleSize = Math.max(obstacle.width, obstacle.height);

                                    // Only create reflection for larger obstacles and only one per wave
                                    if (!processedCollisionsRef.current.has(collisionKey) && obstacleSize > 50) {
                                        processedCollisionsRef.current.add(collisionKey);

                                        // Calculate exact collision point where wave touches obstacle edge
                                        const angleToObstacle = Math.atan2(
                                            obstacleCenterY - wave.y,
                                            obstacleCenterX - wave.x
                                        );

                                        // Find exact collision point on obstacle edge (where wave radius = distance to edge)
                                        const exactCollisionDist = distToObstacleEdge;
                                        const collisionX = wave.x + Math.cos(angleToObstacle) * exactCollisionDist;
                                        const collisionY = wave.y + Math.sin(angleToObstacle) * exactCollisionDist;

                                        // Create reflected wave that propagates outward from collision point
                                        const reflectionWave: Wave = {
                                            id: waveIdRef.current++,
                                            x: collisionX,
                                            y: collisionY,
                                            timestamp: Date.now(),
                                            isReflection: true,
                                            parentWaveId: wave.id,
                                        };

                                        setWaves((prev) => [...prev, reflectionWave]);

                                        // Remove reflection wave after animation
                                        setTimeout(() => {
                                            setWaves((prev) => prev.filter((w) => w.id !== reflectionWave.id));
                                        }, 1200);
                                    }
                                }

                                if (!isInsideObstacle && distFromPoint < obstacleRadius + 15) {
                                    // Point is near obstacle - distort the wave outward (wave bends around)
                                    const pushDistance = (obstacleRadius + 15 - distFromPoint) * distortionStrength;
                                    const pushAngle = Math.atan2(y - obstacleCenterY, x - obstacleCenterX);
                                    x += Math.cos(pushAngle) * pushDistance;
                                    y += Math.sin(pushAngle) * pushDistance;

                                    // Recalculate radius for this point
                                    const newDist = Math.sqrt(
                                        Math.pow(x - wave.x, 2) + Math.pow(y - wave.y, 2)
                                    );
                                    radius = newDist;
                                }
                            }
                        });

                        if (!isBlocked) {
                            if (!pathStarted) {
                                ctx.moveTo(x, y);
                                pathStarted = true;
                            } else {
                                ctx.lineTo(x, y);
                            }
                        } else {
                            // Gap in wave - end current path and start new one
                            if (pathStarted) {
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.strokeStyle = `rgba(59, 130, 246, ${ringOpacity})`;
                                ctx.lineWidth = 2;
                                pathStarted = false;
                            }
                        }
                    }

                    // Stroke remaining path
                    if (pathStarted) {
                        ctx.stroke();
                    }
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [waves, obstacles]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
        />
    );
};

export default ElectromagneticWave;
