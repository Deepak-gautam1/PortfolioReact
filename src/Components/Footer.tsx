import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, Mail, ArrowUpRight, Code2 } from "lucide-react";
import { getPhoneDisplay } from "@/lib/contact";
import profile from "@/data/profile.json";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL = [
  { label: "GitHub", href: profile.contact.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.contact.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${profile.contact.email}`, icon: Mail },
];

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              DEEPAK GAUTAM
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Data Engineer at Americana Restaurants. Building production-grade loyalty systems, RAG
              pipelines, and AI-powered tools.
            </p>
            <div className="flex gap-2">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Get In Touch</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>📧 {profile.contact.email}</p>
              <p>📞 {getPhoneDisplay()}</p>
              <p>📍 {profile.location.city} (Open to remote)</p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Deepak Gautam. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Code2 className="w-3.5 h-3.5" />
            <span>Built with React · TypeScript · Tailwind · Framer Motion · Supabase</span>
          </div>
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-3">
          <a
            href="https://www.flaticon.com/free-icons/chatbot"
            title="chatbot icons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Chatbot icons created by littleicon - Flaticon
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
