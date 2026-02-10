import type React from "react"
import { Search } from "lucide-react"
import Image from "next/image"

interface McpConnectivityIllustrationProps {
  className?: string
}

const McpConnectivityIllustration: React.FC<McpConnectivityIllustrationProps> = ({ className = "" }) => {
  // Integration data with new SVG paths
  const integrations = [
    { name: "Figma", icon: "/images/mcp-integrations/figma.svg", installed: true },
    { name: "Shadcn UI", icon: "/images/mcp-integrations/shadcn.svg" },
    { name: "Next.js", icon: "/images/mcp-integrations/nextjs.svg", installed: true },
    { name: "Tailwind CSS", icon: "/images/mcp-integrations/tailwind-css.svg" },
    { name: "Resend", icon: "/images/mcp-integrations/resend.svg", installed: true },
    { name: "React", icon: "/images/mcp-integrations/react.svg" },
  ]

  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 relative ${className}`}
      role="img"
      aria-label="MCP Connectivity component showcasing installed integrations list"
    >
      {/* Main Message Box */}
      <div
        className="absolute top-1/2 left-1/2 w-[345px] h-[277px] overflow-hidden rounded-[9.628px] border-[0.802px] border-border bg-gradient-to-b from-background to-transparent backdrop-blur-[16px] -translate-x-1/2 logo-transform"
      >
        <div className="flex flex-col h-full w-full">
          {/* Search Header */}
          <div className="flex items-center gap-[12.837px] px-[12.837px] py-[8.826px] border-b-[0.802px] border-border w-full box-border">
            <div className="w-[14.442px] h-[14.442px] relative flex-shrink-0">
              <Search className="w-full h-full text-muted-foreground" />
            </div>
            <span className="font-[family-name:var(--font-geist-sans)] text-[12.837px] leading-[19.256px] text-muted-foreground font-normal whitespace-nowrap">
              Search for servers
            </span>
          </div>
          {/* Integration List */}
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className={`flex items-center justify-between px-[12.837px] py-[8.826px] w-full box-border ${index < integrations.length - 1 ? "border-b-[0.479px] border-border" : ""
                }`}
            >
              <div className="flex items-center gap-[12.837px]">
                <div className="w-6 h-6 relative flex items-center justify-center flex-shrink-0">
                  <Image
                    src={integration.icon || "/placeholder.svg"}
                    alt={integration.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-contain opacity-70 grayscale" // Apply opacity and grayscale
                  />
                </div>
                <span className="font-[family-name:var(--font-geist-sans)] text-[12.837px] leading-[19.256px] text-muted-foreground font-normal whitespace-nowrap">
                  {integration.name}
                </span>
              </div>
              {integration.installed && (
                <div className="bg-primary/10 px-[5.272px] py-[1.318px] rounded-[3.295px] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-geist-sans)] text-[9.583px] leading-[15.333px] text-primary font-medium whitespace-nowrap">
                    Installed
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default McpConnectivityIllustration
