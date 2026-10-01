import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X, Lightbulb } from 'lucide-react'

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F']

function getOptionStyles(state) {
  switch (state) {
    case 'selected-correct':
      return 'bg-emerald-500/25 border-emerald-400 text-white'
    case 'selected-wrong':
      return 'bg-rose-500/25 border-rose-400 text-white'
    case 'revealed-correct':
      return 'bg-emerald-500/15 border-emerald-400/60 text-white'
    default:
      return 'bg-white/10 border-white/15 hover:bg-white/15 hover:border-white/30 text-white'
  }
}

function getBadgeStyles(state) {
  if (state === 'selected-correct' || state === 'revealed-correct') {
    return 'bg-emerald-500 text-black font-bold'
  }
  if (state === 'selected-wrong') {
    return 'bg-rose-500 text-white font-bold'
  }
  return 'bg-white/10 text-white/70'
}

export default function QuestionSlide({
  question,
  questionIndex,
  theme,
  isAnswered,
  getOptionStatus,
  onSelectOption,
  onNext,
}) {
  // Keyboard navigation: 1-4 / A-D to select, Space / Enter to advance
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (!isAnswered) {
        const key = e.key.toLowerCase()
        if (key >= '1' && key <= '6') {
          const idx = parseInt(key, 10) - 1
          if (idx < question.options.length) onSelectOption(idx)
        } else if (['a', 'b', 'c', 'd', 'e', 'f'].includes(key)) {
          const idx = key.charCodeAt(0) - 97
          if (idx < question.options.length) onSelectOption(idx)
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onNext()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAnswered, question.options.length, onSelectOption, onNext])

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
      className="max-w-2xl w-full flex flex-col items-center will-change-[transform,opacity]"
    >
      <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-8 leading-snug">
        {question.question}
      </h2>

      {question.image && (
        <img
          src={question.image}
          alt=""
          className="max-h-48 rounded-xl mb-6 object-contain"
        />
      )}

      <div className="w-full space-y-3">
        {question.options.map((optionText, index) => {
          const state = getOptionStatus(index)
          const isCorrect = state === 'selected-correct' || state === 'revealed-correct'
          const isWrong = state === 'selected-wrong'

          return (
            <motion.button
              key={index}
              whileHover={state === 'idle' && !isAnswered ? { scale: 1.01 } : {}}
              whileTap={state === 'idle' && !isAnswered ? { scale: 0.99 } : {}}
              onClick={() => onSelectOption(index)}
              disabled={isAnswered}
              className={`
                w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl border
                transition-all duration-200 text-left outline-none will-change-transform
                ${getOptionStyles(state)}
                ${isAnswered && state === 'idle' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 transition-colors will-change-[color,background-color] ${getBadgeStyles(state)}`}>
                {isCorrect ? <Check className="w-4 h-4 stroke-[3]" /> : isWrong ? <X className="w-4 h-4 stroke-[3]" /> : OPTION_LABELS[index]}
              </span>
              <span className="text-base md:text-lg font-medium flex-1">
                {optionText}
              </span>
            </motion.button>
          )
        })}
      </div>

      {isAnswered && question.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 w-full p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm will-change-[transform,opacity]"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </motion.div>
      )}

      {isAnswered && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNext}
          autoFocus
          className={`${theme.button} text-white font-bold text-base px-8 py-3.5 rounded-2xl flex items-center gap-2.5 mt-6 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl will-change-[transform,opacity]`}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  )
}
