import { fireCorrectBurst, fireResultsCelebration } from './confetti'
import { playCorrectSound, playWrongSound } from './sounds'

export const browserFeedbackAdapter = {
  playCorrect: () => playCorrectSound(),
  playWrong: () => playWrongSound(),
  burstCelebration: () => fireCorrectBurst(),
  resultsCelebration: () => fireResultsCelebration(),
}

export const silentFeedbackAdapter = {
  playCorrect: () => {},
  playWrong: () => {},
  burstCelebration: () => {},
  resultsCelebration: () => {},
}

export function createFeedback({ initialMuted = false, adapter = browserFeedbackAdapter } = {}) {
  let muted = initialMuted

  return {
    isMuted: () => muted,
    setMuted: (val) => {
      muted = Boolean(val)
      return muted
    },
    toggleMute: () => {
      muted = !muted
      return muted
    },
    onCorrect: () => {
      adapter.burstCelebration()
      if (!muted) {
        adapter.playCorrect()
      }
    },
    onWrong: () => {
      if (!muted) {
        adapter.playWrong()
      }
    },
    onResults: (score, total) => {
      if (total > 0 && score / total >= 0.6) {
        adapter.resultsCelebration()
      }
    },
  }
}

export const defaultFeedback = createFeedback()
