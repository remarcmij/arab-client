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
import { getShowTranscription } from '../features/settings/selectors'

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
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit / 2,
    },
  })

interface Props extends WithStyles<typeof styles> {
  lemmas: Types.Lemma[]
  showVocalization: boolean
  showTranscription: boolean
}

const LemmaTable: React.FC<Props> = ({ lemmas, showVocalization, showTranscription, classes }) => {
  const renderLemma = (lemma: Types.Lemma, index: number) => (
    <TableRow key={index}>
      <TableCell align="right">
        <Typography variant="h6" classes={{ h6: classes.base }}>
          {lemma.base}
        </Typography>
      </TableCell>
      <TableCell align="right" dir={'rtl'}>
        <Typography variant="h4" classes={{ h4: classes.foreign }}>
          {showVocalization ? lemma.foreign : Transcoder.stripTashkeel(lemma.foreign)}
        </Typography>
      </TableCell>
      {showTranscription && (
        <TableCell align="right">
          <Typography variant="h6" classes={{ h6: classes.trans }}>
            {lemma.trans}
          </Typography>
        </TableCell>
      )}
    </TableRow>
  )

  return (
    <Paper className={classes.root}>
      <Table>
        <TableBody>{lemmas.map(renderLemma)}</TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(LemmaTable)
