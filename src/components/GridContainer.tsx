import Grid from '@material-ui/core/Grid'
import * as React from 'react'

const GridContainer: React.FC = props => {
  return (
    <Grid container={true} justify="center">
      <Grid item={true} xs={12} md={8} lg={6}>
        {props.children}
      </Grid>
    </Grid>
  )
}

export default GridContainer
