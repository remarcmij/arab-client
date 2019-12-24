import { ITopic } from 'Types';

export function filterVoices(
  availableVoices: SpeechSynthesisVoice[],
  topics: ITopic[],
): SpeechSynthesisVoice[] {
  const usedLanguages = topics.reduce((langSet, topic) => {
    langSet.add(topic.foreignLang);
    langSet.add(topic.nativeLang);
    return langSet;
  }, new Set<string>());

  console.log('usedLanguages :', usedLanguages);

  return availableVoices.filter(voice =>
    usedLanguages.has(voice.lang.slice(0, 2)),
  );
}
