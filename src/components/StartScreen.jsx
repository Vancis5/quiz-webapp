import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function StartScreen({ quiz, theme, onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center text-center px-8"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
        className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight"
      >
        {quiz.title}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-lg md:text-xl text-white/70 max-w-lg mb-2"
      >
        {quiz.description}
      </motion.p>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="text-sm text-white/40 mb-10"
      >
        {quiz.questions.length} questions
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className={`${theme.button} text-white font-bold text-lg px-10 py-4 rounded-2xl flex items-center gap-3 shadow-2xl transition-colors`}
      >
        Let's Go
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}
