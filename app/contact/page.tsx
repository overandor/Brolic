import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const contact = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@brolic.com",
      link: "mailto:hello@brolic.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "San Francisco, CA",
      link: null,
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
            Get in touch
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="border border-foreground/10 rounded-xl p-8">
            <h2 className="text-2xl font-display mb-6">Send a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30">
                  <option>General Inquiry</option>
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Partnership</option>
                  <option>Careers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <Button size="lg" className="w-full bg-foreground hover:bg-foreground/90 text-background">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-display mb-6">Contact information</h2>
            <div className="space-y-6 mb-12">
              {contact.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border border-foreground/10 rounded-xl p-6">
              <h3 className="font-display mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday - Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-foreground/10">
                <p className="text-sm text-muted-foreground">
                  Support is available 24/7 for Pro and Enterprise customers.
                </p>
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
