import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import Types from 'Types'
import Transcoder from '../services/Transcoder'
import SpeechSynthesizer from '../services/SpeechSynthesizer'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: theme.spacing.unit,
      overflowX: 'auto',
    },
    foreignCell: {
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    base: {
      fontFamily: 'Georgia',
    },
    trans: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
    },
    foreign: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit / 2,
    },
  })

interface Props extends WithStyles<typeof styles> {
  lemmas: Types.Lemma[]
  showVocalization: boolean
  showTranscription: boolean
  romanizationStandard: string
  voiceName: string
}

const handleClick = (voiceName: string, foreign: string) => {
  if (voiceName !== 'none') {
    // tslint:disable-next-line:no-floating-promises
    SpeechSynthesizer.speak(voiceName, foreign)
  }
}
const LemmaTable: React.FC<Props> = ({
  lemmas,
  showVocalization,
  showTranscription,
  romanizationStandard,
  voiceName,
  classes,
}) => {
  const renderLemma = (lemma: Types.Lemma, index: number) => (
    <TableRow key={index}>
      <TableCell align="left">
        <Typography variant="h6" classes={{ h6: classes.base }} color="textPrimary">
          {lemma.base}
        </Typography>
      </TableCell>

      {showTranscription && (
        <TableCell align="left">
          <Typography variant="h6" classes={{ h6: classes.trans }} color="textSecondary">
            {Transcoder.applyRomanization(lemma.trans, romanizationStandard)}
          </Typography>
        </TableCell>
      )}
      <TableCell
        align="right"
        dir={'rtl'}
        classes={{ root: classes.foreignCell }}
        onClick={() => handleClick(voiceName, lemma.foreign)}
      >
        <Typography variant="h4" classes={{ h4: classes.foreign }} color="inherit">
          {showVocalization ? lemma.foreign : Transcoder.stripTashkeel(lemma.foreign)}
        </Typography>
      </TableCell>
    </TableRow>
  )

  return (
    <Paper className={classes.root}>
      <Table padding="dense">
        <TableBody>{lemmas.map(renderLemma)}</TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(LemmaTable)
