import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Switch from '@material-ui/core/Switch'
import withMobileDialog, { InjectedProps } from '@material-ui/core/withMobileDialog'
import React from 'react'
import { RomanizationSystems } from '../services/Transcoder'
import * as S from './strings'
import NativeSelect from '@material-ui/core/NativeSelect'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

interface Props extends InjectedProps {
  open: boolean
  onClose: () => void
  showVocalization: boolean
  toggleVocalization: () => void
  showTranscription: boolean
  toggleTranscription: () => void
  romanization: keyof RomanizationSystems
  setRomanizationSystem: (romanization: keyof RomanizationSystems) => void
}

const ResponsiveDialog: React.FC<Props> = props => {
  const {
    fullScreen,
    onClose,
    open,
    showVocalization,
    toggleVocalization,
    showTranscription,
    toggleTranscription,
    romanization,
    setRomanizationSystem,
  } = props

  const renderSelect = () => (
    <React.Fragment>
      <InputLabel htmlFor="romanization-select">{S.ROMANIZATION_SYSTEM}</InputLabel>
      <Select
        native={true}
        value={romanization}
        onChange={event =>
          setRomanizationSystem((event.target.value as unknown) as keyof RomanizationSystems)
        }
        inputProps={{
          name: 'Romanization',
          id: 'romanization-select',
        }}
      >
        <option value="iso">ISO</option>
        <option value="deMoor">de Moor</option>
      </Select>
    </React.Fragment>
  )

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{S.EDIT_SETTINGS}</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={showVocalization} onChange={toggleVocalization} />}
            label={S.SHOW_VOCALIZATION}
          />
          <FormControlLabel
            control={<Switch checked={showTranscription} onChange={toggleTranscription} />}
            label={S.SHOW_TRANSCRIPTION}
          />
          <FormControl>{renderSelect()}</FormControl>
        </FormGroup>
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
