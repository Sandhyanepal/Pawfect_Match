import { motion } from "framer-motion";

export default function Scale({ children,className,delay }) {
  return (
    <motion.div
    className={className}
      initial={{ scale:0.6, opacity: 0 }}
      whileInView={{ scale:1, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.9,delay:delay?delay:0.2 }}
      viewport={{ once:true }}
    >
      {children}
    </motion.div>
  );
}