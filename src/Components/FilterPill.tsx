import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FilterPillProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

// Shared pill/toggle button — used by the project filter tabs and the
// GitHub contribution year switcher, which previously duplicated this
// styling via near-identical inline `style` objects.
const FilterPill = ({ active, onClick, children }: FilterPillProps) => (
  <motion.button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    className={`relative flex items-center gap-1.5 rounded-full px-[18px] py-[7px] text-[13px] transition-all ${
      active
        ? "border border-transparent bg-primary font-semibold text-primary-foreground shadow-[0_4px_14px_hsl(var(--primary)/0.35)]"
        : "border border-border bg-background font-medium text-muted-foreground"
    }`}
  >
    {children}
  </motion.button>
);

export default FilterPill;
