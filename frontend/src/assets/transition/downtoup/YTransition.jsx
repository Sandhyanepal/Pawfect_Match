import { motion } from "framer-motion";

export default function YTransition({ children,className,delay }) {
  return (
    <motion.div
    className={className}
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.7,delay:delay?delay:0.2  }}
      viewport={{ once:true }}
    >
      {children}
    </motion.div>
  );
}