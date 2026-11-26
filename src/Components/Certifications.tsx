import { motion } from "framer-motion";
import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import profile from "@/data/profile.json";

const certifications = profile.certifications;

// A section of its own (not part of Skills) so the "Certifications" nav tab
// lands on it like every other tab. It shares Skills' background and takes
// over Skills' bottom padding, so the two still read as one block.
const Certifications = () => (
  <section className="pt-16 pb-20 px-4 bg-muted/50" id="certifications">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-0">
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, i) => (
              <Dialog key={cert.name}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors py-1.5 px-3"
                    >
                      {cert.name}
                    </Badge>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80vw] h-[90vh] p-2">
                  <iframe
                    src={cert.link}
                    className="w-full h-full rounded-md border"
                    title={`${cert.name} Certificate`}
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  </section>
);

export default Certifications;
