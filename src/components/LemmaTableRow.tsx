import IconButton from '@material-ui/core/IconButton';
import RootRef from '@material-ui/core/RootRef';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import React, { useEffect, useRef } from 'react';
import Types from 'Types';
import { useSettingsContext } from '../contexts/settings';
import SpeechSynthesizer from '../services/SpeechSynthesizer';
import Transcoder from '../services/Transcoder';
import indigo from '@material-ui/core/colors/indigo';

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
    source: {
      color: theme.palette.primary.main,
    },
    roman: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
    },
    target: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit / 2,
    },
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

const handleTargetClick = (
  voiceEnabled: boolean,
  voiceName: string,
  target: string,
) => {
  if (voiceEnabled && voiceName !== 'none') {
    // tslint:disable-next-line:no-floating-promises
    SpeechSynthesizer.speak(voiceName, target);
  }
};

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
    voiceName,
    voiceEnabled,
  } = settings;

  const rootRef = useRef<HTMLElement>(null);

  const isTargeted = !!lemmaId && lemmaId === lemma._id;

  useEffect(() => {
    if (isTargeted && rootRef.current) {
      window.scrollTo(0, rootRef.current.offsetTop);
    }
  }, [isTargeted]);

  return (
    <RootRef rootRef={rootRef}>
      <TableRow
        key={lemma._id}
        id={`lemma-${lemma._id}`}
        selected={isTargeted}
        classes={{ selected: classes.selected }}
      >
        <TableCell align="left">
          <Typography
            variant="h6"
            classes={{ h6: classes.source }}
            color="textPrimary"
          >
            {lemma.source}
          </Typography>
        </TableCell>
        {showTranscription && (
          <TableCell align="center">
            <Typography
              variant="h6"
              classes={{ h6: classes.roman }}
              color="textSecondary"
            >
              {lemma.roman
                ? Transcoder.applyRomanization(
                    lemma.roman,
                    romanizationStandard,
                  )
                : ' '}
            </Typography>
          </TableCell>
        )}
        <TableCell
          align="right"
          dir={'rtl'}
          classes={{ root: classes.foreignCell }}
          onClick={() =>
            handleTargetClick(voiceEnabled, voiceName, lemma.target)
          }
        >
          <Typography
            variant="h4"
            classes={{ h4: classes.target }}
            color="inherit"
          >
            {showVocalization
              ? lemma.target
              : Transcoder.stripTashkeel(lemma.target)}
          </Typography>
        </TableCell>
        {showButtons && (
          <TableCell align="right">
            <IconButton onClick={() => onButtonClick(lemma)} color="default">
              <ArrowForwardIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    </RootRef>
  );
};

export default withStyles(styles)(LemmaTableRow);
