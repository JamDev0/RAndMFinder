import { CircleNotch } from "phosphor-react";

import { motion } from "framer-motion";

export function Loading() {
    return (
        <motion.div 
         className="
            w-full h-auto max-w-[200px]
         "
         animate={{ rotate: 360 }}
         transition={{ duration: 0.9, ease: 'backInOut', repeat: Infinity }}
        >

            <CircleNotch
             className='
                w-full h-auto
             '
            />
        </motion.div>
    )
}