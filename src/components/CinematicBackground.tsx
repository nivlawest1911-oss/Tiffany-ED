'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

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
    const updateParticles = (width: number, height: number) => {
        particlesRef.current.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Subtle attraction to mouse
            const dx = mouseRef.current.x - particle.x;
            const dy = mouseRef.current.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                particle.vx += dx * 0.00005;
                particle.vy += dy * 0.00005;
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
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 2) {
                particle.vx = (particle.vx / speed) * 2;
                particle.vy = (particle.vy / speed) * 2;
            }
        });
    };

    // Draw particles and connections
    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        const particles = particlesRef.current;

        // Draw connections between nearby particles
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)'; // Royal Gold
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
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
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`;
            ctx.fill();

            // Add glow effect
            const glow = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 3
            );
            glow.addColorStop(0, `rgba(212, 175, 55, ${particle.opacity * 0.5})`);
            glow.addColorStop(1, 'rgba(212, 175, 55, 0)');
            ctx.fillStyle = glow;
            ctx.fill();
        });
    };

    // Animation loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        updateParticles(dimensions.width, dimensions.height);
        draw(ctx, dimensions.width, dimensions.height);

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [dimensions.width, dimensions.height]);

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
