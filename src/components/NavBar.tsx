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
import MainDrawer from './MainDrawer'
import * as S from './strings'
import Tooltip from '@material-ui/core/Tooltip'

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
  showDrawerButton?: boolean
  enableSettingsMenu?: boolean
  rightHandButtons: React.ReactElement<any> | null
  onBack?: () => void
  onLeftMenu?: () => void
  onRightMenu?: () => void
}

type State = {
  mainDrawerOpen: boolean
  settingsDialogOpen: boolean
}

class NavBar extends React.Component<Props, State> {
  static defaultProps = {
    showDrawerButton: false,
    enableSettingsMenu: false,
    rightHandButtons: null,
  }

  state = {
    mainDrawerOpen: false,
    settingsDialogOpen: false,
  }

  handleOpenDialog = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ settingsDialogOpen: true })
  }

  handleCloseDialog = () => {
    this.setState({ settingsDialogOpen: false })
  }

  handleToggleDrawer = () => {
    this.setState({ mainDrawerOpen: !this.state.mainDrawerOpen })
  }

  render() {
    const {
      title,
      onBack,
      showDrawerButton,
      enableSettingsMenu,
      rightHandButtons,
      classes,
    } = this.props
    const { mainDrawerOpen, settingsDialogOpen } = this.state

    return (
      <AppBar position="fixed">
        <GridContainer>
          <Toolbar>
            {onBack && (
              <IconButton className={classes.leftButton} onClick={onBack} color="inherit">
                <ArrowBackIcon />
              </IconButton>
            )}
            {showDrawerButton && (
              <IconButton
                className={classes.leftButton}
                onClick={this.handleToggleDrawer}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {title}
            </Typography>
            {rightHandButtons}
            {enableSettingsMenu && (
              <Tooltip title={S.EDIT_SETTINGS} aria-label={S.EDIT_SETTINGS}>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup={true}
                  onClick={this.handleOpenDialog}
                  color="inherit"
                >
                  <Settings />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
          <SettingsDialogContainer open={settingsDialogOpen} onClose={this.handleCloseDialog} />
          <MainDrawer open={mainDrawerOpen} toggleDrawer={this.handleToggleDrawer} />
        </GridContainer>
      </AppBar>
    )
  }
}

export default withStyles(styles)(NavBar)
