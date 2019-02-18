import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MenuIcon from '@material-ui/icons/Menu'
import * as React from 'react'
import GridContainer from './GridContainer'

const styles = createStyles({
  leftButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

interface Props extends WithStyles<typeof styles> {
  title: string
  onBack?: () => void
  onMenu?: () => void
}

const NavBar: React.FC<Props> = props => {
  const { title, onBack, onMenu, classes } = props

  return (
    <AppBar position="fixed">
      <GridContainer>
        <Toolbar>
          {onBack && (
            <IconButton className={classes.leftButton} onClick={onBack} color="inherit">
              <ArrowBackIcon />
            </IconButton>
          )}
          {onMenu && (
            <IconButton className={classes.leftButton} onClick={onMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </GridContainer>
    </AppBar>
  )
}

export default withStyles(styles)(NavBar)
