import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "hsl(var(--background))", position: "relative", overflow: "hidden" }}
    >
      {/* Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", width: 400, height: 400,
          borderRadius: "50%", background: "hsl(var(--primary) / 0.1)",
          top: "-10%", left: "-10%", filter: "blur(60px)", pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", width: 300, height: 300,
          borderRadius: "50%", background: "hsl(var(--accent) / 0.08)",
          bottom: "0%", right: "-5%", filter: "blur(60px)", pointerEvents: "none",
        }}
      />

      <div className="text-center max-w-md" style={{ position: "relative", zIndex: 1 }}>
        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="text-[10rem] font-bold leading-none bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent select-none"
            style={{ lineHeight: 1 }}
          >
            404
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold mt-4 mb-2"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground mb-8"
        >
          This page doesn't exist — but the rest of the portfolio does.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button asChild size="lg">
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" onClick={() => history.back()}>
            <span style={{ cursor: "pointer" }} onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </span>
          </Button>
        </motion.div>

        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-sm text-muted-foreground"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">DG</span>
          {" "}· deepakgautam.dev
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
