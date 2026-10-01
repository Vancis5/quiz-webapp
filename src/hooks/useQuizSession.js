import { useReducer, useCallback, useMemo } from 'react'
import {
  initialSessionState,
  quizSessionReducer,
  calculatePerformance,
  getOptionState,
} from '../model/quizSession'
import { defaultFeedback } from '../utils/feedback'

export function useQuizSession(quizData, feedback = defaultFeedback) {
  const [state, dispatch] = useReducer(quizSessionReducer, initialSessionState)
  const totalQuestions = quizData.questions.length
  const currentQuestion = quizData.questions[state.currentQuestionIndex]

  const start = useCallback(() => {
    dispatch({ type: 'START' })
  }, [])

  const answer = useCallback((optionIndex) => {
    if (!currentQuestion || state.isAnswered) return

    const isCorrect = optionIndex === currentQuestion.correctIndex
    dispatch({
      type: 'ANSWER',
      optionIndex,
      correctIndex: currentQuestion.correctIndex,
    })

    if (isCorrect) {
      feedback.onCorrect()
    } else {
      feedback.onWrong()
    }
  }, [currentQuestion, state.isAnswered, feedback])

  const next = useCallback(() => {
    const isLast = state.currentQuestionIndex + 1 >= totalQuestions
    dispatch({ type: 'NEXT', totalQuestions })

    if (isLast) {
      feedback.onResults(state.score, totalQuestions)
    }
  }, [state.currentQuestionIndex, state.score, totalQuestions, feedback])

  const restart = useCallback(() => {
    dispatch({ type: 'RESTART' })
  }, [])

  const performance = useMemo(() => {
    return calculatePerformance(state.score, totalQuestions)
  }, [state.score, totalQuestions])

  const progressPercent = totalQuestions > 0
    ? (state.currentQuestionIndex / totalQuestions) * 100
    : 0

  const getOptionStatus = useCallback((optionIndex) => {
    if (!currentQuestion) return 'idle'
    return getOptionState(
      optionIndex,
      state.selectedOptionIndex,
      currentQuestion.correctIndex,
      state.isAnswered
    )
  }, [currentQuestion, state.selectedOptionIndex, state.isAnswered])

  return {
    phase: state.phase,
    currentQuestionIndex: state.currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    score: state.score,
    selectedOptionIndex: state.selectedOptionIndex,
    isAnswered: state.isAnswered,
    progressPercent,
    performance,
    getOptionStatus,
    start,
    answer,
    next,
    restart,
  }
}
