import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

const spring = { type: "spring", stiffness: 380, damping: 30 };

const menuVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.15 } },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
};

function Hamburger({ open }) {
  const line = "block h-0.5 w-5 rounded-full bg-white origin-center";
  return (
    <div className="flex h-5 w-5 flex-col items-center justify-center gap-1.5">
      <motion.span
        className={line}
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={spring}
      />
      <motion.span
        className={line}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className={line}
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={spring}
      />
    </div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.2,
  });

  // Scroll down -> hide navbar, scroll up -> show again
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 150 && !open);
    setScrolled(y > 20);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <motion.nav
        animate={{ scale: scrolled ? 0.97 : 1 }}
        transition={spring}
        className={`relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-colors duration-300 ${scrolled
            ? "bg-zinc-900/80 shadow-2xl shadow-indigo-500/10"
            : "bg-zinc-900/40"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-lg font-bold text-white"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm"
            >
              ✦
            </motion.span>
            Brand
          </motion.a>

          {/* Desktop links */}
          <ul
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {LINKS.map((link) => (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  onClick={() => setActive(link.name)}
                  onMouseEnter={() => setHovered(link.name)}
                  className={`relative z-10 block px-4 py-2 text-sm font-medium transition-colors ${active === link.name || hovered === link.name
                      ? "text-white"
                      : "text-zinc-400"
                    }`}
                >
                  {link.name}
                </a>

                {/* Hover spotlight that glides between links */}
                {hovered === link.name && (
                  <motion.span
                    layoutId="hover-pill"
                    transition={spring}
                    className="absolute inset-0 rounded-xl bg-white/10"
                  />
                )}

                {/* Active indicator that glides between links */}
                {active === link.name && (
                  <motion.span
                    layoutId="active-dot"
                    transition={spring}
                    className="absolute -bottom-0.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400"
                  />
                )}
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 24px rgba(168,85,247,0.55)",
              }}
              whileTap={{ scale: 0.94 }}
              className="hidden rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white md:block"
            >
              Get Started
            </motion.a>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="rounded-lg p-2 hover:bg-white/10 md:hidden"
            >
              <Hamburger open={open} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 pt-3 md:hidden"
            >
              {LINKS.map((link) => (
                <motion.li key={link.name} variants={itemVariants}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActive(link.name);
                      setOpen(false);
                    }}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${active === link.name
                        ? "bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={itemVariants} className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-center font-semibold text-white"
                >
                  Get Started
                </a>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400"
        />
      </motion.nav>
    </motion.header>
  );
}
