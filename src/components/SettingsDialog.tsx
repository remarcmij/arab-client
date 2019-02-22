import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import withMobileDialog, { InjectedProps } from '@material-ui/core/withMobileDialog'
import React from 'react'
import { toggleVocalization, toggleTranscription } from '../features/settings/actions'
import * as S from './strings'

interface Props extends InjectedProps {
  isOpen: boolean
  onClose: () => void
  toggleVocalization: typeof toggleVocalization
  toggleTranscription: typeof toggleTranscription
  showVocalization: boolean
  showTranscription: boolean
}

const ResponsiveDialog: React.FC<Props> = props => {
  const { fullScreen, onClose, isOpen, showVocalization, showTranscription } = props

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{'Settings'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormControlLabel
            control={<Switch checked={showVocalization} onChange={props.toggleVocalization} />}
            label={S.SHOW_VOCALIZATION}
          />
          <FormControlLabel
            control={<Switch checked={showTranscription} onChange={props.toggleTranscription} />}
            label={S.SHOW_TRANSCRIPTION}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus={true}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withMobileDialog<Props>()(ResponsiveDialog)
