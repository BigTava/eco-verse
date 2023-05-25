import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type NavLinksProps = {
  labels?: Array<Array<string>>;
};
const NavLinks = (props: NavLinksProps) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {props.labels?.map(([label, href], index) => (
        <a
          key={label}
          href={href}
          className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-[0ms]"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="absolute inset-0 rounded-lg bg-gray-100"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10">{label}</span>
        </a>
      ))}
    </>
  );
};

export default NavLinks;
