// import React from "react";
import { Button } from "@/Components/ui/button";
import { Download, GithubIcon, LinkedinIcon, Mail, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-hero-title bg-clip-text text-transparent">
              DEEPAK GAUTAM
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
              Software Engineer & AI Developer
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg">
              A developer and AI enthusiast with a B.Tech in Computer
              Engineering from NIT Kurukshetra. I build smart, scalable
              solutions—from GPT-4o-based analytics bots to seamless e-commerce
              platforms—that turn complex ideas into clean, user-friendly
              products.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="group">
              <a href="/Deepak-Resume.pdf" download="Deepak-Resume.pdf">
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Contact Me
            </Button>
          </div>

          <div className="flex gap-6">
            <a
              href="mailto:deepakgautam2647@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="tel:9599171623"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/deepak-a77b93222/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Deepak-gautam1"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-primary to-accent p-1">
              <img
                src="/images/profile.jpg"
                alt="A photograph of Deepak Gautam"
                className="w-full h-full rounded-full object-contain"
              />
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
