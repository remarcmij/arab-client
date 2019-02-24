import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import Types from 'Types'
import Transcoder from '../services/Transcoder'
import Divider from '@material-ui/core/Divider'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing.unit * 2,
      },
      padding: theme.spacing.unit,
      userSelect: 'none',
    },
    extra: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
    },
    lemmas: {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    base: {
      fontFamily: 'Georgia',
    },
    trans: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
    },
    foreign: {
      marginBottom: theme.spacing.unit,
      marginLeft: theme.spacing.unit * 4,
    },
    foreignContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
  })

interface Props extends WithStyles<typeof styles> {
  document: Types.LemmaDocument
  showVocalization: boolean
  showTranscription: boolean
  romanizationStandard: string
}

const LemmaList: React.FC<Props> = ({
  document,
  showVocalization,
  showTranscription,
  romanizationStandard,
  classes,
}) => {
  const renderLemma = (lemma: Types.Lemma, index: number) => (
    <li key={index}>
      <Typography variant="h6" classes={{ h6: classes.base }} color="textPrimary">
        <span dir="ltr">{lemma.base}</span>
      </Typography>
      <div className={classes.foreignContainer}>
        <Typography variant="h4" classes={{ h4: classes.foreign }} color="textPrimary">
          <span dir="rtl">
            {showVocalization ? lemma.foreign : Transcoder.stripTashkeel(lemma.foreign)}
          </span>
        </Typography>
        {showTranscription && (
          <Typography variant="h6" classes={{ h6: classes.trans }} color="textSecondary">
            <span dir="ltr">{Transcoder.applyRomanization(lemma.trans, romanizationStandard)}</span>
          </Typography>
        )}
      </div>
    </li>
  )

  const { subtitle, prolog, epilog, data: lemmas } = document

  return (
    <Paper className={classes.root}>
      {subtitle && <Typography variant="h5" dangerouslySetInnerHTML={{ __html: subtitle }} />}
      {prolog && (
        <React.Fragment>
          <section
            dangerouslySetInnerHTML={{ __html: prolog }}
            className={`markdown-body ${classes.extra}`}
          />
          <Divider />
        </React.Fragment>
      )}
      <ul dir="rtl" className={classes.lemmas}>
        {lemmas.map(renderLemma)}
      </ul>
      {epilog && (
        <React.Fragment>
          <Divider />
          <section
            dangerouslySetInnerHTML={{ __html: epilog }}
            className={`markdown-body ${classes.extra}`}
          />
        </React.Fragment>
      )}
    </Paper>
  )
}

export default withStyles(styles)(LemmaList)
