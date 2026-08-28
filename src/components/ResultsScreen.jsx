import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Star, Frown, Meh } from 'lucide-react'
import { fireResultsCelebration } from '../utils/confetti'

function getPerformance(score, total) {
  const pct = score / total
  if (pct === 1) return { emoji: '🎯', label: 'PERFECT!', sublabel: "You didn't miss a single one!", icon: Star, color: 'text-yellow-400' }
  if (pct >= 0.8) return { emoji: '🔥', label: 'Almost Perfect!', sublabel: 'So close to a clean sweep!', icon: Trophy, color: 'text-yellow-400' }
  if (pct >= 0.6) return { emoji: '💪', label: 'Nice Work!', sublabel: "You're getting the hang of it!", icon: Trophy, color: 'text-blue-400' }
  if (pct >= 0.4) return { emoji: '🤔', label: 'Not Bad!', sublabel: 'Room for improvement — try again?', icon: Meh, color: 'text-orange-400' }
  return { emoji: '📚', label: 'Keep Studying!', sublabel: "You'll get it next time!", icon: Frown, color: 'text-red-400' }
}

export default function ResultsScreen({ score, total, theme, onRestart }) {
  const perf = getPerformance(score, total)
  const pct = Math.round((score / total) * 100)

  useEffect(() => {
    if (score / total >= 0.6) {
      fireResultsCelebration()
    }
  }, [score, total])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center text-center px-8"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="text-7xl mb-6"
      >
        {perf.emoji}
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`text-4xl md:text-6xl font-black text-white mb-3`}
      >
        {perf.label}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-white/60 mb-8"
      >
        {perf.sublabel}
      </motion.p>

      {/* Score ring */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="relative w-40 h-40 mb-8"
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r="52" fill="none"
            stroke={score / total >= 0.6 ? '#22c55e' : score / total >= 0.4 ? '#f59e0b' : '#ef4444'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / total) }}
            transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-3xl font-black text-white"
          >
            {score}/{total}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-sm text-white/50"
          >
            {pct}%
          </motion.span>
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className={`${theme.button} text-white font-bold text-base px-8 py-3 rounded-xl flex items-center gap-2 shadow-xl transition-colors`}
      >
        <RotateCcw className="w-4 h-4" />
        Try Again
      </motion.button>
    </motion.div>
  )
}
