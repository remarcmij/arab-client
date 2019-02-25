import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'
import Types from 'Types'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing.unit * 2,
      },
    },
    extra: {
      padding: theme.spacing.unit,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing.unit * 3,
      },
    },
  })

interface Props extends WithStyles<typeof styles> {
  document: Types.MarkdownDocument
}

const ArticleTextContent: React.FC<Props> = ({ document, classes }) => {
  const { prolog, epilog, data: bodyText } = document
  return (
    <Paper className={classes.root}>
      <article
        className={`markdown-body ${classes.extra}`}
        dangerouslySetInnerHTML={{ __html: bodyText }}
      />
    </Paper>
  )
}

export default withStyles(styles)(ArticleTextContent)
