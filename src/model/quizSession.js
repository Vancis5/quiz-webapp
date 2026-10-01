export function calculatePerformance(score, total) {
  const ratio = total > 0 ? score / total : 0
  const pct = Math.round(ratio * 100)

  if (ratio === 1) {
    return {
      emoji: '🎯',
      label: 'PERFECT!',
      sublabel: "You didn't miss a single one!",
      iconName: 'Star',
      color: 'text-yellow-400',
      pct,
    }
  }
  if (ratio >= 0.8) {
    return {
      emoji: '🔥',
      label: 'Almost Perfect!',
      sublabel: 'So close to a clean sweep!',
      iconName: 'Trophy',
      color: 'text-yellow-400',
      pct,
    }
  }
  if (ratio >= 0.6) {
    return {
      emoji: '💪',
      label: 'Nice Work!',
      sublabel: "You're getting the hang of it!",
      iconName: 'Trophy',
      color: 'text-blue-400',
      pct,
    }
  }
  if (ratio >= 0.4) {
    return {
      emoji: '🤔',
      label: 'Not Bad!',
      sublabel: 'Room for improvement — try again?',
      iconName: 'Meh',
      color: 'text-orange-400',
      pct,
    }
  }
  return {
    emoji: '📚',
    label: 'Keep Studying!',
    sublabel: "You'll get it next time!",
    iconName: 'Frown',
    color: 'text-red-400',
    pct,
  }
}

export const initialSessionState = {
  phase: 'start', // 'start' | 'playing' | 'results'
  currentQuestionIndex: 0,
  score: 0,
  selectedOptionIndex: null,
  isAnswered: false,
}

export function quizSessionReducer(state, action) {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        phase: 'playing',
        currentQuestionIndex: 0,
        score: 0,
        selectedOptionIndex: null,
        isAnswered: false,
      }

    case 'ANSWER': {
      if (state.phase !== 'playing' || state.isAnswered) {
        return state
      }
      const { optionIndex, correctIndex } = action
      const isCorrect = optionIndex === correctIndex

      return {
        ...state,
        selectedOptionIndex: optionIndex,
        isAnswered: true,
        score: isCorrect ? state.score + 1 : state.score,
      }
    }

    case 'NEXT': {
      if (state.phase !== 'playing' || !state.isAnswered) {
        return state
      }
      const isLast = state.currentQuestionIndex + 1 >= action.totalQuestions
      if (isLast) {
        return {
          ...state,
          phase: 'results',
        }
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedOptionIndex: null,
        isAnswered: false,
      }
    }

    case 'RESTART':
      return {
        ...state,
        phase: 'playing',
        currentQuestionIndex: 0,
        score: 0,
        selectedOptionIndex: null,
        isAnswered: false,
      }

    default:
      return state
  }
}

export function getOptionState(optionIndex, selectedIndex, correctIndex, isAnswered) {
  if (!isAnswered) return 'idle'
  if (optionIndex === selectedIndex && optionIndex === correctIndex) return 'selected-correct'
  if (optionIndex === selectedIndex && optionIndex !== correctIndex) return 'selected-wrong'
  if (optionIndex === correctIndex) return 'revealed-correct'
  return 'idle'
}
