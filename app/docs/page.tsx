import { Button } from "@/components/ui/button";
import { Book, Code2, Terminal, Rocket, FileText, Video } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      icon: Rocket,
      links: [
        { title: "Quick Start", href: "#quick-start" },
        { title: "Installation", href: "#installation" },
        { title: "First Deployment", href: "#first-deployment" },
        { title: "Configuration", href: "#configuration" },
      ],
    },
    {
      title: "Core Concepts",
      icon: Book,
      links: [
        { title: "Projects & Apps", href: "#projects" },
        { title: "Environments", href: "#environments" },
        { title: "Deployments", href: "#deployments" },
        { title: "Domains", href: "#domains" },
      ],
    },
    {
      title: "API Reference",
      icon: Code2,
      links: [
        { title: "REST API", href: "#rest-api" },
        { title: "SDKs", href: "#sdks" },
        { title: "Webhooks", href: "#webhooks" },
        { title: "Rate Limits", href: "#rate-limits" },
      ],
    },
    {
      title: "CLI Reference",
      icon: Terminal,
      links: [
        { title: "Installation", href: "#cli-install" },
        { title: "Commands", href: "#cli-commands" },
        { title: "Configuration", href: "#cli-config" },
        { title: "Troubleshooting", href: "#cli-troubleshoot" },
      ],
    },
    {
      title: "Guides",
      icon: FileText,
      links: [
        { title: "Framework Guides", href: "#frameworks" },
        { title: "Database Setup", href: "#databases" },
        { title: "CI/CD Integration", href: "#cicd" },
        { title: "Security Best Practices", href: "#security" },
      ],
    },
    {
      title: "Resources",
      icon: Video,
      links: [
        { title: "Video Tutorials", href: "#videos" },
        { title: "Blog Posts", href: "#blog" },
        { title: "Community", href: "#community" },
        { title: "Changelog", href: "#changelog" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl tracking-tight">Brolic</span>
            <span className="text-xs text-muted-foreground font-mono">TM</span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-6 leading-[1.1]">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Everything you need to know about Brolic. From quick start guides to advanced API references.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="search"
              placeholder="Search documentation..."
              className="w-full px-6 py-4 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 text-foreground placeholder:text-foreground/40"
            />
          </div>
        </div>

        {/* Documentation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="border border-foreground/10 rounded-xl p-6 hover:border-foreground/20 transition-colors"
              >
                <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Quick Start Preview */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-display mb-8 text-center">
            Quick Start
          </h2>
          <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">1. Install the CLI</h3>
                <code className="block bg-background px-4 py-3 rounded text-sm font-mono">
                  npm install -g @brolic/cli
                </code>
              </div>
              <div>
                <h3 className="font-medium mb-2">2. Login to Brolic</h3>
                <code className="block bg-background px-4 py-3 rounded text-sm font-mono">
                  brolic login
                </code>
              </div>
              <div>
                <h3 className="font-medium mb-2">3. Deploy your project</h3>
                <code className="block bg-background px-4 py-3 rounded text-sm font-mono">
                  brolic deploy
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-foreground/10 mt-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            2025 Brolic. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
