import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function StartScreen({ quiz, theme, onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="max-w-2xl w-full text-center flex flex-col items-center will-change-[transform,opacity]"
    >
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-4 leading-none">
        {quiz.title}
      </h1>
      <p className="text-base md:text-xl text-white/70 max-w-lg mb-3 leading-relaxed">
        {quiz.description}
      </p>
      <p className="text-xs font-mono text-white/40 mb-10 tracking-widest uppercase">
        {quiz.questions.length} questions
      </p>
      <button
        onClick={onStart}
        autoFocus
        className={`${theme.button} text-white font-bold text-lg px-9 py-4 rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl will-change-transform`}
      >
        <span>Start Quiz</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  )
}
