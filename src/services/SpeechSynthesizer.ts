import Observable from './Observable';

class SpeechSynthesizer extends Observable {
  private utterance: SpeechSynthesisUtterance | undefined;
  private voices: SpeechSynthesisVoice[] = [];
  private timerId: number | null = null;

  constructor() {
    super();
    if ('SpeechSynthesisUtterance' in window) {
      this.utterance = new SpeechSynthesisUtterance();
    } else {
      return;
    }

    this.loadVoices()
      .then(voices => {
        // get unique voices
        this.voices = Array.from(
          voices
            .reduce((map, v) => {
              map.set(v.name, v);
              return map;
            }, new Map<string, SpeechSynthesisVoice>())
            .values(),
        );
        if (process.env.NODE_ENV === 'development') {
          console.table(this.voices);
        }
      })
      .catch(error => console.error(error));
  }

  loadVoices() {
    const voices = speechSynthesis.getVoices();
    if (voices.length !== 0) {
      return Promise.resolve(voices);
    }

    return new Promise<SpeechSynthesisVoice[]>(resolve => {
      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices());
      };
    });
  }

  getVoices() {
    return this.voices;
  }

  get speaking(): boolean {
    return speechSynthesis.speaking;
  }

  speak(voiceName: string, message: string, rate = 0.8) {
    // Cancel any outstanding time-out and utterance
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.text = message;
    this.utterance.rate = rate;
    this.utterance.voice = this.voices.find(v => v.name === voiceName)!;
    this.utterance.addEventListener('end', e => {
      if (e.utterance === this.utterance) {
        this.timerId = setTimeout(() => {
          this.timerId = null;
          this.notify();
        }, 2000);
      }
    });

    speechSynthesis.speak(this.utterance);
  }
}

export default new SpeechSynthesizer();
