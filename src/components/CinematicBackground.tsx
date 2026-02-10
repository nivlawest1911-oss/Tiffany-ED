'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

export function CinematicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const { isSystemThinking } = useEdIntelVibe();

    // Particle count based on screen size
    const getParticleCount = () => {
        if (typeof window === 'undefined') return 100;
        const width = window.innerWidth;
        if (width >= 1920) return 150;
        if (width >= 1024) return 100;
        if (width >= 768) return 75;
        return 0; // No particles on mobile
    };

    // Initialize particles
    const initParticles = useCallback((width: number, height: number) => {
        const count = getParticleCount();
        const particles: Particle[] = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }

        particlesRef.current = particles;
    }, []);

    // Update particle positions
    const updateParticles = useCallback((width: number, height: number) => {
        // Boost speed if system is thinking
        const speedMultiplier = isSystemThinking ? 2.5 : 1;

        particlesRef.current.forEach(particle => {
            // Update position
            particle.x += particle.vx * speedMultiplier;
            particle.y += particle.vy * speedMultiplier;

            // Subtle attraction to mouse
            const dx = mouseRef.current.x - particle.x;
            const dy = mouseRef.current.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                particle.vx += dx * 0.00005 * speedMultiplier;
                particle.vy += dy * 0.00005 * speedMultiplier;
            }

            // Apply damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Boundary wrapping
            if (particle.x < 0) particle.x = width;
            if (particle.x > width) particle.x = 0;
            if (particle.y < 0) particle.y = height;
            if (particle.y > height) particle.y = 0;

            // Keep velocity in check
            const maxSpeed = isSystemThinking ? 4 : 2;
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > maxSpeed) {
                particle.vx = (particle.vx / speed) * maxSpeed;
                particle.vy = (particle.vy / speed) * maxSpeed;
            }
        });
    }, [isSystemThinking]);

    // Draw particles and connections
    const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        const particles = particlesRef.current;

        // Reactive Colors
        const baseColor = isSystemThinking ? '197, 164, 126' : '212, 175, 55'; // Noble Gold vs Royal Gold
        const lineOpacity = isSystemThinking ? 0.25 : 0.15;

        // Draw connections between nearby particles
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * lineOpacity;
                    ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, isSystemThinking ? particle.size * 1.5 : particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${baseColor}, ${particle.opacity})`;
            ctx.fill();

            // Add glow effect
            const glowSize = isSystemThinking ? particle.size * 6 : particle.size * 3;
            const glow = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, glowSize
            );
            glow.addColorStop(0, `rgba(${baseColor}, ${particle.opacity * 0.5})`);
            glow.addColorStop(1, `rgba(${baseColor}, 0)`);
            ctx.fillStyle = glow;
            ctx.fill();
        });
    }, [isSystemThinking]);

    // Animation loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        updateParticles(dimensions.width, dimensions.height);
        draw(ctx, dimensions.width, dimensions.height);

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [dimensions.width, dimensions.height, updateParticles, draw]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setDimensions({ width, height });

            if (canvasRef.current) {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
            }

            initParticles(width, height);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [initParticles]);

    // Handle mouse move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Start animation
    useEffect(() => {
        if (dimensions.width && dimensions.height) {
            animate();
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [dimensions, animate]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1810 100%)' }}
        />
    );
}
