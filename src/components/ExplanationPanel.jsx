import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

export default function ExplanationPanel({ explanation }) {
  if (!explanation) return null

  return (
    <motion.div
      initial={{ y: 20, opacity: 0, height: 0 }}
      animate={{ y: 0, opacity: 1, height: 'auto' }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="mt-4"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
