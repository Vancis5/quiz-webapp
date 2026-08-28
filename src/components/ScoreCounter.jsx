import { motion, AnimatePresence } from 'framer-motion'
import { Trophy } from 'lucide-react'

export default function ScoreCounter({ score, theme }) {
  return (
    <div className="flex items-center gap-2 px-6 py-2">
      <Trophy className="w-5 h-5 text-yellow-400" />
      <AnimatePresence mode="popLayout">
        <motion.span
          key={score}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-lg font-bold text-white"
        >
          {score}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm text-white/50 font-medium">pts</span>
    </div>
  )
}
