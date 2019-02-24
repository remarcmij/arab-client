import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { Redirect } from 'react-router'
import GridContainer from './GridContainer'
import NavBar from './NavBar'
import * as S from './strings'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit,
      overflowX: 'auto',
      padding: theme.spacing.unit * 4,
    },
  })

type State = {
  goBack: boolean
}

interface Props extends WithStyles<typeof styles> {}

class AboutPage extends React.Component<Props, State> {
  state = {
    goBack: false,
  }

  handleBack = () => void this.setState({ goBack: true })

  render() {
    const { goBack } = this.state

    if (goBack) {
      return <Redirect to="/content" />
    }

    return (
      <React.Fragment>
        <NavBar title={S.ABOUT_TITLE} onBack={this.handleBack} />
        <GridContainer>
          <Paper className={this.props.classes.root}>
            <Typography variant="h4" component="h1" gutterBottom={true}>
              Overzicht
            </Typography>
            <Typography variant="body1">Bla bla</Typography>
            <Typography variant="caption">Copyright 2019, Jim Cramer, Amstelveen</Typography>
          </Paper>
        </GridContainer>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(AboutPage)
