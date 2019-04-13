import * as React from 'react';
import useSettings, { SettingsAction, SettingsState } from './useSettings';

type SettingsContextProps = {
  settings: SettingsState;
  dispatch: React.Dispatch<SettingsAction>;
};

const SettingsContext = React.createContext<SettingsContextProps | null>(null);

export const useSettingsContext = () => {
  const context = React.useContext(SettingsContext);
  if (context === null) throw new Error('SettingContext: default null is unexpected');
  return context;
};

export const SettingsStore: React.FC = props => {
  const [settings, dispatch] = useSettings();
  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
