import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import quizData from './data/quizData.json'
import { getTheme } from './utils/themes'
import { fireCorrectBurst } from './utils/confetti'
import { playCorrectSound, playWrongSound } from './utils/sounds'
import StartScreen from './components/StartScreen'
import QuestionSlide from './components/QuestionSlide'
import ProgressBar from './components/ProgressBar'
import ScoreCounter from './components/ScoreCounter'
import ResultsScreen from './components/ResultsScreen'

export default function App() {
  const [phase, setPhase] = useState('start') // 'start' | 'playing' | 'results'
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [muted, setMuted] = useState(false)

  const theme = getTheme(quizData.theme)
  const total = quizData.questions.length

  const handleStart = () => {
    setPhase('playing')
    setCurrentQ(0)
    setScore(0)
  }

  const handleAnswer = useCallback((isCorrect) => {
    if (isCorrect) {
      setScore((s) => s + 1)
      fireCorrectBurst()
      if (!muted) playCorrectSound()
    } else {
      if (!muted) playWrongSound()
    }
  }, [muted])

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= total) {
      setPhase('results')
    } else {
      setCurrentQ((q) => q + 1)
    }
  }, [currentQ, total])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && phase === 'start') {
        handleStart()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase])

  return (
    <div className={`h-screen w-screen bg-gradient-to-b ${theme.bg} flex flex-col overflow-hidden relative`}>
      {/* Mute toggle */}
      <button
        onClick={() => setMuted((m) => !m)}
        className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <VolumeX className="w-5 h-5 text-white/60" />
        ) : (
          <Volume2 className="w-5 h-5 text-white/60" />
        )}
      </button>

      {/* Progress bar + score (only during quiz) */}
      {phase === 'playing' && (
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <ProgressBar current={currentQ} total={total} theme={theme} />
          </div>
          <ScoreCounter score={score} theme={theme} />
        </div>
      )}

      {/* Main content */}
      <AnimatePresence mode="wait">
        {phase === 'start' && (
          <StartScreen
            key="start"
            quiz={quizData}
            theme={theme}
            onStart={handleStart}
          />
        )}
        {phase === 'playing' && (
          <QuestionSlide
            key={`q-${currentQ}`}
            question={quizData.questions[currentQ]}
            questionIndex={currentQ}
            theme={theme}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}
        {phase === 'results' && (
          <ResultsScreen
            key="results"
            score={score}
            total={total}
            theme={theme}
            onRestart={handleStart}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
