import { motion } from "framer-motion";

export default function XTransitionRight({ children,className,delay }) {
  return (
    <motion.div
    className={className}
      initial={{ x: 40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.7,delay:delay?delay:0.2 }}
      viewport={{ once:true }}
    >
      {children}
    </motion.div>
  );
}