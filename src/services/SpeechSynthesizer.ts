class SpeechSynthesizer {
  voiceName: string
  utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance()
  voices: SpeechSynthesisVoice[] = []

  constructor(voiceName: string) {
    this.voiceName = voiceName
  }

  initialize() {
    return new Promise(resolve => {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices()
        console.table(this.voices)
        resolve()
      }
    })
  }

  speak(message: string) {
    return new Promise(resolve => {
      this.utterance = new SpeechSynthesisUtterance()
      this.utterance.text = message
      const voiceName = this.voices.find(voice => voice.name === this.voiceName)
      if (voiceName) {
        this.utterance.voice = voiceName
      }
      this.utterance.addEventListener('end', resolve)
      speechSynthesis.speak(this.utterance)
    })
  }
}

export default SpeechSynthesizer
