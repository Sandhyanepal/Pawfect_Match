import { motion } from "framer-motion";

export default function YTTransition({ children,className,delay }) {
  return (
    <motion.div
    className={className}
      initial={{ y: -10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5,delay:delay?delay:0.2  }}
      viewport={{ once:true }}
    >
      {children}
    </motion.div>
  );
}