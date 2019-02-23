import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MenuIcon from '@material-ui/icons/Menu'
import Settings from '@material-ui/icons/Settings'
import * as React from 'react'
import SettingsDialogContainer from '../containers/SettingsDialogContainer'
import GridContainer from './GridContainer'

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  leftButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

interface Props extends WithStyles<typeof styles> {
  title: string
  enableSettingsMenu?: boolean
  onBack?: () => void
  onLeftMenu?: () => void
  onRightMenu?: () => void
}

type State = {
  settingsDialogOpen: boolean
}

class NavBar extends React.Component<Props> {
  static defaultProps = {
    enableSettingsMenu: false,
  }

  state = {
    settingsDialogOpen: false,
  }

  handleOpenDialog = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ settingsDialogOpen: true })
  }

  handleCloseDialog = () => {
    this.setState({ settingsDialogOpen: false })
  }

  render() {
    const { title, onBack, onLeftMenu, enableSettingsMenu, classes } = this.props
    const { settingsDialogOpen } = this.state

    return (
      <AppBar position="fixed">
        <GridContainer>
          <Toolbar>
            {onBack && (
              <IconButton className={classes.leftButton} onClick={onBack} color="inherit">
                <ArrowBackIcon />
              </IconButton>
            )}
            {onLeftMenu && (
              <IconButton className={classes.leftButton} onClick={onLeftMenu} color="inherit">
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {title}
            </Typography>
            {enableSettingsMenu && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup={true}
                  onClick={this.handleOpenDialog}
                  color="inherit"
                >
                  <Settings />
                </IconButton>
                <SettingsDialogContainer
                  open={settingsDialogOpen}
                  onClose={this.handleCloseDialog}
                />
              </div>
            )}
          </Toolbar>
        </GridContainer>
      </AppBar>
    )
  }
}

export default withStyles(styles)(NavBar)
