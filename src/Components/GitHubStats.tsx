import { motion } from "framer-motion";

const GitHubStats = () => {
  const username = "Deepak-gautam1";
  const theme = "transparent"; // works in both light/dark

  return (
    <section className="py-16 px-4" id="github">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GitHub Activity
          </h2>
          <p className="text-muted-foreground text-lg">Open source contributions and coding consistency</p>
        </motion.div>

        {/* Stats cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              src: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=3b82f6&icon_color=22c55e&text_color=6b7280&bg_color=00000000&count_private=true`,
              alt: "GitHub Stats",
              delay: 0,
            },
            {
              src: `https://github-readme-streak-stats.herokuapp.com?user=${username}&theme=transparent&hide_border=true&stroke=3b82f610&ring=3b82f6&fire=22c55e&currStreakLabel=3b82f6&dates=6b7280&background=00000000`,
              alt: "GitHub Streak",
              delay: 0.1,
            },
            {
              src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=3b82f6&text_color=6b7280&bg_color=00000000&langs_count=6`,
              alt: "Top Languages",
              delay: 0.2,
            },
          ].map((card) => (
            <motion.div
              key={card.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: card.delay }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-background border border-border rounded-2xl p-4 shadow-sm overflow-hidden"
            >
              <img
                src={card.src}
                alt={card.alt}
                loading="lazy"
                className="w-full h-auto"
                style={{ minHeight: "120px" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.005 }}
          className="bg-background border border-border rounded-2xl p-6 shadow-sm overflow-hidden"
        >
          <p className="text-sm text-muted-foreground mb-4 font-medium">Contribution Graph — last year</p>
          <img
            src={`https://ghchart.rshah.org/3b82f6/${username}`}
            alt="GitHub contribution graph"
            loading="lazy"
            className="w-full h-auto"
            style={{ borderRadius: "8px" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
