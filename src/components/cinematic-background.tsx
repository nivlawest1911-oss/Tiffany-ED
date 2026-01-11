"use client"

import { useEffect, useRef } from "react"

export function CinematicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let w = (canvas.width = window.innerWidth)
        let h = (canvas.height = window.innerHeight)

        // Mouse tracking
        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const particles: Particle[] = []
        const particleCount = 100

        // Gradient Color Palette: Deep Space, Royal Gold, Emerald, Electric Blue
        const colors = ["#000000", "#1a1a2e", "#16213e", "#0f3460", "#d4af37", "#10b981", "#00d2ff"]

        class Particle {
            x: number
            y: number
            size: number
            baseX: number
            baseY: number
            density: number
            color: string
            alpha: number

            constructor() {
                this.x = Math.random() * w
                this.y = Math.random() * h
                this.baseX = this.x
                this.baseY = this.y
                this.density = (Math.random() * 30) + 1
                this.size = Math.random() * 3 + 0.5
                this.color = colors[Math.floor(Math.random() * colors.length)] || "#ffffff"
                this.alpha = Math.random() * 0.5 + 0.1
            }

            update() {
                // Mouse Physics Interaction
                const dx = mouseX - this.x
                const dy = mouseY - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const forceDirectionX = dx / distance
                const forceDirectionY = dy / distance
                const maxDistance = 300 // Interaction radius
                // Force is stronger when closer
                const force = (maxDistance - distance) / maxDistance

                // Calculate movement
                if (distance < maxDistance) {
                    // Move away from mouse
                    const directionX = forceDirectionX * force * this.density
                    const directionY = forceDirectionY * force * this.density
                    this.x -= directionX
                    this.y -= directionY
                } else {
                    // Return to base position
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX
                        this.x -= dx / 20
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY
                        this.y -= dy / 20
                    }
                }
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.globalAlpha = this.alpha
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.globalAlpha = 1 // Reset alpha
            }
        }

        const init = () => {
            particles.length = 0
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, w, h)

            // Cinematic Gradient Background
            const gradient = ctx.createLinearGradient(0, 0, w, h)
            gradient.addColorStop(0, "#050505") // Deep Black
            gradient.addColorStop(0.5, "#0a0f1c") // Dark Blue/Grey
            gradient.addColorStop(1, "#02040a") // Almost Black
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, w, h)

            // Dynamic Nebula Pulsing (Time-based animation)
            const time = Date.now() * 0.001

            // Nebula 1 (Teal/Emerald) - Floating
            ctx.globalAlpha = 0.03
            ctx.fillStyle = "#10b981"
            ctx.beginPath()
            ctx.arc(w * 0.2 + Math.sin(time) * 50, h * 0.3 + Math.cos(time) * 30, w * 0.4, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1

            // Nebula 2 (Royal Gold) - Floating
            ctx.globalAlpha = 0.02
            ctx.fillStyle = "#d4af37"
            ctx.beginPath()
            ctx.arc(w * 0.8 - Math.cos(time * 0.5) * 50, h * 0.7 + Math.sin(time * 0.5) * 40, w * 0.5, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1

            // Nebula 3 (Electric Blue) - Floating
            ctx.globalAlpha = 0.03
            ctx.fillStyle = "#00d2ff"
            ctx.beginPath()
            ctx.arc(w * 0.5 + Math.sin(time * 0.7) * 40, h * 0.5 - Math.cos(time * 0.8) * 40, w * 0.3, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1

            particles.forEach((particle) => {
                particle.update()
                particle.draw()
            })

            requestAnimationFrame(animate)
        }

        init()
        animate()

        const handleResize = () => {
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
            init()
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
        />
    )
}
