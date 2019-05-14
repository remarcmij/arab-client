import indigo from '@material-ui/core/colors/indigo';
import IconButton from '@material-ui/core/IconButton';
import RootRef from '@material-ui/core/RootRef';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import React, { useEffect, useRef } from 'react';
import Types from 'Types';
import { useSettingsContext } from '../contexts/settings';
import Transcoder from '../services/Transcoder';

const arabicWordRegExp = /[\u0600-\u06FF]+/g;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit,
      overflowX: 'auto',
      padding: theme.spacing.unit * 4,
    },
    foreignCell: {
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    roman: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
    },
    target: {
      fontSize: 28,
      color: theme.palette.primary.dark,
      '&>span[lang="ar"]': {
        cursor: 'pointer',
      },
    },
    source: {},
    selected: {
      backgroundColor: `${indigo[50]}!important`,
    },
  });

interface OwnProps {
  lemma: Types.Lemma;
  onButtonClick?: (lemma: Types.Lemma) => void;
  showButtons?: boolean;
  lemmaId?: string | null;
}

type Props = WithStyles<typeof styles> & OwnProps;

const LemmaTableRow: React.FC<Props> = props => {
  const {
    lemma,
    lemmaId,
    classes,
    showButtons = false,
    onButtonClick = () => undefined,
  } = props;

  const { settings } = useSettingsContext();
  const {
    showVocalization,
    showTranscription,
    romanizationStandard,
  } = settings;

  const rootRef = useRef<HTMLElement>(null);

  const isTargeted = !!lemmaId && lemmaId === lemma._id;

  useEffect(() => {
    if (isTargeted && rootRef.current) {
      window.scrollTo(0, rootRef.current.offsetTop);
    }
  }, [isTargeted]);

  const arabicText = showVocalization
    ? lemma.target
    : Transcoder.stripTashkeel(lemma.target);
  const arabicHtml = arabicText.replace(
    arabicWordRegExp,
    '<span lang="ar">$&</span>',
  );

  return (
    <RootRef rootRef={rootRef}>
      <tr
        key={lemma._id}
        id={`lemma-${lemma._id}`}
        // selected={isTargeted}
        // classes={{ selected: classes.selected }}
      >
        <td align="left" className={classes.source}>
          {lemma.source}
        </td>
        {((showTranscription && lemma.roman) || showButtons) && (
          <td align="center" className={classes.roman}>
            {lemma.roman
              ? Transcoder.applyRomanization(lemma.roman, romanizationStandard)
              : ' '}
          </td>
        )}
        <td
          align="right"
          dir={'rtl'}
          className={classes.target}
          dangerouslySetInnerHTML={{ __html: arabicHtml }}
        />
        {showButtons && (
          <td align="right" style={{ minWidth: 'inherit' }}>
            <IconButton onClick={() => onButtonClick(lemma)} color="default">
              <ArrowForwardIcon />
            </IconButton>
          </td>
        )}
      </tr>
    </RootRef>
  );
};

export default withStyles(styles)(LemmaTableRow);
