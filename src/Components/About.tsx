// import React from "react";
import { Card } from "@/Components/ui/card";
import { GraduationCap, MapPin } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            As a Computer Engineering graduate from NIT Kurukshetra, I thrive on
            turning complex ideas into clean, functional, and user-friendly
            products. My expertise lies at the intersection of Generative AI,
            data engineering, and full-stack development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Education & Location */}
          <div className="space-y-6">
            <Card className="p-6 bg-background border shadow-lg">
              <div className="flex items-start gap-4">
                <GraduationCap className="w-8 h-8 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground/bright">
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground/bright">
                        National Institute of Technology, Kurukshetra
                      </h4>
                      <p className="text-muted-foreground">
                        B. Tech in Computer Engineering
                      </p>
                      <p className="text-sm text-muted-foreground">
                        CGPA: 8.14/10 | Graduated May 2025
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground/bright">
                        School of Excellence, Dwarka Sec 22
                      </h4>
                      <p className="text-muted-foreground">
                        Central Board of Secondary Education
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Percentage: 95.2% | 2019 - 2020
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background border shadow-lg">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-accent mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground/bright">
                    Location
                  </h3>
                  <p className="text-muted-foreground">
                    Currently working in Mohali, Punjab.
                    <br />
                    Originally from West Delhi, New Delhi.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Narrative & Skills */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              With a foundation in competitive programming—achieving notable
              rankings on platforms like Codechef, Codeforces, and LeetCode—I've
              honed my ability to architect efficient and scalable solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I now apply these skills as a full-time Data Engineer at Americana
              Restaurants. My role involves developing AI-powered analytics
              tools using cutting-edge technologies like GPT-4o and Azure AI
              Search. I build dynamic SQL query systems and enhance business
              intelligence pipelines, directly blending my passion for data with
              my drive to create solutions that deliver tangible impact.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Data Engineering
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                Machine Learning
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Full Stack Development
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                Competitive Programming
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
