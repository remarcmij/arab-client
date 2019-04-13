import React, { useState, createContext, useContext } from 'react';

const LOCAL_STORAGE_KEY = '@arab/setting';

export type SettingsState = {
  readonly showVocalization: boolean;
  readonly showTranscription: boolean;
  readonly showFlashcards: boolean;
  readonly romanizationStandard: string;
  readonly voiceEnabled: boolean;
  readonly voiceName: string;
};

type SettingsContextProps = {
  settings: SettingsState;
  toggleVocalization: () => void;
  toggleTranscription: () => void;
  toggleFlashcards: () => void;
  toggleVoice: () => void;
  setRomanizationSystem: (romanizationStandard: string) => void;
  setVoiceName: (voiceName: string) => void;
};

let initialState = {
  showVocalization: true,
  showTranscription: true,
  showFlashcards: false,
  romanizationStandard: 'din',
  voiceEnabled: false,
  voiceName: 'none',
};

const SettingsContext = createContext<SettingsContextProps | null>(null);

export const SettingsProvider: React.FC = props => {
  const [settings, setSettings] = useState(initialState);

  const saveSettings = (newSettings: SettingsState) => {
    setSettings(newSettings);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSettings));
  };

  const toggleVocalization = () =>
    saveSettings({ ...settings, showVocalization: !settings.showVocalization });
  const toggleTranscription = () =>
    saveSettings({ ...settings, showTranscription: !settings.showTranscription });
  const toggleFlashcards = () =>
    saveSettings({ ...settings, showFlashcards: !settings.showFlashcards });
  const toggleVoice = () => saveSettings({ ...settings, voiceEnabled: !settings.voiceEnabled });
  const setRomanizationSystem = (romanizationStandard: string) =>
    saveSettings({ ...settings, romanizationStandard });
  const setVoiceName = (voiceName: string) => saveSettings({ ...settings, voiceName });

  return (
    <SettingsContext.Provider
      value={{
        settings,
        toggleVocalization,
        toggleTranscription,
        toggleFlashcards,
        toggleVoice,
        setRomanizationSystem,
        setVoiceName,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === null) throw new Error('SettingContext: default null is unexpected');
  return context;
};

const stateString = window.localStorage.getItem(LOCAL_STORAGE_KEY);

if (stateString) {
  try {
    initialState = JSON.parse(stateString) as SettingsState;
  } catch (_) {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}
