import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import quizData from './data/quizData.json'
import { getTheme } from './utils/themes'
import { createFeedback } from './utils/feedback'
import { useQuizSession } from './hooks/useQuizSession'
import StartScreen from './components/StartScreen'
import QuestionSlide from './components/QuestionSlide'
import ProgressBar from './components/ProgressBar'
import ScoreCounter from './components/ScoreCounter'
import ResultsScreen from './components/ResultsScreen'

const theme = getTheme(quizData.theme)

export default function App() {
  const [feedback] = useState(() => createFeedback())
  const [muted, setMuted] = useState(false)

  const session = useQuizSession(quizData, feedback)

  const toggleMute = useCallback(() => {
    const next = feedback.toggleMute()
    setMuted(next)
  }, [feedback])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'Enter' && session.phase === 'start') {
        session.start()
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [session, toggleMute])

  return (
    <div className={`min-h-dvh w-full bg-gradient-to-b ${theme.bg} flex flex-col justify-between overflow-x-hidden relative select-none`}>
      {/* Edge-to-edge top progress bar (flush with window top) */}
      {session.phase === 'playing' && (
        <div className="fixed top-0 left-0 right-0 z-40">
          <ProgressBar
            current={session.currentQuestionIndex}
            total={session.totalQuestions}
            theme={theme}
          />
        </div>
      )}

      {/* Floating score indicator in top left */}
      {session.phase === 'playing' && (
        <div className="absolute top-5 left-6 z-40">
          <ScoreCounter score={session.score} />
        </div>
      )}

      {/* Floating mute toggle in top right */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors will-change-[color,background-color] cursor-pointer"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Edge-to-edge centered viewport */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8 sm:py-12 my-auto">
        <AnimatePresence mode="wait">
          {session.phase === 'start' && (
            <StartScreen
              key="start"
              quiz={quizData}
              theme={theme}
              onStart={session.start}
            />
          )}
          {session.phase === 'playing' && (
            <QuestionSlide
              key={`q-${session.currentQuestionIndex}`}
              question={session.currentQuestion}
              questionIndex={session.currentQuestionIndex}
              theme={theme}
              isAnswered={session.isAnswered}
              getOptionStatus={session.getOptionStatus}
              onSelectOption={session.answer}
              onNext={session.next}
            />
          )}
          {session.phase === 'results' && (
            <ResultsScreen
              key="results"
              score={session.score}
              total={session.totalQuestions}
              performance={session.performance}
              theme={theme}
              onRestart={session.restart}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
