import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit,
      overflowX: 'auto',
    },
  })

interface Props extends WithStyles<typeof styles> {
  htmlText: string
}

const ArticleTextContent: React.FC<Props> = ({ htmlText, classes }) => {
  return (
    <Paper className={classes.root}>
      <article dangerouslySetInnerHTML={{ __html: htmlText }} className="markdown-body" />
    </Paper>
  )
}

export default withStyles(styles)(ArticleTextContent)
