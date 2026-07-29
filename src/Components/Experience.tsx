import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Calendar, MapPin, Building, TrendingUp, Zap } from "lucide-react";
import profile from "@/data/profile.json";

const Experience = () => {
  return (
    <section className="py-20 px-4 bg-muted" id="experience">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
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
              <h3 className="text-2xl font-semibold">{profile.currentRole.company}</h3>
              <p className="text-sm text-muted-foreground">
                {profile.currentRole.brands.join(" · ")} — {profile.currentRole.region}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* ── Full-Time Role ── */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <div>
                  <h4 className="text-xl font-semibold text-primary">
                    {profile.currentRole.title} ({profile.currentRole.type})
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    {profile.currentRole.focus}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1 sm:mt-0">
                  <Calendar className="w-4 h-4" />
                  <span>{profile.currentRole.period}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{profile.location.city}</span>
              </div>

              <div className="bg-accent/5 border border-accent/15 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <span className="font-semibold text-sm text-foreground">Mail Assistant</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    AI Automation · Outlook · Azure OpenAI
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Azure OpenAI</Badge>
                <Badge variant="secondary">Microsoft Graph API</Badge>
                <Badge variant="secondary">Outlook</Badge>
                <Badge variant="secondary">FastAPI</Badge>
              </div>

              <div className="space-y-3 mb-6">
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>AI Mail Workflow:</strong> Built an internal mail assistant to classify
                    incoming requests, summarize context, and prepare response drafts for repetitive
                    operational communication.
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Human-in-the-Loop Review:</strong> Designed the assistant around
                    controlled prompts and review-first workflows, keeping final communication
                    approval with the business user.
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold text-sm text-foreground">
                    Peet's Coffee Loyalty Platform
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Production system · 50,000+ daily active users
                  </span>
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
                    <strong>Membership Workflows:</strong> Collaborated with cross-functional teams
                    to engineer production backend services implementing tier upgrades and rule
                    enforcement for{" "}
                    <span className="text-foreground font-medium">50,000+ daily active users</span>.
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Earn–Burn Engine:</strong> Refactored the core engine with idempotent
                    processing, tier multipliers, and automated expiry policies — processing
                    high-volume transactions with{" "}
                    <span className="text-foreground font-medium">zero downtime</span>.
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Database Architecture:</strong> Designed normalised schemas tracking
                    earn, burn, and gain states, enabling automated reconciliation across
                    distributed systems.
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Validation Pipeline:</strong> Built a cross-platform validation pipeline
                    spanning Azure services and mobile applications, reducing duplicate transaction
                    incidents by <span className="text-foreground font-medium">99%</span>.
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
                    {profile.priorRole.title} ({profile.priorRole.type})
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    {profile.priorRole.focus}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1 sm:mt-0">
                  <Calendar className="w-4 h-4" />
                  <span>{profile.priorRole.period}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{profile.location.city}</span>
              </div>

              <div className="bg-accent/5 border border-accent/15 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <span className="font-semibold text-sm text-foreground">Sales Analyst</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Agentic AI - GPT-4o - Azure SQL
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">FastAPI</Badge>
                <Badge variant="secondary">GPT-4o</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Azure SQL</Badge>
                <Badge variant="secondary">Convex</Badge>
                <Badge variant="secondary">Plotly</Badge>
              </div>

              <div className="space-y-3">
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Agentic Analytics Platform:</strong> Architected Sales Analyst to
                    convert natural language business questions into validated SQL queries, removing
                    SQL/Excel dependency for sales users.
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>End-to-End AI Pipeline:</strong> Integrated Schema RAG, GPT-4o, FastAPI,
                    and Azure SQL to retrieve relevant tables, validate generated queries, execute
                    safely, and stream results to the frontend.
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Self-Service Features:</strong> Shipped interactive pivot tables, Plotly
                    charts, AI-generated insights, and conversation memory through Convex-backed
                    chat sessions.
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Achievement:</strong> {profile.priorRole.outcome}
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
