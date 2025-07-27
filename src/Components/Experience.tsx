// import React from "react";
import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Calendar, MapPin, Building, TrendingUp } from "lucide-react";

const Experience = () => {
  return (
    <section className="py-20 px-4 bg-muted" id="experience">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            My professional journey and key accomplishments.
          </p>
        </div>

        <Card className="p-8 bg-background border shadow-lg">
          {/* Company Header */}
          <div className="flex items-center gap-4 mb-6">
            <Building className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-semibold text-foreground/bright">
              Americana Restaurants
            </h3>
          </div>

          <div className="space-y-8">
            {/* Full-Time Role */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h4 className="text-xl font-semibold text-primary">
                  Data Engineer (Full-Time)
                </h4>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>July 2025 - Present</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>Mohali, Punjab</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Continuing to enhance and scale AI-powered analytics tools and
                  data pipelines based on the success of the internship project.
                </li>
                <li>
                  Developing new features for business intelligence platforms to
                  drive data-informed decisions across the organization.
                </li>
              </ul>
            </div>

            {/* Divider */}
            <div className="border-b"></div>

            {/* Internship Role */}

            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h4 className="text-xl font-semibold text-primary">
                  Data Engineer (Intern)
                </h4>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Jan 2025 - June 2025</span>
                </div>
              </div>

              <div className="mt-4 pl-2">
                <h5 className="font-semibold text-md mb-2 text-foreground/bright">
                  Key Project: Sales Deep Analyzer
                </h5>
                <p className="text-muted-foreground text-sm mb-3">
                  Led the development of a GPT-4o-powered chatbot using prompt
                  engineering and Azure AI Search to generate dynamic SQL
                  queries from natural language.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">GPT-4o</Badge>
                  <Badge variant="secondary">Azure AI Search</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">SQL Server</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">Plotly.js</Badge>
                </div>

                <div className="space-y-3">
                  <div className="border-l-2 border-primary pl-4">
                    <p className="text-muted-foreground text-sm">
                      <strong>Dynamic SQL Generation:</strong> Eliminated the
                      need for SQL/Excel knowledge among sales users by
                      developing advanced prompt engineering techniques.
                    </p>
                  </div>

                  <div className="border-l-2 border-accent pl-4">
                    <p className="text-muted-foreground text-sm">
                      <strong>Analytics Pipeline:</strong> Engineered an
                      end-to-end AI pipeline to automatically generate
                      interactive dashboards from live data.
                    </p>
                  </div>

                  <div className="border-l-2 border-primary pl-4">
                    <p className="text-muted-foreground text-sm">
                      <strong>Business Intelligence Tools:</strong> Built
                      self-service features, improving decision-making speed by
                      80%.
                    </p>
                  </div>

                  <div className="">
                    <p className="text-muted-foreground text-sm flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Achievement:</strong> Secured a Full-Time Offer
                        (PPO) based on the high business impact of the solutions
                        delivered.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Experience;
