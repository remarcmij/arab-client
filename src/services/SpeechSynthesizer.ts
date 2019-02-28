import { setVoiceName } from '../features/settings/actions'
import store from '../store'

// tslint:disable:no-console

class SpeechSynthesizer {
  utterance: SpeechSynthesisUtterance | undefined
  voices: SpeechSynthesisVoice[] = []

  constructor() {
    if ('SpeechSynthesisUtterance' in window) {
      this.utterance = new SpeechSynthesisUtterance()
    } else {
      return
    }

    this.loadVoices()
      .then(voices => {
        // get unique voices
        this.voices = Array.from(
          voices
            .filter(v => v.lang.startsWith('ar-'))
            .reduce((map, v) => {
              map.set(v.name, v)
              return map
            }, new Map<string, SpeechSynthesisVoice>())
            .values(),
        )
        if (process.env.NODE_ENV === 'development') {
          console.table(this.voices)
        }
        if (this.voices.length === 0) {
          store.dispatch(setVoiceName('none'))
        }
      })
      .catch(error => console.error(error))
  }

  loadVoices() {
    const voices = speechSynthesis.getVoices()
    if (voices.length !== 0) {
      return Promise.resolve(voices)
    }

    return new Promise<SpeechSynthesisVoice[]>(resolve => {
      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices())
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
