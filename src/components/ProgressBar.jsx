import { motion } from 'framer-motion'

export default function ProgressBar({ current, total, theme }) {
  const percent = ((current + 1) / total) * 100

  return (
    <div
      className="w-full h-1 bg-white/10 overflow-hidden"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuetext={`Question ${current + 1} of ${total}`}
    >
      <motion.div
        className={`h-full ${theme.progressBar || 'bg-white'} will-change-[width]`}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  )
}
