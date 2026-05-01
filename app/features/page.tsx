import { Button } from "@/components/ui/button";
import { Zap, Shield, Globe, Code, BarChart3, Users, Database, Clock } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Deployments",
      description: "Deploy your applications in under 30 seconds to 12 global regions. Zero configuration required.",
      details: [
        "Automatic CDN distribution",
        "Smart edge caching",
        "Instant rollbacks",
        "Preview deployments",
      ],
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption, SSO, and compliance certifications.",
      details: [
        "SOC 2 Type II certified",
        "GDPR compliant",
        "End-to-end encryption",
        "Advanced threat protection",
      ],
    },
    {
      icon: Globe,
      title: "Global Edge Network",
      description: "Your applications served from 200+ edge locations worldwide for minimal latency.",
      details: [
        "Automatic geo-routing",
        "DDoS protection",
        "Smart load balancing",
        "99.99% uptime SLA",
      ],
    },
    {
      icon: Code,
      title: "Developer Experience",
      description: "Built by developers, for developers. CLI, SDKs, and integrations that just work.",
      details: [
        "Powerful CLI",
        "REST API & SDKs",
        "Git integration",
        "Webhooks & events",
      ],
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Deep insights into your application performance with real-time monitoring and alerting.",
      details: [
        "Performance metrics",
        "Error tracking",
        "User analytics",
        "Custom dashboards",
      ],
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with role-based access, audit logs, and team management.",
      details: [
        "Role-based permissions",
        "Audit trails",
        "Team workspaces",
        "Comment & review",
      ],
    },
    {
      icon: Database,
      title: "Data & Storage",
      description: "Scalable databases and object storage with automatic backups and disaster recovery.",
      details: [
        "Managed databases",
        "Object storage",
        "Automatic backups",
        "Point-in-time recovery",
      ],
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock support with dedicated account managers for enterprise customers.",
      details: [
        "24/7 live chat",
        "Email support",
        "Phone support (Enterprise)",
        "Dedicated CSM (Enterprise)",
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
            Everything you need to ship
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A complete platform for building, deploying, and scaling modern applications. From local development to global scale.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="border border-foreground/10 rounded-xl p-6 hover:border-foreground/20 transition-colors"
              >
                <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-xs text-foreground/60 flex items-start gap-2"
                    >
                      <span className="w-1 h-1 bg-foreground/40 rounded-full mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-display mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of teams shipping faster with Brolic. Start free, scale infinitely.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
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
