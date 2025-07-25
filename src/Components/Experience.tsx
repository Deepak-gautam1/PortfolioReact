import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

const Experience = () => {
  return (
    <section className="py-20 px-4 bg-muted/60" id="experience">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            My professional journey and key accomplishments
          </p>
        </div>

        <Card className="p-8 bg-gradient-card border-0 shadow-card">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">Americana Restaurants</h3>
              </div>
              <h4 className="text-xl font-semibold text-accent mb-2">
                Data Engineer Intern
              </h4>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <span>Jan 2025 - June 2025</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Generative AI</span>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div>
                <h5 className="font-semibold text-lg mb-3">
                  Sales Deep Analyzer
                </h5>
                <p className="text-muted-foreground mb-4">
                  Leading the development of a GPT-4o-powered chatbot using
                  prompt engineering and Azure AI Search to generate dynamic SQL
                  queries from natural language.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">GPT-4o</Badge>
                  <Badge variant="secondary">Azure AI Search</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">SQL Server</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-muted-foreground">
                    <strong>Dynamic SQL Generation:</strong> Developed prompt
                    engineering techniques to generate dynamic SQL queries,
                    eliminating the need for SQL/Excel knowledge among sales
                    users.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <p className="text-muted-foreground">
                    <strong>Analytics Pipeline:</strong> Engineered end-to-end
                    AI analytics pipeline using GPT-4o, Azure AI Search, and
                    Plotly.js to generate dynamic pivot tables and interactive
                    visualizations.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="text-muted-foreground">
                    <strong>Business Intelligence:</strong> Built self-service
                    data tools including Excel-insighter AI, data history
                    tracker, and CSV export functionality, improving
                    decision-making speed by 80%.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <p className="text-muted-foreground">
                    <strong>Performance:</strong> Offered Full Time Offer (PPO)
                    based on exceptional performance and delivery of high-impact
                    business solutions.
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
