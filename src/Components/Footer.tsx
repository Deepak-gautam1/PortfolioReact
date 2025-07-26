// import React from "react";
import { Button } from "@/Components/ui/button";
import { GithubIcon, LinkedinIcon, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright Notice */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Deepak Gautam. All Rights Reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="icon">
              <a
                href="https://github.com/Deepak-gautam1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a
                href="https://www.linkedin.com/in/deepak-a77b93222/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a href="mailto:kd7540520@gmail.com" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
