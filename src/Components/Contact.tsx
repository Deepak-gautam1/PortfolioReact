import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Send, LinkedinIcon, GithubIcon, Mail, Phone, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import MagneticButton from "@/Components/MagneticButton";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "deepakgautam2647@gmail.com", href: "mailto:deepakgautam2647@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9599171623", href: "tel:+919599171623" },
  { icon: MapPin, label: "Location", value: "New Delhi · Open to remote", href: null },
];

const SOCIALS = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/Deepak-gautam1" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/deepak-a77b93222/" },
  { icon: Mail, label: "Email", href: "mailto:deepakgautam2647@gmail.com" },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("messages").insert([formData]);

    if (error) {
      console.error("Supabase error:", error);
      toast.error("Something went wrong. Please email me directly.");
    } else {
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 px-4 bg-muted/50" id="contact">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Open to full-time roles, freelance projects, and interesting collaborations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT — contact info + socials */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 bg-background border shadow-sm">
                <h3 className="text-lg font-semibold mb-5">Contact Information</h3>
                <div className="space-y-4">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-foreground">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 bg-background border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
                <div className="flex gap-3">
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <MagneticButton key={label} strength={0.4}>
                      <motion.a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    </MagneticButton>
                  ))}
                </div>

                {/* Availability badge */}
                <div className="mt-5 pt-4 border-t border-border">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-medium text-accent">Available for opportunities</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 bg-background border shadow-sm overflow-hidden">
              <AnimatePresence mode="wait">
                {sent ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-20 h-20 text-accent" strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Message sent!</h3>
                      <p className="text-muted-foreground max-w-sm">
                        Thanks for reaching out. I'll get back to you within 24 hours.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setSent(false)}>
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="text-sm font-medium mb-1.5 block">Your Name</label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Deepak Gautam" required />
                        </div>
                        <div>
                          <label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email Address</label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="text-sm font-medium mb-1.5 block">Subject</label>
                        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Job opportunity, project collab, etc." required />
                      </div>
                      <div>
                        <label htmlFor="message" className="text-sm font-medium mb-1.5 block">Message</label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about the opportunity or project..." rows={6} required />
                      </div>

                      <MagneticButton style={{ width: "100%" }}>
                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </MagneticButton>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
