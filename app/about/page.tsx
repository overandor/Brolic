import { Button } from "@/components/ui/button";
import { Target, Users, Award, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { icon: Globe, value: "200+", label: "Edge Locations" },
    { icon: Users, value: "50K+", label: "Active Developers" },
    { icon: Award, value: "99.99%", label: "Uptime SLA" },
    { icon: Target, value: "30s", label: "Avg Deploy Time" },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      bio: "Former engineering lead at Stripe. Passionate about developer experience.",
    },
    {
      name: "Marcus Webb",
      role: "CTO & Co-founder",
      bio: "Ex-Google infrastructure engineer. Built systems that scale to billions.",
    },
    {
      name: "Elena Rodriguez",
      role: "VP of Engineering",
      bio: "Led platform engineering at Meta. Expert in distributed systems.",
    },
    {
      name: "James Liu",
      role: "VP of Product",
      bio: "Product leader at Airbnb. Focused on shipping features that matter.",
    },
  ];

  const values = [
    {
      title: "Developer First",
      description: "Everything we build starts with the developer experience. If it's not delightful to use, we don't ship it.",
    },
    {
      title: "Speed & Reliability",
      description: "We believe you shouldn't have to choose between fast and reliable. Our platform delivers both.",
    },
    {
      title: "Transparency",
      description: "Open about our pricing, our technology, and our roadmap. No hidden fees, no surprises.",
    },
    {
      title: "Customer Success",
      description: "Your success is our success. We're obsessed with helping you ship faster and scale confidently.",
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
            About Brolic
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're on a mission to make deployment infrastructure invisible. So you can focus on what matters: building great products.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-24">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center border border-foreground/10 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-display mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-display mb-8 text-center">Our Mission</h2>
          <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-8 text-center">
            <p className="text-lg leading-relaxed">
              To democratize world-class infrastructure. Every developer, regardless of team size or budget, should have access to the same deployment platform that powers the world's largest companies. We're building the infrastructure layer that lets you move at the speed of thought.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-display mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="border border-foreground/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-display mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <h2 className="text-3xl font-display mb-8 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="border border-foreground/10 rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 bg-foreground/5 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-display text-foreground/60">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-medium mb-1">{member.name}</h3>
                <p className="text-sm text-foreground/60 mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-display mb-4">
            Join us
          </h2>
          <p className="text-muted-foreground mb-8">
            We're always looking for talented people who want to build the future of deployment infrastructure.
          </p>
          <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background">
            View Open Positions
          </Button>
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
