import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    button: {
      margin: theme.spacing.unit,
    },
  })

interface Props extends WithStyles<typeof styles> {
  onNext: () => void
  onPrev: () => void
}

interface State {}

class FlashcardButtonBar extends React.Component<Props> {
  state = {}

  public render() {
    const { classes, onNext, onPrev } = this.props
    return (
      <Paper className={classes.root}>
        <Button variant="contained" className={classes.button} onClick={onPrev}>
          Prev
        </Button>
        <Button variant="contained" className={classes.button} onClick={onNext}>
          Next
        </Button>
      </Paper>
    )
  }
}

export default withStyles(styles)(FlashcardButtonBar)
