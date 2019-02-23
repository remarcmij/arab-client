import { settingsActions } from '../features/settings'
import store from '../store'
import { setVoiceName } from '../features/settings/actions'

// tslint:disable:no-console

class SpeechSynthesizer {
  utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance()
  voices: SpeechSynthesisVoice[] = []

  constructor() {
    this.initialize()
      .then(() => {
        if (!this.voices.some(v => v.lang.startsWith('ar-'))) {
          store.dispatch(setVoiceName('none'))
        }
      })
      .catch(error => console.error(error))
  }

  initialize() {
    return new Promise(resolve => {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices()
        if (process.env.NODE_ENV === 'development') {
          console.table(this.voices)
        }
        resolve()
      }
    })
  }

  getVoices() {
    return this.voices
  }

  speak(voiceName: string, message: string, rate: number = 0.8) {
    return new Promise(resolve => {
      this.utterance = new SpeechSynthesisUtterance()
      this.utterance.text = message
      this.utterance.rate = rate
      const voice = this.voices.find(v => v.name === voiceName)
      if (voice) {
        this.utterance.voice = voice
      }
      this.utterance.addEventListener('end', resolve)
      speechSynthesis.speak(this.utterance)
    })
  }
}

export default new SpeechSynthesizer()
