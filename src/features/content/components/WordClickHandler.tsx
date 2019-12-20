import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import SpeechSynthesizer from '../../../services/SpeechSynthesizer';
import { getLanguageService } from '../../../services/language';
import { assertIsDefined } from '../../../utils/assert';

const WordClickHandler: React.FC<{}> = props => {
  const history = useHistory();
  const { article: topic } = useSelector((state: RootState) => state.content);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (e: React.MouseEvent) => {
    const { target } = e;
    if (
      target instanceof HTMLElement &&
      target.tagName === 'SPAN' &&
      target.lang
    ) {
      setAnchorEl(target);
    }
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const speak = () => {
    closeMenu();
    if (topic) {
      assertIsDefined(anchorEl);
      if (anchorEl.textContent) {
        getLanguageService(topic.foreignLang).speak(anchorEl.textContent);
      }
    }
  };

  const searchWord = () => {
    closeMenu();
    if (topic) {
      assertIsDefined(anchorEl);
      if (anchorEl.textContent) {
        const text = getLanguageService(topic.foreignLang).formatForSearch(
          anchorEl.textContent,
        );
        history.push(encodeURI(`/search?q=${text}`));
      }
    }
  };

  return (
    <>
      <div onClick={openMenu}>{props.children}</div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem disabled={!topic} onClick={speak}>
          {t('read_aloud')}
        </MenuItem>
        <MenuItem onClick={searchWord}>{t('look_up')}</MenuItem>
      </Menu>
    </>
  );
};

export default WordClickHandler;
