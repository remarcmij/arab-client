import AppBar from '@material-ui/core/AppBar'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const TabContainer: React.FC = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  })

interface Props extends WithStyles<typeof styles> {}

type State = {
  value: number
}

class LemmaTabs extends React.Component<Props, State> {
  state = {
    value: 0,
  }

  handleChange = (_: any, value: number) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="List" />
            <Tab label="Flashcards" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>List</TabContainer>}
        {value === 1 && <TabContainer>Flashcards</TabContainer>}
      </div>
    )
  }
}

export default withStyles(styles)(LemmaTabs)
