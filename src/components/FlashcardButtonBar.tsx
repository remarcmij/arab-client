import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
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
        <IconButton className={classes.button} onClick={onPrev}>
          <ArrowBackIos />
        </IconButton>
        <IconButton className={classes.button} onClick={onNext}>
          <ArrowForwardIos />
        </IconButton>
      </Paper>
    )
  }
}

export default withStyles(styles)(FlashcardButtonBar)
