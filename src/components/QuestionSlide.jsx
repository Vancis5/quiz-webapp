import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import OptionButton from './OptionButton'
import ExplanationPanel from './ExplanationPanel'

export default function QuestionSlide({ question, questionIndex, theme, onAnswer, onNext }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (index) => {
    if (answered) return
    setSelectedIndex(index)
    setAnswered(true)
    const isCorrect = index === question.correctIndex
    onAnswer(isCorrect)
  }

  const getOptionState = (index) => {
    if (!answered) return 'idle'
    if (index === selectedIndex && index === question.correctIndex) return 'selected-correct'
    if (index === selectedIndex && index !== question.correctIndex) return 'selected-wrong'
    if (index === question.correctIndex) return 'revealed-correct'
    return 'idle'
  }

  return (
    <motion.div
      key={questionIndex}
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-8 max-w-3xl mx-auto w-full"
    >
      {/* Question text */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="text-2xl md:text-4xl font-bold text-white text-center mb-8 md:mb-10 leading-snug"
      >
        {question.question}
      </motion.h2>

      {/* Image (optional) */}
      {question.image && (
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          src={question.image}
          alt=""
          className="max-h-48 rounded-xl mb-8 object-contain"
        />
      )}

      {/* Options */}
      <div className="w-full space-y-3">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            text={option}
            index={index}
            state={getOptionState(index)}
            onClick={() => handleSelect(index)}
            disabled={answered}
          />
        ))}
      </div>

      {/* Explanation */}
      {answered && <ExplanationPanel explanation={question.explanation} />}

      {/* Next button */}
      {answered && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className={`${theme.button} text-white font-bold text-base px-8 py-3 rounded-xl flex items-center gap-2 mt-6 shadow-xl transition-colors`}
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  )
}
