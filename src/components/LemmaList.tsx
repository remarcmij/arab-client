import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import Types from 'Types'
import Transcoder, { RomanizationSystems } from '../services/Transcoder'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit,
      overflowX: 'auto',
    },
    base: {
      fontFamily: 'Georgia',
    },
    trans: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
    },
    foreign: {
      // marginTop: theme.spacing.unit / 2,
      marginBottom: theme.spacing.unit,
      marginLeft: theme.spacing.unit * 4,
    },
    foreignContainer: {
      display: 'flex',
      flexDirection: 'row',
      // alignContent: 'center',
    },
  })

interface Props extends WithStyles<typeof styles> {
  lemmas: Types.Lemma[]
  showVocalization: boolean
  showTranscription: boolean
  romanization: keyof RomanizationSystems
}

const LemmaList: React.FC<Props> = ({
  lemmas,
  showVocalization,
  showTranscription,
  romanization,
  classes,
}) => {
  const renderLemma = (lemma: Types.Lemma, index: number) => (
    <li key={index}>
      <Typography variant="h6" classes={{ h6: classes.base }} color="textPrimary">
        <p>{lemma.base}</p>
      </Typography>
      <div className={classes.foreignContainer}>
        <Typography variant="h4" classes={{ h4: classes.foreign }} color="textPrimary">
          <span dir="rtl">
            {showVocalization ? lemma.foreign : Transcoder.stripTashkeel(lemma.foreign)}
          </span>
        </Typography>
        {showTranscription && (
          <Typography variant="h6" classes={{ h6: classes.trans }} color="textSecondary">
            <span dir="ltr">{Transcoder.applyRomanization(lemma.trans, romanization)}</span>
          </Typography>
        )}
      </div>
    </li>
  )

  return (
    <Paper className={classes.root}>
      <ul dir="rtl">{lemmas.map(renderLemma)}</ul>
    </Paper>
  )
}

export default withStyles(styles)(LemmaList)
