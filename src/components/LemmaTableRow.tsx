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
    ? lemma.target
    : Transcoder.stripTashkeel(lemma.target);
  const arabicHtml = arabicText.replace(
    arabicWordRegExp,
    '<span lang="ar">$&</span>',
  );

  return (
    <ScrollableAnchor id={lemma._id}>
      <tr className={lemma._id === hashId ? classes.targeted : ''}>
        <td align="left" className={classes.source}>
          {lemma.source}
        </td>
        {showTranscription && lemma.roman && (
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
      </tr>
    </ScrollableAnchor>
  );
};

export default withStyles(styles)(LemmaTableRow);
