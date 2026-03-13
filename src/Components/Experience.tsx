// import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Calendar, MapPin, Building, TrendingUp, Zap } from "lucide-react";

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
            <div>
              <h3 className="text-2xl font-semibold">Americana Restaurants</h3>
              <p className="text-sm text-muted-foreground">KFC · Pizza Hut · Hardee's · TGI Fridays · Krispy Kreme — Middle East & North Africa</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* ── Full-Time Role ── */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <div>
                  <h4 className="text-xl font-semibold text-primary">
                    Data Engineer (Full-Time)
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">Loyalty & Digital Systems</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1 sm:mt-0">
                  <Calendar className="w-4 h-4" />
                  <span>July 2025 – Present</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>Mohali, Punjab</span>
              </div>

              <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold text-sm text-foreground">Peet's Coffee Loyalty Platform</span>
                  <span className="text-xs text-muted-foreground ml-2">Production system · 50,000+ daily active users</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">C#</Badge>
                <Badge variant="secondary">Azure Functions</Badge>
                <Badge variant="secondary">Zoho Creator</Badge>
                <Badge variant="secondary">REST APIs</Badge>
                <Badge variant="secondary">SQL Server</Badge>
              </div>

              <div className="space-y-3">
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Membership Workflows:</strong> Collaborated with cross-functional teams to engineer production backend services implementing tier upgrades and rule enforcement for <span className="text-foreground font-medium">50,000+ daily active users</span>.
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Earn–Burn Engine:</strong> Refactored the core engine with idempotent processing, tier multipliers, and automated expiry policies — processing high-volume transactions with <span className="text-foreground font-medium">zero downtime</span>.
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Database Architecture:</strong> Designed normalised schemas tracking earn, burn, and gain states, enabling automated reconciliation across distributed systems.
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Validation Pipeline:</strong> Built a cross-platform validation pipeline spanning Azure services and mobile applications, reducing duplicate transaction incidents by{" "}
                    <span className="text-foreground font-medium">99%</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b" />

            {/* ── Internship Role ── */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <div>
                  <h4 className="text-xl font-semibold text-primary">
                    Data Engineer (Intern)
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">Generative AI</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1 sm:mt-0">
                  <Calendar className="w-4 h-4" />
                  <span>Jan 2025 – June 2025</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>Mohali, Punjab</span>
              </div>

              <div className="bg-accent/5 border border-accent/15 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <span className="font-semibold text-sm text-foreground">Sales Deep Analyzer</span>
                  <span className="text-xs text-muted-foreground ml-2">RAG Pipeline · GPT-4o · Azure AI Search</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">GPT-4o</Badge>
                <Badge variant="secondary">Azure AI Search</Badge>
                <Badge variant="secondary">LangChain</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">SQL Server</Badge>
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">MongoDB</Badge>
              </div>

              <div className="space-y-3">
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>RAG Analytics Assistant:</strong> Architected a Retrieval-Augmented Generation pipeline that converts natural language into optimised dynamic SQL queries, removing SQL/Excel dependency for sales users.
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>End-to-End AI Pipeline:</strong> Integrated GPT-4o, Azure AI Search, and live SQL Server data to auto-generate real-time pivot tables and interactive dashboards for stakeholder reporting.
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Self-Service Features:</strong> Shipped Excel-to-Insight AI, voice input, and automated CSV exports — reducing manual reporting turnaround time by <span className="text-foreground font-medium">80%</span>.
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Achievement:</strong> Secured a Pre-Placement Offer (PPO) → Full-Time based on the direct business impact of solutions delivered.
                    </span>
                  </p>
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
