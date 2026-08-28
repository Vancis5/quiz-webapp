import { motion } from 'framer-motion'

export default function ProgressBar({ current, total, theme }) {
  const percent = ((current) / total) * 100

  return (
    <div className="w-full px-6 pt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-white/60">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-semibold text-white/60">
          {Math.round(percent)}%
        </span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${theme.progressBar}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  )
}
