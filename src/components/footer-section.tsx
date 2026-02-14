"use client"

import Link from "next/link"
import { Twitter, Github, Linkedin } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <div className="text-center text-foreground text-xl font-semibold leading-4">EdIntel</div>
        </div>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">Administrative Intelligence for Educators</p>
        <div className="flex justify-start items-start gap-3">
          <a href="https://twitter.com/EdIntelAI" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-4 h-4 flex items-center justify-center">
            <Twitter className="w-full h-full text-muted-foreground" />
          </a>
          <a href="https://github.com/nivlawest1911-oss" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-4 h-4 flex items-center justify-center">
            <Github className="w-full h-full text-muted-foreground" />
          </a>
          <a href="https://www.linkedin.com/in/dr-alvin-west-ii-dba-pd-m-58133519/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-4 h-4 flex items-center justify-center">
            <Linkedin className="w-full h-full text-muted-foreground" />
          </a>
        </div>
      </div>
      {/* Right Section: Product, Company, Resources */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto">
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Product</h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <Link href="/features" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Features
            </Link>
            <Link href="/pricing" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Pricing
            </Link>
            <Link href="/connectors" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Integrations
            </Link>
            <Link href="/all-tools" className="text-foreground text-sm font-normal leading-5 hover:underline">
              AI Super-Tools
            </Link>
            <Link href="/edintel-professional" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Professional Center
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Company</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <Link href="/about" className="text-foreground text-sm font-normal leading-5 hover:underline">
              About Us
            </Link>
            <Link href="/mission" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Our Mission
            </Link>
            <Link href="/whats-edintel" className="text-foreground text-sm font-normal leading-5 hover:underline">
              What&apos;s EdIntel
            </Link>
            <Link href="/enterprise" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Enterprise
            </Link>
            <Link href="/contact" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Resources</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <Link href="/terms" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Terms of Use
            </Link>
            <Link href="/privacy" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/ferpa" className="text-foreground text-sm font-normal leading-5 hover:underline">
              FERPA Compliance
            </Link>
            <Link href="/resources/alabama" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Alabama Resources
            </Link>
            <Link href="/support" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
