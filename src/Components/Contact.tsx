// import React from "react";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  GithubIcon,
  LinkedinIcon,
} from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-4" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Let's discuss opportunities and collaborate on exciting projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <Card className="p-4 bg-gradient-card border-0 shadow-card">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:kd754052004@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        kd754052004@gmail.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-card border-0 shadow-card">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:9599171623"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        +91 9599171623
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-card border-0 shadow-card">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">
                        West Delhi, New Delhi
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                {/* GitHub Link */}
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="hover:shadow-glow"
                >
                  <a
                    href="https://github.com/Deepak-gautam1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                </Button>

                {/* LinkedIn Link */}
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="hover:shadow-glow"
                >
                  <a
                    href="https://www.linkedin.com/in/Deepak-gautam1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                </Button>

                {/* Mail Link */}
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="hover:shadow-glow"
                >
                  <a href="mailto:kd7540520@gmail.com">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
              <h4 className="font-semibold mb-2">Looking For Opportunities</h4>
              <p className="text-muted-foreground text-sm">
                I'm actively seeking full-time opportunities in Data
                Engineering, Machine Learning, and Full Stack Development. Open
                to remote work and relocation for the right opportunity.
              </p>
            </div>
          </div>

          <Card className="p-8 bg-gradient-card border-0 shadow-card">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email
                  </label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <Input placeholder="Project collaboration, job opportunity, etc." />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Message
                </label>
                <Textarea
                  placeholder="Tell me about your project or opportunity..."
                  rows={6}
                />
              </div>

              <Button className="w-full">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
