import { motion } from "framer-motion";

export default function Opacity55({ children, className,delay }) {
    return (
        <motion.div
            className={className}
            initial={{  opacity: 0 }}
            whileInView={{opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.7, delay: delay?delay:0.4}}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}