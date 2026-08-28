import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export default function OptionButton({ text, index, state, onClick, disabled }) {
  // state: 'idle' | 'selected-correct' | 'selected-wrong' | 'revealed-correct'
  const labels = ['A', 'B', 'C', 'D', 'E', 'F']

  const getStyles = () => {
    switch (state) {
      case 'selected-correct':
        return 'bg-green-500/30 border-green-400 ring-2 ring-green-400/50'
      case 'selected-wrong':
        return 'bg-red-500/30 border-red-400 ring-2 ring-red-400/50'
      case 'revealed-correct':
        return 'bg-green-500/20 border-green-400/60'
      default:
        return 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
    }
  }

  const getIcon = () => {
    if (state === 'selected-correct' || state === 'revealed-correct') {
      return <Check className="w-5 h-5 text-green-400" />
    }
    if (state === 'selected-wrong') {
      return <X className="w-5 h-5 text-red-400" />
    }
    return null
  }

  return (
    <motion.button
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 + index * 0.08, type: 'spring', stiffness: 200 }}
      whileHover={state === 'idle' && !disabled ? { scale: 1.02 } : {}}
      whileTap={state === 'idle' && !disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-4 p-4 md:p-5 rounded-xl border-2 
        transition-colors duration-300 text-left
        ${getStyles()}
        ${state === 'selected-wrong' ? 'animate-shake' : ''}
        ${state === 'selected-correct' ? 'animate-pulse-glow' : ''}
        ${disabled && state === 'idle' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className={`
        w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0
        ${state === 'selected-correct' || state === 'revealed-correct'
          ? 'bg-green-500/30 text-green-300'
          : state === 'selected-wrong'
            ? 'bg-red-500/30 text-red-300'
            : 'bg-white/10 text-white/70'
        }
      `}>
        {getIcon() || labels[index]}
      </span>
      <span className="text-white font-medium text-base md:text-lg flex-1">
        {text}
      </span>
    </motion.button>
  )
}
