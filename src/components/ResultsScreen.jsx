import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'

export default function ResultsScreen({ score, total, performance, theme, onRestart }) {
  const pct = Math.round((score / total) * 100)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'r' || e.key === 'R' || e.key === 'Enter') {
        e.preventDefault()
        onRestart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onRestart])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="max-w-md w-full text-center flex flex-col items-center will-change-[transform,opacity]"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
        {performance?.label || 'Quiz Complete'}
      </h1>
      <p className="text-white/60 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
        {performance?.sublabel || `You scored ${score} out of ${total}`}
      </p>

      {/* Large Minimalist Score Display */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-6 sm:mb-8 flex flex-col items-center justify-center">
        <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / total) }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            style={{ willChange: 'stroke-dashoffset' }}
          />
        </svg>
        <span className="text-4xl font-black font-mono text-white tabular-nums">
          {score}/{total}
        </span>
        <span className="text-sm font-mono text-white/50 mt-1">
          {pct}%
        </span>
      </div>

      <button
        onClick={onRestart}
        autoFocus
        className={`${theme.button} text-white font-bold text-base px-8 py-3.5 rounded-2xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl will-change-transform`}
      >
        <RotateCcw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </motion.div>
  )
}
