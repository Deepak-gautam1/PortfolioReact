import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Send,
  LinkedinIcon,
  GithubIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // State to manage loading status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.info("Sending your message...");

    // Insert data into Supabase
    const { error } = await supabase.from("messages").insert([formData]);

    if (error) {
      console.error("Supabase error:", error);
      toast.error("Failed to send message. Please try again.");
    } else {
      toast.success("Message sent successfully! I'll get back to you soon.");
      // Clear the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 px-4 bg-muted" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Let's discuss opportunities and collaborate on exciting projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="p-6 bg-background border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>kd7540520@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+91 9599171623</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>West Delhi, New Delhi</span>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-background border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <Button asChild variant="outline" size="icon">
                  <a
                    href="https://github.com/Deepak-gautam1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    {" "}
                    {/* Add LinkedIn URL */}
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <a href="mailto:kd754052004@gmail.com">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-background border shadow-sm">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium mb-2 block"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium mb-2 block"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium mb-2 block"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project collaboration, job opportunity, etc."
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium mb-2 block"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      {" "}
                      <Send className="w-4 h-4 mr-2" /> Send Message{" "}
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
