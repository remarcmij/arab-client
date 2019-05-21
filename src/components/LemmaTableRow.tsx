import pink from '@material-ui/core/colors/pink';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import React from 'react';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import Types from 'Types';
import { useSettingsContext } from '../contexts/settings';
import Transcoder from '../services/Transcoder';

configureAnchors({
  offset: -65,
  keepLastAnchorHash: true,
});

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
    rom: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
    },
    ar: {
      fontSize: 28,
      color: theme.palette.primary.dark,
      '&>span[lang="ar"]': {
        cursor: 'pointer',
      },
    },
    nl: {},
    targeted: {
      backgroundColor: `${pink[50]}!important`,
    },
  });

interface OwnProps {
  lemma: Types.Lemma;
  hashId: string;
}

type Props = OwnProps & WithStyles<typeof styles>;

const LemmaTableRow: React.FC<Props> = props => {
  const { lemma, hashId, classes } = props;

  const { settings } = useSettingsContext();
  const {
    showVocalization,
    showTranscription,
    romanizationStandard,
  } = settings;

  const arabicText = showVocalization
    ? lemma.ar
    : Transcoder.stripTashkeel(lemma.ar);
  const arabicHtml = arabicText.replace(
    arabicWordRegExp,
    '<span lang="ar">$&</span>',
  );

  return (
    <ScrollableAnchor id={lemma._id}>
      <tr className={lemma._id === hashId ? classes.targeted : ''}>
        <td align="right" className={classes.nl}>
          {lemma.nl}
        </td>
        <td
          dir="rtl"
          className={classes.ar}
          dangerouslySetInnerHTML={{ __html: arabicHtml }}
        />
        {showTranscription && lemma.rom && (
          <td align="center" className={classes.rom}>
            {lemma.rom
              ? Transcoder.applyRomanization(lemma.rom, romanizationStandard)
              : ' '}
          </td>
        )}
      </tr>
    </ScrollableAnchor>
  );
};

export default withStyles(styles)(LemmaTableRow);
