import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for individuals and small projects",
      features: [
        "5 deployments per month",
        "1GB storage",
        "Basic analytics",
        "Community support",
        "SSL certificates",
        "Custom domains (1)",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      description: "For growing teams and production workloads",
      features: [
        "Unlimited deployments",
        "50GB storage",
        "Advanced analytics",
        "Priority support",
        "SSL certificates",
        "Custom domains (10)",
        "Team collaboration (5 users)",
        "Environment variables",
        "Edge functions",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited everything",
        "Unlimited storage",
        "Custom analytics dashboard",
        "24/7 dedicated support",
        "SSO & SAML",
        "Unlimited custom domains",
        "Unlimited team members",
        "Advanced security",
        "SLA guarantees",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
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
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Start free, scale infinitely. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative border ${
                plan.popular
                  ? "border-foreground border-2"
                  : "border-foreground/10"
              } rounded-2xl p-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-display mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-display">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-foreground hover:bg-foreground/90 text-background"
                    : "bg-foreground/5 hover:bg-foreground/10"
                }`}
                size="lg"
                asChild
              >
                <Link href="/">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display mb-12 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "What happens if I exceed my limits?",
                a: "We'll notify you before you hit your limits. You can upgrade your plan or purchase additional resources.",
              },
              {
                q: "Is there a free trial for paid plans?",
                a: "Yes, all paid plans come with a 14-day free trial. No credit card required.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee for all paid plans.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-foreground/10 pb-6">
                <h3 className="text-lg font-medium mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
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
